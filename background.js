chrome.browserAction.onClicked.addListener(function(tab) {

  chrome.storage.sync.get(["mail", "action"], ({mail, action}) => {
    if(action === "mail") {
      sendMail(mail, tab.url);
    } else {
      prettifyPage();
    }
  });
});

function prettifyPage() {
  chrome.tabs.insertCSS(null, {file: 'readability/pretty.css'});
  chrome.tabs.executeScript(null, {
    file: 'readability/Readability.js'
  }, () => {
    chrome.tabs.executeScript(null, {file: 'readability/prettify.js'});
  });
}

function sendMail(mail, url) {
  if(!mail) {
    //TODO: redirect to options page?
    return;
  }

  if(!url.startsWith("http")) {
    // TODO: log?
    return;
  }

  // curl gotokindle.com?url=&mail=
  alert(mail);
}

chrome.runtime.onMessage.addListener((msg) => {
  if(msg === "reload") {
    chrome.tabs.reload();
  }
});
