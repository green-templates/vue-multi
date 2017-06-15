#!/bin/sh

moduleName=${1}
libType=${2}

node build/webpack.build.js $moduleName $libType
