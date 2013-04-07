#!/bin/bash

rm dont_feed_db
./manage.py syncdb --noinput
./run.sh
