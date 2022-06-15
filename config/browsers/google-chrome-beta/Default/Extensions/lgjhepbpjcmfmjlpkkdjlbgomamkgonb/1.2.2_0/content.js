var cssId = "darkModeStylesheet";
var sheetCssId = "darkModeStyleSheetColor";
var head = document.getElementsByTagName("head")[0];

try {
	head.appendChild(createLink(cssId, "css/dark_mode_docs.css"));
	console.log("Dark mode enabled successfully!");
} catch (err) {
	console.log("Error while loading dark mode: ", err);
}

chrome.storage.sync.get(["GDDM-active"], function (result) {
	if (result["GDDM-active"] === "false") {
		if (document.getElementById(cssId)) {
			let linkToCSS = document.getElementById(cssId);
			linkToCSS.parentElement.removeChild(linkToCSS);
		}
	}
});

chrome.storage.sync.get(["GDDM-sheet"], function (result) {
	if (result["GDDM-sheet"] === "true") {
		try {
			head.appendChild(createLink(sheetCssId, "css/darkModeSheet.css"));
			console.log("Sheet color loaded successfully!");
		} catch (err) {
			console.log("Error while sheet color: ", err);
		}
	}
});

chrome.runtime.onMessage.addListener(function (message) {
	if (message === "mainOn") {
		// If link is not there, add it
		if (!document.getElementById(cssId)) {
			head.appendChild(createLink(cssId, "css/dark_mode_docs.css"));
		}
	}

	if (message === "mainOff") {
		// If the link is there, remove it
		if (document.getElementById(cssId)) {
			let linkToCSS = document.getElementById(cssId);
			linkToCSS.parentElement.removeChild(linkToCSS);
		}
	}

	if (message === "sheetOn") {
		// If link is not there, add it
		if (!document.getElementById(sheetCssId)) {
			head.appendChild(createLink(sheetCssId, "css/darkModeSheet.css"));
		}
	}

	if (message === "sheetOff") {
		// If the link is there, remove it
		if (document.getElementById(sheetCssId)) {
			let linkToCSS = document.getElementById(sheetCssId);
			linkToCSS.parentElement.removeChild(linkToCSS);
		}
	}
});

function createLink(id, ref) {
	var link = document.createElement("link");
	link.id = id;
	link.rel = "stylesheet";
	link.type = "text/css";
	link.href = chrome.extension.getURL(ref);
	link.media = "all";
	return link;
}
