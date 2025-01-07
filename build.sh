#!/bin/sh

if [ -d "./build" ]; then
  rm -rf ./build
fi

cp -r public .next/standalone/ 
cp -r .next/static .next/standalone/.next/ 

if [ -f pm2.json ]; then
  cp pm2.json .next/standalone/
fi

mv .next/standalone ./build
rm -rf ./.next
