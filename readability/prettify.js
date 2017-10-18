if(!window.prettified) {
  window.prettified = true;
  prettify();
} else {
  chrome.runtime.sendMessage("reload");
}

function prettify() {
  var loc = document.location;
  var uri = {
    spec: loc.href,
    host: loc.host,
    prePath: loc.protocol + "//" + loc.host,
    scheme: loc.protocol.substr(0, loc.protocol.indexOf(":")),
    pathBase: loc.protocol + "//" + loc.host + loc.pathname.substr(0, loc.pathname.lastIndexOf("/") + 1)
  };
  var article = new Readability(uri, document, {debug: false}).parse();
  if(article && article.content) {
    const url = chrome.runtime.getURL('readability/pretty.html');
    document.getElementsByTagName("head")[0].innerHTML = "";
    const newBody = document.createElement('body');
    newBody.innerHTML = `<iframe id="pretty-article-frame" src="${url}"></iframe>`;
    document.body = newBody;

    window.addEventListener("message", ({data, origin}) => {
      if(data === "give me my ariticle") {
        const form = document.getElementById("pretty-article-frame");
        form.contentWindow.postMessage(article, "*");
      }
    });
  }
}
