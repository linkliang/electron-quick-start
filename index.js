// Modules to control application life and create native browser window
const {app, Menu, BrowserWindow, Tray} = require('electron')
const {autoUpdater} = require("electron-updater")

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

function createWindow () {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  })

  // and load the index.html of the app.
  mainWindow.loadFile('src/main.html')

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  })
}

// Tray icon&Menu
/*
let tray = null
app.on('ready', () => {
  tray = new Tray('image/tray.png')
  const contextMenu = Menu.buildFromTemplate([
    { label: 'Synchronize'},
    { label: 'Check for Updates'},
    { label: 'Preferences'},
    { label: 'Quit', click: () => {
      app.quit()
    }}
  ])
  tray.setToolTip('Lean')
  tray.setContextMenu(contextMenu)
})
*/

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', function(){
  createWindow()
  //autoUpdater.checkForUpdates()
})
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})

app.on('activate', function () {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) createWindow()
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.