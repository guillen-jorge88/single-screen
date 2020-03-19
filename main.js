const { app, BrowserWindow, session } = require('electron');
const contextMenu = require('electron-context-menu');

const path = require('path');

let mainWindow;

function createWindow() {

    app.server = require(path.join(__dirname, '/bin/www'));

    // Create the browser window.
    mainWindow = new BrowserWindow({
        show: false,
        minWidth: 800,
        minHeight: 600,
        autoHideMenuBar: false,
        useContentSize: true,
        autoHideMenuBar: true,
        webPreferences: {
            nodeIntegration: false,
            preload: './preload.js'
        }
    });

    session.defaultSession.webRequest.onBeforeSendHeaders((details, callback) => {
        details.requestHeaders['User-Agent'] = 'SingleScreenAgent';
        callback({ cancel: false, requestHeaders: details.requestHeaders });
    });

    // Visit the express server page
    mainWindow.loadURL('http://localhost:3000/');
    mainWindow.focus();

    // Open the DevTools.
    //mainWindow.webContents.openDevTools();

    mainWindow.once('ready-to-show', () => {
        mainWindow.show()
    });

    // Emitted when the window is closed.
    mainWindow.on('closed', function() {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        mainWindow = null
    });
}

/**
 * Context Menu
 */
contextMenu({
    prepend: (params, browserWindow) => [{
        label: 'Rainbow',
        // Only show it when right-clicking images
        visible: params.mediaType === 'image'
    }]
});

app.on('ready', createWindow);

app.on('window-all-closed', function() {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', function() {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (mainWindow === null) {
        createWindow();
    }
});