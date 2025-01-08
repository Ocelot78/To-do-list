//Importing
const path = require('path')
const { app, BrowserWindow, Menu } = require("electron");
const { createPublicKey } = require('crypto');
//Checking
const isMac = process.platform === 'darwin';
const isDev = process.env.NODE_ENV !== 'production'
//Creating Main Window
function mainWindowCreate() {
    const mainWindow = new BrowserWindow({
        title: "To do list",
        width: isDev ? 1900 : 1000,
        height: 900,
        webPreferences: {
            contextIsolation: true,
            nodeIntegration: false,
            preload: path.join(__dirname, 'preload.js')
        }        
    });
    
    if (isDev) {
        mainWindow.webContents.openDevTools()
    }

    mainWindow.loadFile(path.join(__dirname, "./app/index.html"));
}
function aboutWindowCreate() {
    const aboutWindow = new BrowserWindow({
        title: "About To do list",
        width: isDev ? 1000 : 400,
        height: 800
    });

    if (isDev) {
        aboutWindow.webContents.openDevTools()
    }

    aboutWindow.loadFile(path.join(__dirname, "./app/about.html"));
}

app.whenReady().then(() => {
    mainWindowCreate();
    const menuMain = Menu.buildFromTemplate(menu);
    Menu.setApplicationMenu(menuMain);

    app.on("activate", () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            mainWindowCreate();
        }        
    })
})
const menu = [
    ...(isMac ? [{
        label: app.name,
        submenu: [
            {
                label: 'About',
                click: aboutWindowCreate
            }
        ]
    }] : []),
    {
        role: "fileMenu",
    },
    ...(!isMac ? [{
        label: 'Help',
        submenu: [{
            label: 'About',
            click: aboutWindowCreate
        }]
    }] : []),
];
app.on('window-all-closed', () =>{
    if (!isMac) {
        app.quit()
    }
})