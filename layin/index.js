const {app, BrowserWindow} = require('electron');
const path = require('path');
const url = require('url');

let win;

const args = process.argv.slice(1),
      dist = args.some(val => val === '--dist');

function createWindow () {
    win = new BrowserWindow({width: 800, height: 600})

    if (dist) {
        let pathIndex = './index.html';

        if (fs.existsSync(path.join(__dirname, '../dist/index.html'))) {
            pathIndex = '../dist/index.html';
        }

        win.loadURL(url.format({
        pathname: path.join(__dirname, pathIndex),
        protocol: 'file:',
        slashes: true
        }));
    } else {
        win.loadURL('http://localhost:4200');
    }

    win.on('closed', () => {
        win = null;
    })
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