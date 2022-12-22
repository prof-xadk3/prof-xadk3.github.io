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

$$(() => {
  // document.getElementById('theme').href = document.getElementById('theme').href.split('.').slice(0,5).join('.') + '.dark.min.css'
  console.log("Application loaded successfully.");
});
