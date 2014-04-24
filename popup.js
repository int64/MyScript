/* $(function(){
	var rules = JSON.parse(localStorage.myScript || null);
	chrome.tabs.getSelected(null,function(tab) {
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
	});
}) */