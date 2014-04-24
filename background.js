function loadScripts(tabId, changeInfo, tab) {
	if (changeInfo && changeInfo.status == 'complete') {
		var rules = JSON.parse(localStorage.myScript || null);
		for (var i in rules) {
			var r = new RegExp(rules[i].domain,'ig');
			if (rules[i].enabled && r.test(tab.url)) {
				chrome.tabs.executeScript({
					code: rules[i].js
				});
				chrome.tabs.insertCSS({
					code: rules[i].css
				})
			}
		}
	}
}
chrome.tabs.onUpdated.addListener(loadScripts);