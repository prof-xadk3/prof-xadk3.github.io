#!/bin/bash

echo "$0 <to> <for> ..[FORK.] "

egrep "$2=\"\"[a-z0-9]+(-[a-z0-9]+){2,}" $1
