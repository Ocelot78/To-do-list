const {contextBridge} = require("electron")
const fs = require("fs");
const path = require("path");
contextBridge.exposeInMainWorld('fs', {
    readFile: (option1, option2,option3) => fs.readFile(option1,option2,option3),
    writeFile: (option1,option2,option3)  => fs.writeFile(option1,option2,option3),
    access: (option1,option2,option3) => fs.access(option1,option2,option3),
    readdirSync: (option) => fs.readdirSync(option),
    constants: fs.constants,
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