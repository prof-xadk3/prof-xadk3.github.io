#!/usr/bin/env python2

import hashlib
import re
import sys


def mac_to_int(mac):
    return int(mac.replace(":", ""), 16)

def int_to_mac(macint):
    return  ":".join(re.findall("..", "%012x"%macint))

argv = sys.argv;

if len(argv) < 1:
    print(argv[0] + " [..FILE:NAME]")
else:
    for _file in argv[1:]:
        fc = open(_file, 'rb').read()
        MAC = mac_to_int(fc)
        ID = int_to_mac(MAC)
        print(b'\x00', b'\x00', b'\x00', b'\x00', 
              b'\x00', b'\x00' b'\x00', b'\x00',
              b'\x00', b'\x00' b'\x00', b'\x00',
              b'\x00', b'\x00', b'\x00', b'\x00', 
              b'\x00', b'\x00' b'\x00', b'\x00',
              b'\x00', b'\x00' b'\x00', b'\x00',
              b'\x00', b'\x00', b'\x00', b'\x00', 
              b'\x00', b'\x00' b'\x00', b'\x00',
              b'\x00', b'\x00' b'\x00', b'\x00',
              b'\x00', b'\x00', b'\x00', b'\x00', 
              b'\x00', b'\x00' b'\x00', b'\x00',
              b'\x00', b'\x00', b'\x00', b'\x00', 
              b'\x00', b'\x00' b'\x00', b'\x00',
              b'\x00', b'\x00' b'\x00', b'\x00'
              b'\x00', b'\x00', b'\x00', b'\x00', 
              b'\x00', b'\x00' b'\x00', b'\x00',
              MAC, fc, hashlib.sha512(fc).digest(), ID,
              b'\x00', b'\x00' b'\x00', b'\x00',
              b'\x00', b'\x00' b'\x00', b'\x00',
              b'\x00', b'\x00', b'\x00', b'\x00', 
              b'\x00', b'\x00' b'\x00', b'\x00',
              b'\x00', b'\x00' b'\x00', b'\x00',
              b'\x00', b'\x00' b'\x00', b'\x00',
              b'\x00', b'\x00', b'\x00', b'\x00', 
              b'\x00', b'\x00' b'\x00', b'\x00',
              b'\x00', b'\x00' b'\x00', b'\x00',
              b'\x00', b'\x00', b'\x00', b'\x00', 
              b'\x00', b'\x00' b'\x00', b'\x00',
              b'\x00', b'\x00' b'\x00', b'\x00',
              b'\x00', b'\x00', b'\x00', b'\x00', 
              b'\x00', b'\x00' b'\x00', b'\x00'
          )
