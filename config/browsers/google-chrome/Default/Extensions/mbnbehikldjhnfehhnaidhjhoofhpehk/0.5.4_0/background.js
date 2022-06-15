/* global chrome */
chrome.browserAction.onClicked.addListener(function () {
    chrome.tabs.executeScript({
        file: 'scripts/index.js'
    });
    chrome.tabs.insertCSS({
        file: 'styles/page.css'
    });
});