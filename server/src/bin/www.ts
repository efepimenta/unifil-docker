#!/usr/bin/env node

import {SocketApi} from '../utils/socket';
import {ServerOptions} from 'https';

const server = require('../app');
const debug = require('debug')('express:server');
const fs = require('fs');

const clusterize = false;
const ssl: boolean = true;

let runServer = () => {

    let app = server.Server.bootstrap().app;
    let port: number;
    let httpServer: any;

    if (ssl) {
        const https = require('https');
        port = normalizePort(process.env.PORT || 3443);
        let options: ServerOptions = {
            key: fs.readFileSync('./ssl/server.key'),
            cert: fs.readFileSync('./ssl/server.crt'),
            requestCert: true,
            // passphrase: 'senha_cert',
            rejectUnauthorized: false,
        };
        httpServer = https.createServer(options, app);
        httpServer.listen(port);
        httpServer.on('listening', onListening);
        httpServer.on('error', onError);
    } else {
        const http = require('http');
        port = normalizePort(process.env.PORT || 3000);
        app.set('port', port);
        let httpServer = http.createServer(app);
        httpServer.listen(port);
        httpServer.on('error', onError);
        httpServer.on('listening', onListening);
    }

    function onListening() {
        let addr = httpServer.address();
        let bind = typeof addr === 'string'
            ? 'pipe ' + addr
            : 'port ' + addr.port;
        debug('Listening on ' + bind);
        console.log('Listening on ' + bind);
        new SocketApi(httpServer, port);
    }

    function normalizePort(val) {
        const port = parseInt(val, 10);
        if (isNaN(port)) {
            // named pipe
            return val;
        }
        if (port >= 0) {
            // port number
            return port;
        }
        return false;
    }

    function onError(error) {
        if (error.syscall !== 'listen') {
            throw error;
        }
        let bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port;
        switch (error.code) {
            case 'EACCES':
                console.error(bind + ' requires elevated privileges');
                process.exit(1);
                break;
            case 'EADDRINUSE':
                console.error(bind + ' is already in use');
                process.exit(1);
                break;
            default:
                throw error;
        }
    }

};

if (clusterize) {
    const cluster = require('cluster');
    if (cluster.isMaster) {
        const numWorkers = require('os').cpus().length;
        console.log('Master cluster setting up ' + numWorkers + ' workers...');
        for (let i = 0; i < numWorkers; i++) {
            cluster.fork();
        }
        cluster.on('online', (worker) => {
            console.log('Worker ' + worker.process.pid + ' is online');
        });
        cluster.on('exit', (worker, code, signal) => {
            console.log('Worker ' + worker.process.pid + ' died with code: ' + code + ', and signal: ' + signal);
            console.log('Starting a new worker');
            cluster.fork();
        });
    } else {
        runServer();
    }
} else {
    runServer();
}

export {};