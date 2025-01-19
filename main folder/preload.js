const {contextBridge} = require("electron")
const fs = require("fs");
const path = require("path");
contextBridge.exposeInMainWorld('fs', {
    readFile: (option1, option2,option3) => fs.readFile(option1,option2,option3),
    writeFile: (option1,option2,option3)  => fs.writeFile(option1,option2,option3),
    access: (option1,option2,option3) => fs.access(option1,option2,option3),
    statSync: (option1) => fs.statSync(option1),
    readdirSync: (option) => fs.readdirSync(option),
    readFileSync: (option1, option2,option3) => fs.readFile(option1,option2,option3),
    lstatSync: (option1,option2) => fs.lstatSync(option1,option2),
    unlink: (option1,option2) => fs.unlink(option1,option2),
    constants: fs.constants,
    isFile: (filePath) => {
      const stats = fs.lstatSync(filePath);
      return stats.isFile();
    },
    isFile: (filePath) => {
      const stats = fs.statSync(filePath);
      return stats.isFile();
    },
    fileExists: (filePath) => {
      try {
        fs.accessSync(filePath, fs.constants.F_OK);
        return true;
      } catch {
        return false;
      }
    }

});
contextBridge.exposeInMainWorld('path', {
    join: (...args) => path.join(...args),
    dirname: (option) => path.dirname(option),
});
