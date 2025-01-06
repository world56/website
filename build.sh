#!/bin/sh

if [ -d "./standalone" ]; then
  rm -rf ./standalone
fi

cp -r public .next/standalone/ 
cp -r .next/static .next/standalone/.next/ 
cp pm2.json .next/standalone/
mv .next/standalone ./