const fs = require('fs');
const path = require('path');
let data = '';

let readerStream = fs.createReadStream(
  path.join('01-read-file', 'text.txt'),
  'utf-8',
);

readerStream.on('data', (chunk) => {
  data += chunk;
});

readerStream.on('end', () => {
  console.log(data);
});

readerStream.on('error', (err) => {
  console.log(err.stack);
});
