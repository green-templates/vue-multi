#!/bin/sh

moduleName=${1}

node build/webpack.build.js $moduleName

cp -r ./static/ ./dist/static
