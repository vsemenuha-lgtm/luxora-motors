import https from 'https';

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
          // find the car array
          const arrMatch = data2.match(/brand:"Aston Martin",model:"DB11",.*?image:"(.*?)".*?brand:"Rolls-Royce",model:"Ghost",.*?image:"(.*?)"/i);
          if (arrMatch) {
            console.log('Live car 1 image:', arrMatch[1]);
            console.log('Live car 2 image:', arrMatch[2]);
          } else {
            console.log('Could not find car array regex match. Let me just print out all strings containing "image:"');
            const allImages = data2.match(/image:"(.*?)"/g);
            console.log(allImages ? allImages.slice(0, 5) : 'None found');
          }
        });
      });
    }
  });
});
