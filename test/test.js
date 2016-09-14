Application = require('spectron').Application
var assert = require('assert')

var appConfig = {};
var appName = 'MyElectronApp';

switch(process.platform) {
  case 'win32':
    appConfig.path = `./dist/${appName}-win32-${process.arch}/${appName}.exe`;
    break;
  case 'darwin':
    appConfig.path = `./dist/${appName}-darwin-${process.arch}/${appName}.app/Contents/MacOS/${appName}`;
    break;
  case 'linux':
  default:
    console.log(`not yet support platform: ${process.platform}`);
    process.exit(1);
    break;
}

var app = new Application(appConfig)

app.start().then(function () {
  // Check if the window is visible
  return app.browserWindow.isVisible()
}).then(function (isVisible) {
  // Verify the window is visible
  assert.equal(isVisible, true)
}).then(function () {
  // Get the window's title
  return app.browserWindow.getTitle() // not app.client.getTitle()
}).then(function (title) {
  // Verify the window's title
  assert.equal(title, 'My Electron-React App with ES6')
}).then(function () {
  // Get the window's full screen
  return app.browserWindow.isFullScreen()
}).then(function (flag) {
  // Verify the window's full sreen ?
  assert.equal(flag, false)
}).catch(function (error) {
  // Log any failures
  console.error('Test failed', error.message)
}).then(function () {
  // Stop the application
  return app.stop()
})
