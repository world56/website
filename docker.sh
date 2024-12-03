#!/bin/sh
set -e

if [ ! -d "./builder" ]; then
  echo ""
  echo "The project has already been built."
  echo ""
else
  echo ""
  echo "Warning: Container initialization, ready for building."
  echo ""

  cd ./builder
  mkdir -p resource
  if [ -f ../resource/config.json ]; then
    cp ../resource/config.json ./resource
  fi

  npx prisma db push
  npm run build --verbose

  cp -r ./public ../
  cp -r .next/static .next/standalone/.next/
  cp -r ./.next/standalone/. ../

  cd ../
  rm -rf ./builder

fi
  exec "$@"