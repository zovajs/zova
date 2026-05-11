#! /usr/bin/env bash

lerna version $1
lerna publish from-git

