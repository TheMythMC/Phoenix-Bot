#!/bin/bash
update(){
    cd ~/core;
    git pull;
    cd ~/extra;
    git pull;
    cd ~;
    cp -r -n ~/core/* ~/extra;
}
update;
cd ~;
