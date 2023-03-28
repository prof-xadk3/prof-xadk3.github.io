#!/bin/bash

echo "$0 <to> <for> ..[FORK.] "

if [ -f "$1" ]; then
  cat "$1" | grep "*$2=*[a-z0-9]+(-[a-z0-9]+){2,}"
fi

