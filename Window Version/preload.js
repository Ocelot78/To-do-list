const {contextBridge} = require("electron")
const fs = require("fs");
const path = require("path");
contextBridge.exposeInMainWorld('fs', {
    writeFile: (option1,option2,option3)  => fs.writeFile(option1,option2,option3),
    access: (option1,option2,option3) => fs.access(option1,option2,option3),
    constants: fs.constants,
});
contextBridge.exposeInMainWorld('path', {
    join: (...args) => path.join(...args),
    dirname: (option) => path.dirname(option),
});