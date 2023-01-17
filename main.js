const switchTheme = () => {
  let curr_theme = $('#theme').href;
  if (curr_theme.includes('dark')) {
    $('#theme').href = curr_theme.split('.').slice(0, 5).join('.') + '.min.css';
  } else {
    $('#theme').href = curr_theme.split('.').slice(0, 5).join('.') + '.dark.min.css';
  }
}

const mdc = new showdown.Converter({ tables: true, tablesHeaderId: true });

const loadGHcontent = () => {
  fetch("https://cdn.jsdelivr.net/gh/c4p-n1ck/c4p-n1ck@main/README.md").then(r => { r.text().then(resp => { $('#ghmdc').innerHTML = mdc.makeHtml(resp); }) })
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

aboutX4dk3 = `

`;

$$(() => {
  // document.getElementById('theme').href = document.getElementById('theme').href.split('.').slice(0,5).join('.') + '.dark.min.css'
  console.log("Application loaded successfully.");
});
