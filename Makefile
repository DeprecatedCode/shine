setup:
	sudo apt-get update
	sudo apt-get install -yq python-software-properties software-properties-common python g++ make
	sudo add-apt-repository ppa:chris-lea/node.js
	sudo apt-get update
	sudo apt-get install -yq nodejs npm
	sudo rm /usr/bin/node
	sudo ln /usr/bin/nodejs /usr/bin/node
	sudo npm install -g nodemon

install:
	npm install socket.io
	npm install express
	
start:
	node lib/public/src/_build.js
	node lib/app 8080

dev:
	nodemon --ignore lib/public/shine.js --exec "make start"
