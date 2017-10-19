window.onload = function() {
  const container = document.getElementById("container");
  container.onclick = function(e) {
    if (e.target === container) {
        chrome.runtime.sendMessage("reload");
    }
  };

  window.addEventListener("message", ({data, origin}) => {
    const {title, byline, content, uri}  = data;
    document.getElementById("title").innerText = title;
    document.getElementById("article-body").innerHTML = content;
    document.getElementById("byline").innerHTML = byline ? byline : uri.host;
  });

  // frame loaded
  window.parent.postMessage("give me my ariticle", "*");
};
