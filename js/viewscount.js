var popupplus_user_id = 6433;

var popupplus_url;
document.popupplus_popup = false;
var popupplus_browser = function () {
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
}
();

function popupplus_pop2under() {
    try {
        popupplus_popup_ww.blur();
    } catch (e) {}
    try {
        popupplus_popup_ww.opener.window.focus();
    } catch (e) {}
    try {
        window.self.window.focus();
    } catch (e) {}
    try {
        window.focus();
    } catch (e) {}
    try {
        if (popupplus_browser.firefox)
            openCloseWindow();
        if (popupplus_browser.webkit)
            openCloseTab();
        if (popupplus_browser.msie) {
            setTimeout(function () {
                popupplus_popup_ww.blur();
                popupplus_popup_ww.opener.window.focus();
                window.self.window.focus();
                window.focus();
            }, 1000);
        }
    } catch (e) {}
}

function openCloseWindow() {
    var ghost = window.open('about:blank');
    ghost.focus();
    ghost.close();
}

function openCloseTab() {
    var nothing = '';
    var ghost = document.createElement("a");

    document.getElementsByTagName("body")[0].appendChild(ghost);

    var clk = document.createEvent("MouseEvents");
    clk.initMouseEvent("click", false, true, window, 0, 0, 0, 0, 0, true, false, false, true, 0, null);
    ghost.dispatchEvent(clk);

    ghost.parentNode.removeChild(ghost);
}

popupplus_wid = (typeof popupplus_website_id == 'undefined') ? 'null' : popupplus_website_id;
popupplus_uid = (typeof popupplus_user_id == 'undefined') ? 'null' : popupplus_user_id;
popupplus_userMax = (typeof popupplus_userMax == 'undefined') ? 'null' : popupplus_userMax;
var script = document.createElement('script');
var x = Math.floor((Math.random() * 10000000) + 1);
script.type = 'text/javascript';
script.src = 'https://counter.popupplus.ir/?website=1&wid=' + popupplus_wid + '&uid=' + popupplus_uid + '&usermax=' + popupplus_userMax + '&host=professorjtj.github.io/?' + x;
var bd = document.getElementsByTagName('body');
var hd = document.getElementsByTagName('head')[0];
hd.appendChild(script);

function popupplus_setCookie(name, value) {
    // exdays = 2;
    // var exdate=new Date();
    // exdate.setDate(exdate.getDate() + exdays);

    var exdate = new Date();
    exdate.setTime(exdate.getTime() + (2 * 60 * 1000));

    document.cookie = escape(name) + "=" + escape(value) + "; path=/; expires=" + exdate.toGMTString();
}
function popupplus_getCookie(name) {
    var exp = new RegExp(escape(name) + "=([^;]+)");
    if (exp.test(document.cookie + ";")) {
        exp.exec(document.cookie + ";");
        return unescape(RegExp.$1);
    } else
        return false;
}
