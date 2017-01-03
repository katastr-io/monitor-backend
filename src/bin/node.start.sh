#!/bin/bash

# Decides whether to run development or production version.

RUN_DEV='nodemon ./src/server.js --exec babel-node'
RUN_PROD='nodemon ./src/server.js'

echo "NODE_ENV: $NODE_ENV"

if [[ $NODE_ENV == "development" ]]
    then
        eval $RUN_DEV
elif [[ $NODE_ENV == "production" ]]
    then
        eval $RUN_PROD
else
    echo "NODE_ENV not recognized."
    exit 1
fi
