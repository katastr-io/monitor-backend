#!/bin/bash

git config --global push.default simple
git config --global user.email "zimmicz@gmail.com"
git config --global user.name "Michal Zimmermann"

cd ~/clone

npm install -g npm@latest
npm install