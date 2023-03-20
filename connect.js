const DHT = require('bittorrent-dht');
const magnet = require('magnet-uri');

const uri = `magnet:?xt=urn:btih:${process.argv[1]}`;
const parsed = magnet(uri)

console.log(parsed.infoHash) // 'e3811b9539cacff680e418124272177c47477157'

const dht = new DHT()

dht.listen(20000, function() {
  console.log('now listening')
})

dht.on('peer', function(peer, infoHash, from) {
  console.log('found potential peer ' + peer.host + ':' + peer.port + ' through ' + from.address + ':' + from.port)
})

// find peers for the given torrent info hash
dht.lookup(parsed.infoHash)

