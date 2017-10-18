window.addEventListener("message", ({data, origin}) => {
  const {title, byline, content, uri}  = data;

  document.getElementById("title").innerText = title;
  document.getElementById("article-body").innerHTML = content;
  document.getElementById("byline").innerHTML = byline ? byline : uri.host;
});

// frame loaded
window.parent.postMessage("give me my ariticle", "*");
