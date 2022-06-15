document.addEventListener("DOMContentLoaded", function () {
	let version = "V 1.2.0";
	document.getElementById("message").innerText = version;
	let activeElement = document.getElementById("active-option");
	let sheetSelector = document.getElementById("sheet-option");
	chrome.storage.sync.get(["GDDM-active"], function (result) {
		if (result["GDDM-active"] === "false") {
			activeElement.checked = false;
		} else {
			activeElement.checked = true;
		}
	});

	chrome.storage.sync.get(["GDDM-sheet"], function (result) {
		if (result["GDDM-sheet"] === "false") {
			sheetSelector.checked = false;
		} else {
			sheetSelector.checked = true;
		}
	});

	activeElement.onclick = function (e) {
		let selected = e.target.checked + "";
		chrome.storage.sync.set({ "GDDM-active": selected });
		let message = selected === "true" ? "mainOn" : "mainOff";

		chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
			chrome.tabs.sendMessage(tabs[0].id, message);
		});
	};

	sheetSelector.onclick = function (e) {
		let selected = e.target.checked + "";
		chrome.storage.sync.set({ "GDDM-sheet": selected });
		let message = selected === "true" ? "sheetOn" : "sheetOff";

		chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
			chrome.tabs.sendMessage(tabs[0].id, message);
		});
	};
});
