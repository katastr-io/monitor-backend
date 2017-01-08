#!/bin/bash

HOMEDIR="/home/mzimmer1/katastralni.cz"

cd ~/clone

npm install && \
npm run build && \
sed -i 's/user: "cadastre"/user: "c_install"/g' dist/src/config.js && \
rsync -aqz ~/clone/dist/* mzimmer1@193.85.199.37:${HOMEDIR}/monitor-backend-new && \
ssh mzimmer1@193.85.199.37 "rm -rf ${HOMEDIR}/monitor-backend/* && mv ${HOMEDIR}/monitor-backend-new/* ${HOMEDIR}/monitor-backend && rm -rf ${HOMEDIR}/monitor-backend-new"
