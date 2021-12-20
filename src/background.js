'use strict'

import {
  app,
  protocol,
  BrowserWindow,
  Tray,
  nativeImage,
  Menu
} from 'electron'
import {
  createProtocol
} from 'vue-cli-plugin-electron-builder/lib'
import installExtension, {
  VUEJS3_DEVTOOLS
} from 'electron-devtools-installer'

const path = require('path')

const isDevelopment = process.env.NODE_ENV !== 'production'

let tray = null


// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([{
  scheme: 'app',
  privileges: {
    secure: true,
    standard: true
  }
}])

async function createWindow() {
  // Create the browser window.
  const win = new BrowserWindow({
    width: 1000,
    height: 700,
    webPreferences: {

      // Use pluginOptions.nodeIntegration, leave this alone
      // See nklayman.github.io/vue-cli-plugin-electron-builder/guide/security.html#node-integration for more info
      nodeIntegration: process.env.ELECTRON_NODE_INTEGRATION,
      contextIsolation: !process.env.ELECTRON_NODE_INTEGRATION
    }
  })

  // 托盘
  // 创建一个icon
  const icon = nativeImage.createFromPath(path.join(__dirname, '/static/code-creator-128.icns'))
  // const icon = nativeImage.createFromPath('./static/code-creator-128.icns')

  // 实例化一个托盘对象
  tray = new Tray(icon)
  tray.setToolTip('Code-creator')
  tray.setTitle('Code-creator')
  // 托盘鼠标右键
  tray.on('right-click', () => {
    //创建右键菜单
    const menuConfig = Menu.buildFromTemplate([{
      label: 'Exit',
      click: () => app.quit(),
    }])
    tray.popUpContextMenu(menuConfig)
  })
  tray.on('click', () => {
    // 这里来控制窗口的显示和隐藏
    if (win.isVisible()) {
      win.hide()
    } else {
      win.show()
    }
  })



  if (process.env.WEBPACK_DEV_SERVER_URL) {
    // Load the url of the dev server if in development mode
    await win.loadURL(process.env.WEBPACK_DEV_SERVER_URL)
    if (!process.env.IS_TEST) win.webContents.openDevTools()
  } else {
    createProtocol('app')
    // Load the index.html when not in development
    win.loadURL('app://./index.html')
  }
}

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) createWindow()
})

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', async () => {
  if (isDevelopment && !process.env.IS_TEST) {
    // Install Vue Devtools
    try {
      await installExtension(VUEJS3_DEVTOOLS)
    } catch (e) {
      console.error('Vue Devtools failed to install:', e.toString())
    }
  }
  createWindow()
})




// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
  if (process.platform === 'win32') {
    process.on('message', (data) => {
      if (data === 'graceful-exit') {
        app.quit()
      }
    })
  } else {
    process.on('SIGTERM', () => {
      app.quit()
    })
  }
}