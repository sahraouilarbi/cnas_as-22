const { app, BrowserWindow } = require('electron');
const path = require('path');
const isDev = !app.isPackaged;

// Start the Express server
// In production, we'll want to point to the correct data directory
if (!app.isPackaged) {
  process.env.DATABASE_PATH = path.join(__dirname, 'data', 'database.sqlite');
} else {
  // On Windows: %APPDATA%/cnas-pec/database.sqlite
  process.env.DATABASE_PATH = path.join(app.getPath('userData'), 'database.sqlite');
}

// Ensure the server knows it's running in production mode for static serving if needed
// or we can let Electron handle the frontend loading
const expressServer = require('./server/index.js');

function createWindow() {
  const win = new BrowserWindow({
    width: 1280,
    height: 800,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
    },
    icon: path.join(__dirname, 'client', 'public', 'favicon.svg'),
  });

  if (isDev) {
    win.loadURL('http://localhost:5173');
    win.webContents.openDevTools();
  } else {
    // In production, load the built index.html from the client/dist folder
    win.loadFile(path.join(__dirname, 'client', 'dist', 'index.html'));
  }
  
  win.setMenuBarVisibility(false);
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('will-quit', () => {
  if (expressServer) {
    expressServer.close();
  }
});
