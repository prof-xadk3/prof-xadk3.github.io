const DHT = require('bittorrent-dht');
const magnet = require('magnet-uri');

const uri = `magnet:?xt=urn:btih:${process.argv[1]}`;
const parsed = magnet(uri)

console.log(parsed.infoHash) // '176419bda44e93a6bd7aeab4ce9d3e27c7a9eb53cbbb60bb7d5c32239140be5c'

const dht = new DHT()

dht.listen(20000, function() {
  console.log('now listening')
})

dht.on('peer', function(peer, infoHash, from) {
  console.log('found potential peer ' + peer.host + ':' + peer.port + ' through ' + from.address + ':' + from.port)
})

// find peers for the given torrent info hash
dht.lookup(parsed.infoHash)

