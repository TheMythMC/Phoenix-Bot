#!/bin/bash
update(){
    cd ~/core || return;
    git pull;
    cd ~/extra || return;
    git pull;
    cd ~ || return;
    cp -r -n ~/core/* ~/extra;
}
update;
cd ~ || return;
