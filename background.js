
chrome.browserAction.onClicked.addListener(function(tab) {
  console.log(`tab url: ${tab.url}`);
  chrome.tabs.executeScript(null, {
    file: 'readability/Readability.js'
  }, () => {
    chrome.tabs.executeScript(null, {file: 'readability/pretty.js'});
    console.log('ok');
  });
});
