function generate_QR(payload) {
  (async () => {
    const rawResponse = await fetch('https://qrcode.show', {
      method: 'POST',
      headers: {
        'Accept': 'image/svg+xml',
        'Content-Type': 'application/json'
      },
      mode: "cors",
      credentials: "omit",
      body: JSON.stringify({ datum: payload, t_id: new Date(), _iv: 'Npub?=..64;' })
    });
    const content = await rawResponse.text();

    console.log(content); // append to dom
    document.querySelector('.qr').innerHTML = content;
    return content; // svg image.
  })();
}

/*
fetch("https://qrcode.show/", {
  "headers": {
    "accept": "image/svg+xml",
    "accept-language": "en-US,en;q=0.9",
    "content-type": "text/plain;charset=UTF-8",
    "sec-ch-ua": "\"Chromium\";v=\"109\", \"Not_A Brand\";v=\"99\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\"Linux\"",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "same-origin",
    "x-requested-with": "XMLHttpRequest"
  },
  "referrer": "https://qrcode.show/",
  "referrerPolicy": "strict-origin-when-cross-origin",
  "body": "test",
  "method": "POST",
  "mode": "cors",
  "credentials": "omit"
});
*/
