const { RelayPool } = require('nostr')

const nick = "npub1pf9ux0dmfd3esz6cddkhuah562x04u4hcwvznhed57y65tt3a7eqx9mp64";
const cg = "npub1fx6036g40wq40c2nqgrssa0xxx8jx4hawgks8uujwxhjaa9scwysshkwcg";
const damus = "wss://relay.damus.io"
const scsi = "wss://nostr-pub.wellorder.net"
const edata_relay_pool = "wss://relay.f7z.io,wss://nos.lol,wss://relay.nostr.info,wss://nostr-pub.wellorder.net,wss://relay.current.fyi,wss://relay.nostr.band".split(',');
const relays = [damus, scsi, ...edata_relay_pool];

const pool = RelayPool(relays)

pool.on('open', relay => {
  relay.subscribe("subid", { limit: 2, kinds: [1], authors: [nick] });
  console.info(`[+] sab ko saab ${cg} mai jaancha la.`);
});

pool.on('eose', relay => {
  relay.close()
});

pool.on('event', (relay, sub_id, ev) => {
  console.log(sub_id);
  console.log(relay);
  console.log(ev)
});
