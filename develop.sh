#!/bin/sh

moduleName=${1}

node build/webpack.dev.js $moduleName
