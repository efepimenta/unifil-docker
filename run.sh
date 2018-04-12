#!/bin/bash

rm -rf dist
mkdir dist

cd server
npm i
gulp build
sleep 3

cd ../client
npm i
ng build --delete-output-path=false --watch &
sleep 10

cd ../containers
sleep 5
docker-compose up -d

trap " " SIGINT
sleep 100000
[ "$?" = 130 ] && echo " : saindo do docker"

docker-compose down
cd ../

#ec2-34-217-104-86.us-west-2.compute.amazonaws.com