const fetch = require('node-fetch');

async function getYT() {
  try {
    const res = await fetch('https://www.youtube.com/results?search_query=audi+r8+cinematic+4k');
    const html = await res.text();
    const match = html.match(/"videoId":"([^"]{11})"/);
    if (match) {
      console.log('ID:', match[1]);
    } else {
      console.log('No ID found');
    }
  } catch (e) {
    console.error('Error:', e);
  }
}
getYT();
