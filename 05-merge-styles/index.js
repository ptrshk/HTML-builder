const fs = require('fs');

fs.readdir(
  '05-merge-styles/styles',
  {withFileTypes: true},
  (err, dirents) => {
    if (err) {
      console.log('Folder "styles" doesn\'t exist')
    } else {
      let dataArr = [];
      (async () => {
        for (let dirent of dirents) {
          if (dirent.type = 1 && dirent.name.split('.')[1] === 'css') {
            await fs.promises.readFile(
              `05-merge-styles/styles/${dirent.name}`,
              )
            .then(data => {
                dataArr.push(data.toString());
              }
            )
          }
        }
      }
      )()
      .then(() => {
          if (!dataArr.length) {
            console.log('there is no css files');
          } else {
            fs.writeFile(
              '05-merge-styles/project-dist/bundle.css',
              dataArr.join('\n'),
              (err) => {if (err) {console.log(err)} else {console.log('css files succesfully merged')}}
            )
          }
        }
      )
    }
  }
)