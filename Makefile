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
	
dev:
	nodemon lib/shine 8080