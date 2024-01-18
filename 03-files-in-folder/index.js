const fs = require('fs')
const path = require('node:path'); 

fs.promises.readdir('03-files-in-folder/secret-folder', {withFileTypes: true})
  .then(dirents => {
      for (let dirent of dirents) {
        if (dirent.isFile()){
          (async (dirent) => {
            let name = dirent.name;
            let ext = path.extname(name);
            let size = await fs.promises.stat(`03-files-in-folder/secret-folder/${name}`)
              .catch(err => {
                console.log(err);
              })
            console.log(`<= ${name.split('.')[0]} <==> ${ext} <==> ${(size.size / 1024).toFixed(3) }Kb =>`);
          })(dirent)
        }        
      }
  })
  .catch(err => {
      console.log(err)
  })