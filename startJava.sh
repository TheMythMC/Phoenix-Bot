#!/bin/bash

prepare() {
    cd java/ &&
    ./gradlew shadowJar &&
    java -jar "build/libs/PhoenixMusic-1.0-all.jar"
}
prepare