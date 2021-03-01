#!/bin/bash
update(){
    cd core;
    git pull;
    cd ../extra;
    git pull;
    cd ..;
    cp -r -n ~/core/* ~/extra;
}
run () {
    killall node;
    cd ~/core;
    npm i;
    node . &
    cd ~/extra;
    npm i;
    node .;
}
update;
run;
cd ~;
