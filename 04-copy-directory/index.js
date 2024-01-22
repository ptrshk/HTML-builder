const fs = require('fs');
const path = require('path');

const copyDir = async () => {
  fs.mkdir(path.join(__dirname, 'files-copy'), (err) => {
    if (err) {
      console.log('directory rewrited');
      fs.rm(path.join(__dirname, 'files-copy'), { recursive: true }, (err) => {
        if (err) {
          console.log(err);
        }
        copyDir();
      });
    } else {
      console.log('directory copied succesfully');
      fs.promises
        .readdir('04-copy-directory/files')
        .then((files) =>
          files.forEach((file) =>
            fs.copyFile(
              path.join('04-copy-directory', 'files', file),
              path.join('04-copy-directory', 'files-copy', file),
              (err) => {
                if (err) {
                  console.log(err);
                }
              },
            ),
          ),
        )
        .catch((err) => {
          console.log(err);
        });
    }
  });
};

copyDir();
