// Chrome extension update flow description:
// https://stackoverflow.com/questions/39124570/chrome-extension-update-flow

console.log("Checkbot background page started");

const urlShownOnUninstall = "https://goo.gl/forms/Hr40qbAD2v22XRLq1";
chrome.runtime.setUninstallURL(urlShownOnUninstall);

const checkbotExtensionUrl = chrome.extension.getURL("index.html");

function bringTabToFocus(tab) {
  chrome.tabs.update(tab.id, {
    active: true
  });
  chrome.windows.update(tab.windowId, {
    focused: true
  });
}

function getOwnExtensionTabs() {
  return Promise.all(chrome.extension.getViews({ type: "tab" }).map(view => new Promise(resolve => view.chrome.tabs.getCurrent(tab => resolve(Object.assign(tab, { url: view.location.href }))))));
}

async function openExtensionTab(url, createdTabCallback) {
  const ownTabs = await getOwnExtensionTabs();
  const tab = ownTabs.find(tab => tab.url.includes(url));
  if (tab) {
    bringTabToFocus(tab);
  } else {
    chrome.tabs.create({ url }, createdTabCallback);
  }
}

let crawlUrl = "";
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  console.log("Background script received message");
  if (request.message == "getThenClearBrowserActionUrl") {
    const crawlUrlResponse = crawlUrl;
    crawlUrl = "";
    console.log("Returning browser URL");
    {
      sendResponse({
        crawlUrl: crawlUrlResponse
      });
    }
  }
});

// When the extension tab is closed, reload the extension to force Chrome to update the extension
// if an update is available. See:
// https://developer.chrome.com/apps/runtime
// "If your extension is using a persistent background page, the background page of course never gets unloaded, so unless you call chrome.runtime.reload() manually [...] the update will not get installed until the next time chrome itself restarts."
function reloadExtensionOnTabClose(createdTab) {
  chrome.tabs.onRemoved.addListener(function (removedTabId, removed) {
    if (createdTab.id === removedTabId) {
      chrome.runtime.reload();
    }
  });
}

function openCheckbotExtensionTab() {
  console.log("openCheckbotExtensionTab");
  openExtensionTab(checkbotExtensionUrl, reloadExtensionOnTabClose);
}

function saveActiveTabUrlAndOpenCheckbotExtensionTab(tabs) {
  const activeTab = tabs[0] || {};
  crawlUrl = activeTab.url;

  openCheckbotExtensionTab();
}
function browserActionClicked(tab) {
  const queryGetActiveTab = {
    active: true,
    currentWindow: true
  };
  chrome.tabs.query(queryGetActiveTab, saveActiveTabUrlAndOpenCheckbotExtensionTab);
}
chrome.browserAction.onClicked.addListener(browserActionClicked);

// "Fired when the extension is first installed, when the extension is updated to a new version, and when Chrome is updated to a new version."
chrome.runtime.onInstalled.addListener(function (details) {
  var reason = details.reason;
  if (reason === "install") {
    openCheckbotExtensionTab();
  }
});