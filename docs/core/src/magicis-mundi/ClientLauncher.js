import { app, BrowserWindow } from 'electron';


if(require('electron-squirrel-startup'))
    app.quit();

let mainWindow = null;

const createWindow = () => {
    mainWindow = new BrowserWindow({
        width: 1000,
        height: 800,
	
        autoHideMenuBar: true,
		
		webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        }
    });

    mainWindow.loadURL(`file://${__dirname}/client/client.html`);

    mainWindow.webContents.openDevTools();

    mainWindow.on('closed', () => {
        mainWindow = null;
    });
};

app.on('ready', createWindow);

app.on('window-all-closed', () => {
    if(process.platform !== 'darwin')
        app.quit();
});

app.on('activate', () => {
    if(mainWindow === null)
        createWindow();
});
