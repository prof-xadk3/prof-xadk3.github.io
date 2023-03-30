#!/usr/bin/env python3

import sys

args = sys.argv;

if len(args) <= 1:
  print(args[0], 'nprofile:ADDR')
  exit(1)

pub = args[1]
if pub.startswith('nprofile:'):
  pub = pub.split(':')[1]


if __name__ == '__main__':
  __import__('webbrowser').open_new_tab(f'https://nostr.band/u/{pub}');
