const expect = require('expect')
window.jest = require('jest-mock')

window.expect = expect
//window.$ = s => document.querySelector(s)
//window.$$ = s => Array.from(document.querySelectorAll(s))

let files = require.context('./src/__tests__', true, /\.spec\.js/)
files.keys().forEach(files)

module.hot.accept()
