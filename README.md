## Webdriver IO Template

### 1. Prerequisites
#### 1.1. Node.js:
Install the latest Node.js **Recommended For Most Users** from
https://nodejs.org/en/
#### 1.2. Install Git:
https://git-scm.com/
#### 1.3. Install Java SE Development Kit:
https://www.oracle.com/java/technologies/javase-jdk14-downloads.html

### Additional MacOS prerequisites:
#### 1.4. Install Xcode:
https://developer.apple.com/xcode/

### Additional Windows prerequisites:
#### 1.5. Install all the required tools and configurations using Microsoft's windows-build-tools:
Open Command Prompt **as administrator** and run the following script:
````
npm install --global --production windows-build-tools
````
#### 1.6. Install Python 2.7.
https://www.python.org/downloads/release/python-2716/

#### 1.7. Use Git Bash instead of using Windows Command Prompt (for WebStorm).
1. Open WebStorm
2. Go to File => Settings
3. Go to Tools => Terminal
4. Specify Shell Path to Git Bash e.g.`C:\Program Files\Git\bin\sh.exe`


### **To run tests:**
* Clone repository
* Run `npm install`
* Run `npm test`

### **WebDriverIO v6 project setup from scratch:**
1. Create new NodeJS project (or run `npm init` inside existing directory)
2. Run `npm i --save-dev @wdio/cli`
3. Run `npx wdio config -y`
4. Run `mkdir -p ./test/specs & mkdir -p ./test/pages & mkdir -p ./test/data`
5. Babel setup: 
* create _babel.config.js_ and copy/paste following code:
```javascript
 module.exports = {
    presets: [
        ['@babel/preset-env', {
            targets: {
                node: 12
            }
        }]
    ]
}
```
* Run `npm install --save-dev @babel/core @babel/cli @babel/preset-env @babel/register`
* In _wdio.conf.js_ add _babel_ to compilers:
```javascript
mochaOpts: {
  ui: 'bdd',
  compilers: ['js:@babel/register'],
  timeout: 60000
},
```
6. Prettier setup:
* Run `npm install --save-dev prettier`
* Create `prettier.config.js` and copy/paste following code:
```javascript
module.exports = {
  trailingComma: 'all',
  tabWidth: 2,
  semi: true,
  singleQuote: true,
  bracketSpacing: true,
  arrowParens: 'avoid',
  parser: 'babel',
  printWidth: 100,
};
```
7. Add _Chai Assertions_ to your project:
* Run `npm install --save-dev chai`
* Setup _chai_ in beforeTest function (so you won't have to import it everytime).
Replace `beforeTest` function in wdio.conf js with following:
```javascript
  beforeTest: function () {
    const chai = require('chai');
    global.expect = chai.expect;
  },
```


8. To run your tests add `npx wdio wdio.conf.js` in package.json 

### **Add Allure Reporter to existing WDIO framework:**
1. Install Allure Reporter `npm install @wdio/allure-reporter --save-dev`
2. Add Allure to reporters in _wdio.conf.js_ file:
```javascript
  reporters: ['spec', ['allure', {
    outputDir: 'allure-results',
    disableWebdriverStepsReporting: false,
    disableWebdriverScreenshotsReporting: true,
  }]],
```
3. Install CLI for Allure `npm install allure-commandline --save-dev`
4. Add _report script_ to your _package.json_ file
```json
    "report": "allure generate allure-results --clean && allure open",
```
5. To take screenshot in package.json add:
```javascript
    afterTest: function(test, context, { error, result, duration, passed, retries }) {
        if (!passed) {
            browser.takeScreenshot();
        }
    }
  
