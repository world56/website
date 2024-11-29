#!/bin/sh
set -e

if [ ! -d "./builder" ]; then
  echo ""
  echo "The project has been built."
  echo ""
else
  echo ""
  echo "Warning: Container initialization, ready for building."
  echo ""

  cd ./builder

  npm run build --verbose
  npx prisma db push

  cp -r ./public ../
  cp -r .next/static .next/standalone/.next/
  cp -r ./.next/standalone/. ../

  cd ../
  rm -rf ./builder

fi
  exec "$@"