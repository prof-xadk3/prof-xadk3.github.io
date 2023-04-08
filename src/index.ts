let page = await fetch("http://_gateway/arpview.cmd", {
  headers: {
    accept: "text/html",
    "accept-language": "en-US,en;q=0.9",
    "upgrade-insecure-requests": "1",
  },
  referrer: "http://_gateway/menu.html",
  referrerPolicy: "strict-origin-when-cross-origin",
  body: null,
  method: "GET",
  mode: "cors",
  credentials: "omit",
});
// parsed = dpc.parseFromString(await page.text(), "text/html");
let arp_display = () => {
  i = 0;
  arp_ether_hwn = [];
  parsed
    .querySelector("table")
    .innerText.split("\n")
    .slice(1)
    .forEach((arp_entry) => {
      arp_props = arp_entry.split("\t");
      i += 1;
      arp_ether_hwn += [
        `arp+3NS.${i}.local (${arp_props[0]}) at ${arp_props[2]} [ether] on ${arp_props[3]}\n`,
      ];
    });
  console.log(arp_ether_hwn);
  return arp_ether_hwn.slice(0, -1);
};
const table = arp_display();
