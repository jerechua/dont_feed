Don't Feed!
=========

Random hacking for creating a website where people can spam votes to vote for League of Legends feeders.

###dont_feed_api###
Contains all the restful endpoints

###third_party_api###
integration app for third party api

###Setup###
*Might wanna use virtualenv, only needs to be done once:

	virtualenv env

* Activate the new virtual environment

	source env/bin/activate

* Install any (new) requirements as needed

	pip install -r reqs.txt

* Any db changes?

	./manage.py syncdb

*Start server and start clicking away:

	./run.sh

###Plan###
https://trello.com/board/dont-feed/513b6af6748a5ca30f000fbe

###Website###
www.dont-feed.com
