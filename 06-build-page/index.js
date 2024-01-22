const fs = require('fs');

const PROJECT_DIST = '06-build-page/project-dist';

const existHandler = (err, dirName) => { console.log(err.code === 'EEXIST' ? `${dirName} directory already exist` : err) }

fs.promises.mkdir(PROJECT_DIST)
  .then(() => console.log('Project directory created'))
  .catch((err) => existHandler(err, 'Project'))
  .then(() => {
    fs.promises.mkdir(`${PROJECT_DIST}/assets`,)
      .then(() => console.log('Assets directory created'))
      .catch((err) => existHandler(err, 'Assets'))
      .then(() => {
        fs.promises.readdir('06-build-page/assets')
          .then((dirents) => {
            for (let dirent of dirents) {
              fs.promises.mkdir(`${PROJECT_DIST}/assets/${dirent}`)
                .catch((err) => existHandler(err, dirent))
                .then(() => {
                  fs.promises.readdir(`06-build-page/assets/${dirent}`, {withFileTypes: true})
                    .then((files) => {
                      for (let file of files) {
                        fs.promises.copyFile(`${file.path}/${file.name}`,`${PROJECT_DIST}/assets/${file.path.split('/')[2]}/${file.name}`)
                      }
                    })
                    .catch((err) => console.log(err))
                    })
                .then(() => {console.log('Assets file writed')})
            }
          })
      })
      .catch((err) => console.log(err))
  })
  .then(() => {
    fs.promises.readFile('06-build-page/template.html', {encoding: 'utf8'})
      .then((innerText) => {
        fs.promises.readdir('06-build-page/components')
          .then(async (dirents) => {
            for (let dirent of dirents) {
               await fs.promises.readFile(`06-build-page/components/${dirent}`, {encoding: 'utf8'})
                .then((component) => {
                  if (dirent === 'articles.html') {
                    innerText = innerText.replace('{{articles}}', '\n' + component + '\n');
                  } else if (dirent === 'footer.html') {
                    innerText = innerText.replace('{{footer}}', '\n' + component + '\n');
                  } else if (dirent === 'header.html') {
                    innerText = innerText.replace('{{header}}', '\n' + component + '\n');
                  }
                })
            }
          })
          .then(() => {
            fs.promises.writeFile(`${PROJECT_DIST}/index.html`, innerText)
            .then(() => {console.log('index.html file writed')})
            .catch((err) => console.log(err))
          })
          .catch((err) => console.log(err))
      })
  })
  .then(() => {
    let dataArr = [];


    fs.promises.readdir('06-build-page/styles', {withFileTypes: true})
      .then (async (dirents) => {
        for (let dirent of dirents) {
          if (dirent.type = 1 && dirent.name.split('.')[1] === 'css') {
            await fs.promises.readFile(`06-build-page/styles/${dirent.name}`)
            .then(data => {
              dataArr.push(data.toString());
            })
          }
        }
      })
      .then(() => {
        if (!dataArr.length) {
          console.log('there is no css files');
        } else {
          fs.promises.writeFile('06-build-page/project-dist/style.css', dataArr.join('\n'))
            .catch((err) => {
              if (err) {console.log(err)} 
              else {console.log('css files succesfully merged')}
            })
        }
      })
  })
  .catch((err) => {
      console.log('Folder "styles" doesn\'t exist')
  })