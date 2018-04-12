#!/usr/bin/env bash
rm -rf dist
mkdir dist

cd server
gulp build
sleep 3

cd ../client
ng build --prod --aot