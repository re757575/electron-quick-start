const Application = require('spectron').Application;
const assert = require('assert');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const appName = 'MyElectronApp';

chai.should();
chai.use(chaiAsPromised);

let appConfig = {};

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

describe('application launch', () => {
  let app;

  beforeEach(() => {
    app = new Application(appConfig);
    return app.start();
  })

  beforeEach(() => {
    chaiAsPromised.transferPromiseness = app.transferPromiseness;
  })

  afterEach(() => {
    if (app && app.isRunning()) {
      return app.stop();
    }
  })

  it('check browserWindow', () => {
    return app.client.waitUntilWindowLoaded()
      .browserWindow.isVisible().should.eventually.be.true
      .browserWindow.getTitle().should.eventually.equal('My Electron-React App with ES6')
      .browserWindow.isFullScreen().should.eventually.be.false;
  })

})
