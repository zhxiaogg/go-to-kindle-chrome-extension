chrome.browserAction.onClicked.addListener(function(tab) {
  chrome.tabs.insertCSS(null, {file: 'readability/pretty.css'});
  chrome.tabs.executeScript(null, {
    file: 'readability/Readability.js'
  }, () => {
    chrome.tabs.executeScript(null, {file: 'readability/prettify.js'});
  });
});
