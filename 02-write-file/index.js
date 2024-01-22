const fs = require('fs');
const path = require('path');
const process = require('node:process');
const readline = require('node:readline');

console.log(
  '\nHi, dear Cross-Checker!\n\nTo exit use "Ctrl+C" combination or type "exit"!\n',
);

let writeStream = fs.createWriteStream(path.join('02-write-file', 'text.txt'), {
  flags: 'a',
  encoding: 'utf-8',
});

let rl = readline.createInterface(process.stdin, process.stdout);
rl.setPrompt(
  '!!! All text of your input will be written to the file after hitting "Enter":\n\n',
);
rl.prompt();
rl.on('line', (data) => {
  if (data === 'exit') {
    console.warn(
      'You have typed "exit" and terminated process! So good bye, dear Cross-Checker...',
    );
    rl.close();
  } else {
    writeStream.write(data + '\n', (err) => {
      if (err) {
        console.error(err);
      }
      console.log('\ndata is written\n');
      rl.prompt();
    });
  }
});
rl.on('SIGINT', () => {
  console.warn(
    'You have pressed Ctrl+C buttons and terminated process! So good bye, dear Cross-Checker...',
  );
  rl.close();
});
