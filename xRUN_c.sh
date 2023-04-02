#!/bin/bash

PROTO="https"; P_PROTO="socks5h"  # up-str-EAM protocol:// .
LHOST="127.0.0.1"; NET="safenet"
TOKEN="d29ybGRsaW5r"; PARAM="host"; TLD="com"; CC="np"
PROVIDER="$(echo $TOKEN | base64 -d)"
HEADER_P="$1"; PORT="1337"
TS="$(deno eval 'console.log(+new Date)' | cat)";  # Time\/(act./TIVITY)-Tracker!

if [[ -n $HEADER_P ]]; then
  echo "[-] Please enter \$PATH to the JSonP?iv=?"
  exit 1;
fi; curl -vx "$P_PROTO://$LHOST:$PORT" "$PROTO://$NET.$PROVIDER.$TLD.$CC?$PARAM=$HEADER_P?IV=$TS" -o - | less
