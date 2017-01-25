#!/bin/bash

HOMEDIR="/opt/katastr.io"
COMMIT=$(git log --oneline | head -n 1 | cut -d ' ' -f 1)

cd ~/clone

npm install && \
npm run build && \
rsync -aqz ~/clone/dist/* codeship@193.85.199.37:${HOMEDIR}/monitor-backend-${COMMIT} && \
ssh codeship@193.85.199.37 << EOF 
find ${HOMEDIR} -maxdepth 1 -type d ! -name monitor-backend-${COMMIT} -name 'monitor-backend-*' -exec rm -rf '{}' \;
pm2 stop monitor-backend && \
pm2 delete monitor-backend && \
pm2 start ${HOMEDIR}/monitor-backend-${COMMIT}/src/server.js --name "monitor-backend" --watch
EOF

