const ProxyServer = require('transparent-proxy');

const server = new ProxyServer();

server.listen(31337, '0.0.0.0', function() {
  console.log('TCP-Proxy-Server started!', server.address());
});
