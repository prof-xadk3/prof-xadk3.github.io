let uap = require('./udp.js');
let sock = u.udp5.createSocket();

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

sock.on('CONNECT').then(payload => {
  console.info(payload);
  ctx.fillStyle = "lime";
  ctx.fillRect(0, 255, 0, 80);
})


