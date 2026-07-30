const https = require('https'); 
https.get('https://vsemenuha-lgtm.github.io/luxora-motors/index.html', (res) => { 
  let data = ''; 
  res.on('data', c => data += c); 
  res.on('end', () => { 
    const match = data.match(/src="(\/luxora-motors\/assets\/index-.*?\.js)"/); 
    if(match) { 
      https.get('https://vsemenuha-lgtm.github.io' + match[1], (res2) => { 
        let data2 = ''; 
        res2.on('data', c => data2 += c); 
        res2.on('end', () => { 
          console.log('Contains unsplash?', data2.includes('unsplash.com')); 
          console.log('Contains cars/car_1.jpg?', data2.includes('cars/car_1.jpg')); 
        }); 
      }); 
    } else { 
      console.log('No match', data.substring(0,200)); 
    } 
  }); 
});
