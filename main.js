var inFormOrLink;
$('a').on('click', function() { inFormOrLink = true; });
$('form').on('submit', function() { inFormOrLink = true; });

$(window).on("beforeunload", function() {
  return inFormOrLink ? "Do you really wish to exit?" : null;
})

var switchTheme = () => {
  let curr_theme = $('#theme').href;
  if (curr_theme.includes('dark')) {
    $('#theme').href = curr_theme.split('.').slice(0, 5).join('.') + '.min.css';
  } else {
    $('#theme').href = curr_theme.split('.').slice(0, 5).join('.') + '.dark.min.css';
  }
}
// _tzGbiXSy2g

// const mdc = new showdown.Converter({ tables: true, tablesHeaderId: true });

var loadGHcontent = () => {
  fetch("https://cdn.jsdelivr.net/gh/c4p-n1ck/c4p-n1ck@HEAD/README.md").then(r => { r.text().then(resp => { $('#ghmdc').innerHTML = marked.parse(resp); }) })
}

var launchDigiThreatPortal = () => {
  $('.digiThreatPortalz').innerHTML = `
Since its a literal hell, scroll/tap/interact to see more of it. #peace
<hr /><br />
<iframe src="https://threatmap.fortiguard.com/" /></iframe>
<iframe src="https://threatmap.checkpoint.com/" /></iframe>
<hr />
<iframe src="https://threatmap.bitdefender.com/" width="100%" /></iframe>
<hr />
<iframe src="https://map.httpcs.com/" /></iframe>
<iframe src="https://attackmap.sonicwall.com/live-attack-map/" /></iframe>
<hr />
<iframe src="https://www.digitalattackmap.com/#anim=1&color=0&country=ALL&list=0&time=18763&view=map" width="100%"/></iframe>
<hr />
<i>If you wish to see them in fullscreen, copy-paste on your URL-bar yourself. =)</i>
<br />
<pre style="background: #000; color: #0F0">
 - https://threatmap.fortiguard.com
 - https://threatmap.checkpoint.com
 - https://threatmap.bitdefender.com
 - https://map.httpcs.com
 - https://attackmap.sonicwall.com/live-attack-map
 - https://www.digitalattackmap.com
 - https://cybermap.kaspersky.com
 - https://www.fireeye.com/cyber-map/threat-map.html
 - https://livethreatmap.radware.com
</pre>
`;
}

/*
const switchServiceZ = () => {
  var cheat = "https://cors-anywhere.herokuapp.com";
  let url = 'https://rssproxy.migor.org/api/w2f?v=0.1&url=https%3A%2F%2Fground.news%2F&link=.%2Fa%5B1%5D&context=%2F%2Fdiv%5B1%5D%2Fdiv%5B5%5D%2Fdiv%5B2%5D%2Farticle%5B1%5D%2Fdiv%2Fdiv%5B1%5D%2Fdiv%5B3%5D%2Fdiv%5B1%5D%2Fdiv%5B1%5D%2Fdiv&x=n&re=none&out=atom&token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0eXBlIjoiYW5vbnltb3VzIiwiaWF0IjoxNjczOTQwNzI2fQ.61YxMzIcybuXiosKUEhGXND6ecW_-UvQCuLzdcSWn6U';
  let parser = new RSSParser();
  parser.parseURL(url, (err, feed) => {
    if (err) alert(err);
    console.log(feed.title);
    feed.items.forEach((entry) => {
      console.log(entry.title + '~> ' + entry.link);
    })
  })
  let parser = new DOMParser()
  fetch(url, { mode: 'no-cors' }).then(r => {
    r.text().then(text => {
      console.log(text);
      xmlDoc = parser.parseFromString(text, "text/xml");
      console.log(xmlDoc);
      $('#info_wars').innerText = "Loaded?";
    })
  });
}
*/

const aboutX4dk3 = `
  God knows it. oh god -- phiww.
`;

/*
const loadDic = () => {
  fetch('https://api.primexbt.com/v2/dictionary').then(r => {
    r.text().then(rtext => {
      $('#dic').innerText = rtext;
    })
  })
}
*/


const whoiZappa = (_pubkey = "") => {
  if (!_pubkey) {
    if (document.querySelector('#x').value.endsWith('64')) {
      _pubkey = prompt("Please enter the Key here.");
      window.location = `https://nostr.guru/${_pubkey}`;
    }
  } else {
    window.location = `https://nostr.guru/${_pubkey}`;
  }
}

const isTori = () => {
  fetch('https://cdn.jsdelivr.net/gh/SecOps-Institute/Tor-IP-Addresses/tor-exit-nodes.lst').then(r => {
    r.text().then(ipv4list => {
      const tories = ipv4list.split(`\n`);
      console.log(`Loaded ${tories} ..`);
      fetch('https://httpbin.org/ip').then(urIPvIDK => {
        urIPvIDK.json().then(o => {
          console.log(`[!] Checking if ur one of "tories" lolz.`);
          if (o.origin in tories) {
            // FUCK right off here.
            window.location = "https://www.google.com/";
          } else {
            console.clear();
          }
        })
      })
    })
  })
}

const resolv = (name) => {
  fetch(`https://www.digwebinterface.com/?hostnames=${name}&type=&ns=resolver&useresolver=1.0.0.1&nameservers=9.9.9.9`)
    .then(response => response.text())
    .then(text => {
      const parser = new DOMParser();
      const domResp = parser.parseFromString(text, "text/html");
      const section = domResp.documentElement.querySelectorAll("#output1")[0].innerText;
      console.log(section);
    })
}


/*
const isThisNickqWss = () => {
  var socket = io();
  socket.on('connect', function() {
    socket.on('event', function(data) {
      console.log(data);
    });
    socket.io.on("connection", (socket) => {
      socket.on("PING", (args, callback) => {
        console.log(args);
        callback("Pura Vida!"); // only one argument is expected
      });
      socket.on("RESOLV", (...args) => {
        console.log(args);
        // callback("Pura Vida!"); // only one argument is expected
      });
    });
    socket.on("data", (...args) => {
      socket.volatile.emit("message", args);
    });
    socket.io.on("ping", () => {
      console.log("Looks like tryna Ping/reach!!")
      socket.volatile.emit("#nostr", { a: "Pura Vida!", b: "NIPs?", c: [8], d: "Pong!" });
    });
    socket.io.on("message", (...args) => {
      socket.emit("message", args);
    })
    socket.io.on("error", (err) => {
      console.info("error ~> ", err);
    });
    socket.io.on("reconnect", (attempt) => {
      console.log(attempt);
      window.location = 'https://google.com/'; // #peace!
    });
    socket.on('disconnect', function() {
      console.log('Conn. ~ lost.')
    });
  });
}
*/

const isThisNickqWss = () => {
  try {
    const wzzu = new WebSocket("ws://127.0.0.1:2580") // nicks' local-o~AUTH/mac-addr/hash/hw_id/soft_id/jwX/token eXchange port.
    // relay uri here.; custom event if npub...endsWith.cg/local-org~Check. [eg: npub1fx6036g40wq40c2nqgrssa0xxx8jx4hawgks8uujwxhjaa9scwysshkwcg]
    wzzu.on("getaddrinfo", (_event) => {
      return "ENOTFOUND"; // inspiration === "nostr.d11n.net". =)
    })
    wzzu.on("reconnect_attempt", (_event, error_or_PAYLOAD) => {
      console.info(error_or_PAYLOAD);
      return "Nah."; // inspiration === "nostr.d11n.net". =)
    })
    console.log(wzzu);
  } catch {
    window.location = 'https://google.com/';
  }
}

$$(() => {
  // document.getElementById('theme').href = document.getElementById('theme').href.split('.').slice(0,5).join('.') + '.dark.min.css'
  isTori();
  fetch("https://gitdab.com/naryal2580/openDB.rss").then(resp => {
    resp.text.then(xml => {
      document.querySelector('#inner').innerHTML = xml;
    })
  })
  console.clear();
  console.log("[!] Application loaded successfully.");
  isThisNickqWss();
  // loadDic();
  // document.body.dispatchEvent(new KeyboardEvent('keydown', { 'key': 'k' }));
});

