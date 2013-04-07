#!/bin/bash

rm dont_feed_db
./manage.py syncdb --noinput
./manage.py load_fake_data
./run.sh
