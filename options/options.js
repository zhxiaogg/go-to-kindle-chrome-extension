var clearTipsHandle = null;

const $ = (id) => document.getElementById(id);

chrome.storage.sync.get(["mail", "action"], ({mail, action}) => {
  if (action) {
    $("action").value = action;
  }
  if (mail) {
    $("mail").value = mail;
  }
});

document.getElementById("options-form").onsubmit = function(e) {
  e.preventDefault();
  const mail = $("mail").value;
  const action = $("action").value;
  chrome.storage.sync.set({mail: mail, action: action}, function() {
    $("tips").classList.add("alert-success");
    $("tips").innerText = "success!";
    if(clearTipsHandle) {
      clearTimeout(clearTipsHandle);
    }

    clearTipsHandle = setTimeout(() => {
          $("tips").classList.remove("alert-success");
          $("tips").innerText = "";
    }, 3000)
  });
};
