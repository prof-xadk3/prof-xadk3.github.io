#!/bin/bash


curl -vx socks5h://127.0.0.1:2580 'https://twitter.com/i/api/fleets/v1/avatar_content?user_ids=0&only_spaces=true' \
  -H 'authority: git.io' \
  -H 'accept: */*' \
  -H 'accept-language: en-US,en;q=0.9' \
  -H "authorization: Bearer $(echo $1)" \
  -H 'referer: https://twitter.com/i/?' \
  -H 'sec-ch-ua: "Not_A Brand";v="99", "Brave";v="109", "Chromium";v="108"' \
  -H 'sec-ch-ua-mobile: ?0' \
  -H 'sec-ch-ua-platform: \"Experimental\"' \
  -H 'sec-fetch-dest: empty' \
  -H 'sec-fetch-mode: cors' \
  -H 'sec-fetch-site: same-origin' \
  -H 'sec-gpc: 1' \
  -H 'user-agent: Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.36' \
  -H "x-csrf-token: $(python3 -c 'import hashlib,base64;print(base64.b85encode(hashlib.sha512(b'$(echo $1)').digest()).decode() + str('0'*(160-80)))\'))" \
  -H 'x-twitter-active-user: yes' \
  -H 'x-twitter-auth-type: OAuth2Session' \
  -H 'x-twitter-client-language: en' \
  --compressed
