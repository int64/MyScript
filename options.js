function rmArrayElem(arr,i){
	if (typeof i == 'object') {
		i = arr.indexOf(i);
	}
	var rest = arr.slice(parseInt(i) + 1);
	arr.length = i;
	arr.push.apply(arr, rest);
	return arr;
}

var rules = [];

var Rule = (function(){
	
	function Rule(container,rule) {
		this.init(container);
		if (rule) {
			this.set(rule);
		}
	}
	
	Rule.prototype.init = function(container){
		var rule = this;
		
		this.id = Math.round(Math.random() * 100) + '' + Math.round(Math.random() * 100) + '' + Math.round(Math.random() * 100);
		this.li = $("<li id='" + this.id + "'></li>");
		this.domain = $("<input type='text' class='ms-domain' placeholder='google.com' id='d-" + this.id + "' />");
		var dLabel = $("<label for='d-" + this.id + "'>Domain</label>");
		var testDomain = $("<input type='text' class='ms-test-domain' placeholder='test your rule there' id='t-" + this.id + "' />");
			testDomain.on('keyup',function(){
				if ($(this).val() != '' && rule.domain.val() != '') {
					var r = new RegExp(rule.domain.val(),'gi');
					r.test($(this).val()) ? $(this).css('border', "2px solid #27ae60") : $(this).css('border', "2px solid #c0392b");
				} else {
					$(this).css('border', "");
				}
			})
		this.js = $("<textarea class='ms-js' placeholder='document.body.style.background=\"#eee\";' id='js-" + this.id + "'></textarea>");
		var jsLabel = $("<label for='js-" + this.id + "'>JS</label>");
		this.css = $("<textarea class='ms-css' placeholder='body { background: \"#eee\"; }' id='css-" + this.id + "'></textarea>");
		var cssLabel = $("<label for='css-" + this.id + "'>CSS</label>");
		this.enabled = $("<input type='checkbox' checked class='ms-enabled' id='e-" + this.id + "' />");
		var eLabel = $("<label for='e-" + this.id + "'>Enabled</label>");
		var rButton = $("<button class='ms-remove'>Remove</button>");
			rButton.on('click',function(){ rule.remove(); });
		
		container.append(this.li.append(dLabel,this.domain,testDomain,jsLabel,this.js,cssLabel,this.css,this.enabled,eLabel,rButton));
	}
	
	Rule.prototype.getID = function() {
		return this.id;
	}
	
	Rule.prototype.find = function() {
		for (var i in rules) {
			if (rules[i] === this) {
				console.log(i);
				return i;
			}
		}
		return false;
	}
	
	Rule.prototype.remove = function() {
		this.li.remove();
		rules.splice(this.find(),1);
	}
		
	Rule.prototype.set = function(rule) {
		this.domain.val(rule.domain);
		this.js.val(rule.js);
		this.css.val(rule.css);
		this.enabled.prop('checked',rule.enabled);
	}
	
	Rule.prototype.get = function() {
		return {
			'domain': this.domain.val(),
			'js': this.js.val(),
			'css': this.css.val(),
			'enabled': this.enabled.prop('checked')
		};
	}
	
	return Rule;
})()

function getRules() {
	var arr = [];
	for (var i in rules) {
		arr.push(rules[i].get());
	}
	return arr;
}

function loadRules(json) {
	for (var i in rules) {
		rules[i].remove();
	}
	
	var r = JSON.parse(json);
	for (var i in r) {
		rules.push(new Rule($("#ms-list"),r[i]));
	}
}

$(function(){
	loadRules(localStorage.myScript || null);
	
	$(document)
		.on('click',"#ms-add",function(){
			rules.push(new Rule($("#ms-list")));
		})
		.on('click',"#ms-save",function(){
			localStorage.myScript = JSON.stringify(getRules());
			$("#ms-message").hide(0).text('saved').fadeIn(150);
			setTimeout(function(){
				$("#ms-message").fadeOut(300,function(){ $(this).text(''); });
			},2000);
		})
		.on('click',"#ms-export",function(){
			$("#ms-export-container").val(JSON.stringify(getRules()));
		})
		.on('click',"#ms-import",function(){
			loadRules($("#ms-export-container").val());
		})
})