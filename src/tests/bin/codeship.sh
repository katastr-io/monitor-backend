#!/bin/bash

cp src/config.js.example src/config.js
sed -i -e 's/5432/5436/' -e 's/\/var\/run\/postgresql/localhost/' -e 's/user: "cadastre"/user: "postgres"/' src/config.js

psql -p 5436 -c "CREATE DATABASE cadastre"
psql -p 5436 -d cadastre -c "CREATE SCHEMA c_install"

wget -q -O liquibase.tar.gz https://github.com/liquibase/liquibase/releases/download/liquibase-parent-3.5.3/liquibase-3.5.3-bin.tar.gz
wget -q -O postgresql94-jdbc.jar https://jdbc.postgresql.org/download/postgresql-9.4.1212.jre6.jar
git clone git@github.com:katastralni-cz/database.git

mkdir liquibase

tar -xzf liquibase.tar.gz -C liquibase

find ./database -type f -path *.properties -exec sed -i -e 's/username: c_install/username: postgres/g' {} \; -exec sed -i -e 's/5432/5436/g' {} \; -exec sed -i -e '1d' {} \;

# liquibase
cd ~/clone/database/database/etc/example
~/clone/liquibase/liquibase --classpath=/home/rof/clone/postgresql94-jdbc.jar --defaultsFile install.properties update

cd ~/clone/database/src_ruian/etc/example
~/clone/liquibase/liquibase --classpath=/home/rof/clone/postgresql94-jdbc.jar --defaultsFile install.properties update

cd ~/clone/database/api_monitor/etc/example
~/clone/liquibase/liquibase --classpath=/home/rof/clone/postgresql94-jdbc.jar --defaultsFile install.properties update
~/clone/liquibase/liquibase --classpath=/home/rof/clone/postgresql94-jdbc.jar --defaultsFile reinstallable.properties update

cd ~/clone/

tar -xzf src/tests/share/dump.sql.tar.gz
psql -p 5436 -d cadastre -f dump.sql

npm install
