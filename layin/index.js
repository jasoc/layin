const {app, BrowserWindow} = require('electron');
const path = require('path');
const url = require('url');
const fs = require('fs');

let win;

const args = process.argv.slice(1),
      serve = args.some(val => val === '--serve');

function getIndex() {

    const positions = [
        'index.html',
        'dist/layin/index.html',
        'dist/index.html',
    ].map(p => path.join(__dirname, p));

    for (let position of positions) {
        if (fs.existsSync(position)) {
            return position;
        }
    }

    return positions[0];
}

function createWindow () {
    win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true
        }
    });

    if (serve) {
        win.loadURL('http://localhost:4200');
    }
    else {

        win.loadURL(url.format({
            pathname: getIndex(),
            protocol: 'file:',
            slashes: true
        }));
    }

    win.on('closed', () => {
        win = null;
    });
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (win === null) {
        createWindow();
    }
});