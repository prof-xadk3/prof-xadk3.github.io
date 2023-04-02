#!/bin/bash

TOKEN="d29ybGRsaW5r"
TLD="com"
CC="np"
PROVIDER="$(echo $TOKEN | base64 -d)"
HEADER_P="$1"
PORT="1337"

if [[ -n $HEADER_P ]]; then
  echo "Please enter \$PATH to the JSonP?iv=?"
  exit 0;
fi

curl -vx "socks5h://127.0.0.1:$PORT" "https://safenet.$PROVIDER.$TLD.$CC?host=$HEADER_P"
