#!/usr/bin/env node

let arp_display = () => {i=0; arp_ether_hwn=[]; document.querySelector('table').innerText.split('\n').slice(1).forEach( arp_entry => { arp_props = arp_entry.split('\t'); i+= 1; arp_ether_hwn += [`arp+3NS.${i}.local (${arp_props[0]}) at ${arp_props[2]} [ether] on ${arp_props[3]}\n`]; }); console.log(arp_ether_hwn); return arp_ether_hwn.slice(0, -1)}; const table = arp_display();
