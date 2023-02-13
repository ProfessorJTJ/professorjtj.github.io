(function() {
	try {
		var url_string = window.location;
		var url = new URL(url_string);
		var c = url.searchParams.get("url");
		if (c.length > 2) {
			alert(c);
			window.location = c;
		}
	}
	catch(msg) {
		
	}
})();
