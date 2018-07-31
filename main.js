import electron from 'electron';
import path from 'path';
import url from 'url';
/*eslint-disable */
import store from './mainStore';

const { URL } = url;
// Module to control application life.
const { app, Menu } = electron;

// Module to create native browser window.
const { BrowserWindow } = electron;
const { ipcMain } = electron;

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;
let widget;
let showWidget = false;

const hide = win => win.hide();
const show = win => win.show();

function createWindow() {
  // Create the browser window.
  mainWindow = new BrowserWindow({ width: 600, height: 400, backgroundColor: '#fff' });

  const { screen } = electron;
  const screenSize = screen.getPrimaryDisplay().workAreaSize;

  widget = new BrowserWindow({
    width: 144,
    height: 40,
    x: screenSize.width - 100,
    y: screenSize.height - 100,
    resizable: false,
    transparent: false,
    frame: false,
    minimizable: false,
    maximizable: false,
    closable: false,
    alwaysOnTop: true,
    show: true,
    backgroundColor: '#34495e',
  });
  widget.setAlwaysOnTop(true);
  widget.setSkipTaskbar(true);

  // and load the index.html of the app.
  const startUrl = url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true,
  });
  mainWindow.loadURL(startUrl);

  const widgetUrl = new URL(`file://${__dirname}/index.html#/widget`);

  mainWindow.webContents.on('did-finish-load', () => {
    widget.loadURL(widgetUrl.href);
  });

  const menuTemplate = [
    {
      label: 'Electron',
      submenu: [
        {
          label: 'Open widget',
          click: () => {
            show(widget);
          },
        },
        {
          label: 'Close widget',
          click: () => {
            hide(widget);
          },
        },
        {
          type: 'separator',
        },
        {
          label: 'Quit',
          click: () => {
            if (widget) {
              widget.destroy();
            }
            app.quit();
          },
          accelerator: 'Cmd+Q',
        },
      ],
    },
  ];
  const menu = Menu.buildFromTemplate(menuTemplate);
  Menu.setApplicationMenu(menu);

  // Emitted when the window is closed.
  mainWindow.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
    if (widget) {
      widget.destroy();
    }
  });

  widget.on('closed', () => {
    widget = null;
  });

  ipcMain.on('hide', () => {
    showWidget = !showWidget;
    hide(widget);
  });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow();
  }
});
