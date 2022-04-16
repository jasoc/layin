import { app, BrowserWindow, ipcMain } from 'electron';
import * as path from 'path';
import * as url from 'url';
import * as fs from 'fs';

const debug = process.env['NODE_ENV'] == 'development';

if (debug === true) {
    require("electron-reload")(path.join(__dirname), {
        electron: path.join(__dirname, '..', 'node_modules', '.bin', 'electron'),
    });
}

ipcMain.on('ping', (event, arg) => {
    console.log("sei gay");
    event.reply('ping', {sex: 1});
});

let win: BrowserWindow | null;

function getIndex(): string {

    const positions = [
        'index.html',
        'dist/layin/index.html',
        'dist/index.html',
        '../index.html',
        '../dist/index.html',
        '../../index.html',
        '../../layin/index.html',
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
            nodeIntegration: true,
            contextIsolation: false,
        }
    });

    if (debug === true) {
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