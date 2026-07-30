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
          const allImages = data2.match(/image:"(.*?)"/g) || data2.match(/image:'(.*?)'/g) || data2.match(/image:`(.*?)`/g) || data2.match(/image:\"(.*?)\"/g);
          console.log(allImages ? allImages.slice(0, 5) : 'Still none found, trying a wider search...');
          if (!allImages) {
              const allCars = data2.match(/brand:"(.*?)"/g);
              console.log('Brands found:', allCars ? allCars.slice(0, 5) : 'No brands');
              
              // Let's just grab the block around DB11
              const db11Index = data2.indexOf('DB11');
              if (db11Index !== -1) {
                  console.log('Context around DB11:', data2.substring(db11Index - 50, db11Index + 150));
              }
              const ghostIndex = data2.indexOf('Ghost');
              if (ghostIndex !== -1) {
                  console.log('Context around Ghost:', data2.substring(ghostIndex - 50, ghostIndex + 150));
              }
          }
        });
      });
    }
  });
});
