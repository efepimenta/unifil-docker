#!/usr/bin/env bash

#echo "151.101.72.162 registry.npmjs.org" >> /etc/hosts

npm install

forever -w -c 'node --harmony' ./bin/www.js