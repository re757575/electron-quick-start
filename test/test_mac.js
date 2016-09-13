Application = require('spectron').Application
var assert = require('assert')

var app = new Application({
  path: './dist/MyElectronApp-darwin-x64/MyElectronApp.app/Contents/MacOS/MyElectronApp'
})

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
  assert.equal(flag, true)
}).catch(function (error) {
  // Log any failures
  console.error('Test failed', error.message)
}).then(function () {
  // Stop the application
  return app.stop()
})
