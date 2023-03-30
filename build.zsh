#!/shebang

echo $(git log | head -n 1 | cut -d ' ' -f 2) >> cin.gn
