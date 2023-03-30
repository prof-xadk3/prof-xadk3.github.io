#!/usr/bin/env python3

import sys

if len(sys) == 2:
  print(sys.argv[0], 'nprofile:ADDR')
  exit(1)

pub = argv[1]
if pub.startswith('nprofile:'):
  pub = pub.split(':')[1]


if __name__ == '__main__':
  __import__('webbrowser').open_new_tab('https://nostr.band/u/{pub}');
