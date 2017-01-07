#!/bin/bash

BASEDIR=$(dirname $0)
DISTDIR=$BASEDIR/../../dist
SRCDIR=$BASEDIR/../../src/
NODE_MODULES=$BASEDIR/../../node_modules

rm -rf $DISTDIR/src
rm -rf $DISTDIR/node_modules

$BASEDIR/../../node_modules/.bin/babel $SRCDIR -d $DISTDIR/src
$BASEDIR/../../node_modules/.bin/babel $BASEDIR/../config.js.example -o $DISTDIR/src/config.js

cd $BASEDIR/../..
npm install
cp -R $NODE_MODULES $DISTDIR/
