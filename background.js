chrome.contextMenus.removeAll();
chrome.contextMenus.create({
  id: "send email",
  title: "Send Email",
  contexts:["browser_action"]
});

chrome.contextMenus.create({
  id: "clear page",
  title: "Clear Page",
  contexts:["browser_action"]
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  console.log(info);
  if(info.menuItemId === "send email") {
    chrome.storage.sync.get(['mail'], ({mail}) => {
      sendMail(mail, tab.url);
    });
  } else if(info.menuItemId === "clear page") {
    prettifyPage();
  }
});

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
    prompt_for_email();
    return;
  }
  if(!url.startsWith("http")) {
    // TODO: log?
    return;
  }
  _send(mail, url);
}

function prompt_for_email() {
  if (chrome.runtime.openOptionsPage) {
    // New way to open options pages, if supported (Chrome 42+).
    chrome.runtime.openOptionsPage();
  } else {
    // Reasonable fallback.
    window.open(chrome.runtime.getURL('options/options.html'));
  }
}

function _send(mail, url) {
  const xhr = new XMLHttpRequest();
  xhr.timeout = 60000;
  xhr.onreadystatechange = function() {
    if (xhr.readyState == 4) {
      if(xhr.status === 200) {
        console.log('gotokindle: send to mail succeeded!');
      } else {
        if(xhr.responseText) {
          result = JSON.parse(xhr.responseText)
          console.log(`gotokindle: send to mail failed, ${result}`);
        }
      }
    }
  }; 
  xhr.open("GET", `http://gotokindle.com/?url=${url}&mail=${mail}`, true);
  xhr.send();
}

chrome.runtime.onMessage.addListener((msg) => {
  if(msg === "reload") {
    chrome.tabs.reload();
  }
});
