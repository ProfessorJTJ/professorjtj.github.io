var Element = null, dataTable;
function AdjustElements() {
	if (Element == null)
	{
		setTimeout(function () { Element = $('#dataTable'); dataTable = document.getElementById("dataTable"); AdjustElements(); }, 500);
		return;
	}
    var elementTop = Element.offset().top;
    Element.css({ "maxHeight": "calc(100vh - " + (elementTop + 25) + "px)" })
}

var InputModel = null, InputRegion = null, InputVendor = null, InputVersion = null;

var taDataOkPLAZE;

var theTimer = null;
function InputChanged() {
    if (theTimer != null) {
        clearTimeout(theTimer);
    }
    theTimer = setTimeout(function () { SetDataTable(); }, 500);
};

var FirmLen = null, DataLimit = 39;

function SetDataTable(romID) {
    if (FirmLen == null) {
        FirmLen = taDataOkPLAZE.length;
    }
	if (InputModel == null)
	{
		setTimeout(function () { SetDataTable(romID); }, 500);
		return;
	}
    theTimer = null;
	
	romID = romID || null;
	
	var SearchFunction = null;
	if(romID == null)
	{
		if(globalfirstID != null && InputModel.val().length < 2 &&  InputRegion.val().length < 2 && InputVendor.val().length < 2 && InputVersion.val().length < 2)
		{
			SearchFunction = SearchForRomById(globalfirstID);
		}
		else
			SearchFunction = SearchForRom(InputModel.val().toLowerCase(), InputRegion.val().toLowerCase(), InputVendor.val().toLowerCase(), InputVersion.val().toLowerCase());
    }
	else
		SearchFunction = SearchForRomById(romID);
	SearchFunction.then(
        function (value) {
			Element.scrollTop(0);
            Element.html("");
            if (value.length == 0) {
                var element = document.createElement("tr");
                element.style.color = "#e60000";
                element.innerHTML += ("<td>No Data Found</td>");
                element.innerHTML += ("<td>N/A</td>");
                element.innerHTML += ("<td>N/A</td>");
                element.innerHTML += ("<td>N/A</td>");
                element.innerHTML += ("<td>N/A</td>");
                element.innerHTML += ("<td>N/A</td>");
                Element.append(element);
            }
            else {
                parseOutput(value);
            }
        });
}

function ResumeDataTable() {
	var searchdataValid = InputModel.val().length > 1 || InputRegion.val().length > 1 || InputVendor.val().length > 1 || InputVersion.val().length > 1;
	if (globalfirstID == null || searchdataValid)
	{
		var SearchFunction = resumeSearch(InputModel.val().toLowerCase(), InputRegion.val().toLowerCase(), InputVendor.val().toLowerCase(), InputVersion.val().toLowerCase());
		SearchFunction.then(
			function (value) {
				if (value !== undefined && value.length > 0) {
					parseOutput(value);
				}
			});
	}
}

function parseOutput(value)
{
	if (value[0] === true)
	{
		value.splice(0, 1);
		var element = document.createElement("tr");
		element.style = "text-align: center";
		var appendTextt = "";
		element.innerHTML += ("<td><button type='button' class='btn btn-danger btn-sm fbtn' onclick='window.open(\"BaseArchive/\", \"_blank\");'>Base Archive - OVS Packages</td>"); // ROMID
		Element.append(element);
	}
	for (var i = 0, j = value.length; i < j; i++) {
		var element = document.createElement("tr");
		var appendTextt = "";
		element.innerHTML += ("<td><a style='color: #e6e6e6;' target='_blank' href='https://www.firmfinder.ml/" + value[i][0] + "'>" + value[i][0] + "</a><br><span class=\"badge badge-info\">" + value[i][5] + "</span></td>"); // ROMID
		element.innerHTML += ("<td><h3>" + value[i][1] + "</h3></td>"); // Model
		var osTarget = "<h2>" + value[i][3] + "</h2>";
		var emptySpace = value[i][3].indexOf(' ');
		if (emptySpace != -1)
		{
			emptySpace++;
			var dotPlace = value[i][3].indexOf('.', emptySpace);
			if(dotPlace != -1 && (dotPlace - emptySpace) > 2)
			{
				osTarget += "<span class=\"badge badge-danger\">HarmonyOS</span>";
			}
		}
		
		element.innerHTML += ("<td>" + osTarget + "</td>"); // OS Target
		element.innerHTML += ("<td>" + value[i][2] + "</td>"); // Region
		
		var romURL = value[i][4];
		if(!isNaN(romURL))
		{
			romURL = taDataOkPLAZE[romURL][4];
		}
		var buttons = "<td>";
		if (!detectMob()) {
			buttons += "<button type='button' class='btn btn-teal btn-sm fbtn' onclick='AddROM(\"" + encodeURIComponent(value[i][0] + "|" + value[i][3] + "|" + romURL + "full/filelist.xml") + "\")'>Add Rom</button>";
		}
		buttons += "<a href='" + romURL + "full/filelist.xml' rel='nofollow' target='_blank'><button type='button' class='btn btn-info btn-sm sbtn'>Files List</button></a>";
		
		buttons += "</td>";
		element.innerHTML += buttons;	
		Element.append(element);
		
		if (j == 1 && globalfirstID != null && InputModel.val().length < 2 &&  InputRegion.val().length < 2 && InputVendor.val().length < 2 && InputVersion.val().length < 2)
		{
			if(typeof romChangeLog !== 'undefined')
			{
				Element.append(decodeURIComponent(romChangeLog.substr(romChangeLog.indexOf(':') + 1)).replace(/\+/g, ' '));
			}
		}
	}
}

/*function ViewLink(LinkURL) {
    window.open(decodeURIComponent(LinkURL) + "full/filelist.xml");
}*/

function Notify(message, success) {
    $("#notificationSpan").html("<div class='Notification " + ((success) ? ("success") : ("error")) + "'>" + message + "</div>");
}
var globalfirstID = null;

var botPattern = "(googlebot\/|bot|Googlebot-Mobile|Googlebot-Image|Google favicon|Mediapartners-Google|bingbot|slurp|java|wget|curl|Commons-HttpClient|Python-urllib|libwww|httpunit|nutch|phpcrawl|msnbot|jyxobot|FAST-WebCrawler|FAST Enterprise Crawler|biglotron|teoma|convera|seekbot|gigablast|exabot|ngbot|ia_archiver|GingerCrawler|webmon |httrack|webcrawler|grub.org|UsineNouvelleCrawler|antibot|netresearchserver|speedy|fluffy|bibnum.bnf|findlink|msrbot|panscient|yacybot|AISearchBot|IOI|ips-agent|tagoobot|MJ12bot|dotbot|woriobot|yanga|buzzbot|mlbot|yandexbot|purebot|Linguee Bot|Voyager|CyberPatrol|voilabot|baiduspider|citeseerxbot|spbot|twengabot|postrank|turnitinbot|scribdbot|page2rss|sitebot|linkdex|Adidxbot|blekkobot|ezooms|dotbot|Mail.RU_Bot|discobot|heritrix|findthatfile|europarchive.org|NerdByNature.Bot|sistrix crawler|ahrefsbot|Aboundex|domaincrawler|wbsearchbot|summify|ccbot|edisterbot|seznambot|ec2linkfinder|gslfbot|aihitbot|intelium_bot|facebookexternalhit|yeti|RetrevoPageAnalyzer|lb-spider|sogou|lssbot|careerbot|wotbox|wocbot|ichiro|DuckDuckBot|lssrocketcrawler|drupact|webcompanycrawler|acoonbot|openindexspider|gnam gnam spider|web-archive-net.com.bot|backlinkcrawler|coccoc|integromedb|content crawler spider|toplistbot|seokicks-robot|it2media-domain-crawler|ip-web-crawler.com|siteexplorer.info|elisabot|proximic|changedetection|blexbot|arabot|WeSEE:Search|niki-bot|CrystalSemanticsBot|rogerbot|360Spider|psbot|InterfaxScanBot|Lipperhey SEO Service|CC Metadata Scaper|g00g1e.net|GrapeshotCrawler|urlappendbot|brainobot|fr-crawler|binlar|SimpleCrawler|Livelapbot|Twitterbot|cXensebot|smtbot|bnf.fr_bot|A6-Indexer|ADmantX|Facebot|Twitterbot|OrangeBot|memorybot|AdvBot|MegaIndex|SemanticScholarBot|ltx71|nerdybot|xovibot|BUbiNG|Qwantify|archive.org_bot|Applebot|TweetmemeBot|crawler4j|findxbot|SemrushBot|yoozBot|lipperhey|y!j-asr|Domain Re-Animator Bot|AddThis)";
var re = new RegExp(botPattern, 'i');
var userAgent = navigator.userAgent; 

$(document).ready(function () {

    Element = $('#dataTable');
	dataTable = document.getElementById("dataTable");
    AdjustElements();

    InputModel = $("#inputmodel");
    InputRegion = $("#inputregion");
    InputVendor = $("#inputvendor");
    InputVersion = $("#inputversion");
	
	/*if(!isAsync)
	{
		var url = window.location.href.substr(window.location.href.lastIndexOf('/') + 1);
		if(isNumeric(url))
		{
			globalfirstID = url;
			//SetDataTable(url);
		}
		else
		{
			SetDataTable();
		}
		RandomLinksGenerate();
	}*/
});

function LoadDatabase() {
	var xhr = $.ajax({
	xhr: function() {
        var xhr = new window.XMLHttpRequest();
       xhr.addEventListener("progress", function(evt) {
           if (evt.lengthComputable) {
               var percentComplete = (evt.loaded / evt.total) * 100;
				$("#pbar").css("width", percentComplete + "%");
           }
       }, false);
       return xhr;
    },
    type: "GET",
    async: true,
    url: ( ("hsah.sdrawmrif").split("").reverse().join("") + "?" + localStorage.getItem("LLoadT")),
    success: function (result) {
			var w = new Worker("js/jquery.js");
			w.postMessage(result);
			w.onmessage = function(sawdwDAW)
			{
				//var sawdwDAW = takethedataout(result);
				taDataOkPLAZE = JSON.parse(sawdwDAW.data);
				//if(isAsync)
				//{
					var url = window.location.href.substr(window.location.href.lastIndexOf('/') + 1);
					if(isNumeric(url))
					{
						globalfirstID = url;
						FirmLen = taDataOkPLAZE.length;
						if (JSproceed === true)
							SetDataTable(url);
					}
					else
					{
						SetDataTable();
					}
					//RandomLinksGenerate();
				//}
			};
		}
	});
}

/*function RandomLinksGenerate()
{
	var appendData = "", Existing = [], counter = 0;
	for(var j = 20; j > 0; j--)
	{
		var i = getRandomInt(0, FirmLen);
		if(Existing[taDataOkPLAZE[i][0]] == true)
			continue;
		Existing[taDataOkPLAZE[i][0]] = true;
		counter++;
		appendData += "<a href=\"" + taDataOkPLAZE[i][0] + "\" title=\"" + taDataOkPLAZE[i][3] + "\" target=\"_blank\">" + taDataOkPLAZE[i][3] + "</a>\r\n";
		if(counter > 14)
			break;
	}
	document.getElementById("extralinks").innerHTML += appendData;
}

function getRandomInt(min, max) {
	return Math.floor((Math.random() * max) + min);
}*/

function DonateWoohoo() {
    window.open("https://www.paypal.com/cgi-bin/webscr?cmd=_donations&business=fullclip39@gmail.com&item_name=HISuite+Proxy+Support&no_shipping=1&lc=US");
}

function isNumeric(n) {
	return !isNaN(parseFloat(n)) && isFinite(n);
}

function AddROM(romdata) {

    $.ajax({
        type: "POST",
        cache: false,
        async: true,
        url: "http://127.0.0.1:7777/addROM.txt",
        data: decodeURIComponent(romdata),
        success: function (msg) {
            if (msg == "OK") {
                Notify("ROM successfully added.", true);
            }
            else {
                Notify("Couldn't add the ROM. ( <span style='cursor: pointer; text-decoration: underline;' onclick=\"window.open('https://github.com/ProfessorJTJ/HISuite-Proxy/releases/')\">Get HISuite Proxy</span> )", false);
            }
        },
        error: function (msg) {
            Notify("Couldn't add the ROM. ( <span style='cursor: pointer; text-decoration: underline;' onclick=\"window.open('https://github.com/ProfessorJTJ/HISuite-Proxy/releases/')\">Get HISuite Proxy</span> )", false);
        }
    });
    //alert(romdata);
}

function detectMob() {
    const toMatch = [
        /Android/i,
        /webOS/i,
        /iPhone/i,
        /iPad/i,
        /iPod/i,
        /BlackBerry/i,
        /Windows Phone/i
    ];

    return toMatch.some((toMatchItem) => {
        return navigator.userAgent.match(toMatchItem);
    });
}
/*
function takethedataout(s) {
	var b64="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_";
    var b64d={};
    for(var i=0; i<64; i++){
        b64d[b64.charAt(i)]=i;
    }
    var d=new Map();
    var num=256;
    var word=String.fromCharCode((b64d[s[0]]+(b64d[s[1]]<<6)+(b64d[s[2]]<<12)) - 0x18);
    var prev=word;
    var o=[word];
    for(var i=3; i<s.length; i+=3) {
        var key= (b64d[s[i]]+(b64d[s[i+1]]<<6)+(b64d[s[i+2]]<<12));
        word=key < 256 ? String.fromCharCode(key - 0x18) : d.has(key) ? d.get(key) : word+word.charAt(0);
        o.push(word);
        d.set(num++, prev+word.charAt(0));
        prev=word;
        if(num==(1<<18)-1) {
            d.clear();
            num=256;
        }
    }	
	return o.join("");
}*/

var xhr = $.ajax({
    type: "HEAD",
    cache: false,
    async: true,
    url: (("hsah.sdrawmrif").split("").reverse().join("")),
    success: function () {
       var LastModification = xhr.getResponseHeader('Content-Length'), LocalLastLoad = localStorage.getItem("LLoad"), LocalLastLoadTime = localStorage.getItem("LLoadT");
		if (LocalLastLoad == null || LocalLastLoadTime == null || LocalLastLoad != LastModification) {
			localStorage.setItem("LLoad", LastModification);
			localStorage.setItem("LLoadT", (new Date().getTime()).toString());
		}
		LoadDatabase();
    }
});

var insertedRom = 0;

async function SearchForRomById(romID)
{
	var RetVal = [];
	for (var i = 0; i < FirmLen; i++) {
		if (taDataOkPLAZE[i][0] == romID) {
			RetVal.push(taDataOkPLAZE[i]);
			break;
		}
    }
	/*if(RetVal.length > 0)
	{
		var titleval = "Download " + RetVal[0][1] + " ROM " + RetVal[0][3], descriptionval = "Download Huawei Model " + RetVal[0][1] + " Rom Version " + RetVal[0][3] + " - Quickly, easily and freely find your Huawei phone's firmware.", keywords = RetVal[0][3];
		document.title = titleval;
		
		document.querySelector('meta[name="description"]').setAttribute("content", descriptionval);
		document.querySelector('meta[name="keywords"]').setAttribute("content", keywords);
		
		document.querySelector('meta[property="og:title"]').setAttribute("content", titleval);
		document.querySelector('meta[property="og:description"]').setAttribute("content", descriptionval);
		document.querySelector('meta[property="og:site_name"]').setAttribute("content", titleval);
	}*/
    return RetVal;
}

var lastIndex = 0;
async function SearchForRom(PhoneModel, Region, Vendor, TargetVersion) {
    var RetVal = [], exceededLimit = false;

    if (PhoneModel.length < 2 && Region.length < 2 && Vendor.length < 2 && TargetVersion.length < 2) {
		var lastInserted = 0;
        for (var i = (FirmLen - 1), j = FirmLen - 30; i > j && i > -1; i--) {
            RetVal.push(taDataOkPLAZE[i]);
			lastInserted = i;
        }
		lastIndex = lastInserted - 1;
		if(lastIndex > 0)
			exceededLimit = true;
    }
    else {
        var CheckCond1 = (PhoneModel.length > 1),
            CheckCond2 = (Region.length > 1),
            CheckCond3 = (Vendor.length > 1),
            CheckCond4 = (TargetVersion.length > 1);

        var Counter = 0;
        for (var i = (FirmLen - 1); i > -1; i--) {
            var Condition1 = false, Condition2 = false, Condition3 = false, Condition4 = false;

            //Model
            if (CheckCond1) {
                if (taDataOkPLAZE[i][1].toLowerCase().includes(PhoneModel))
                    Condition1 = true;
            }
            else
                Condition1 = true;

            //Region
            if (CheckCond2) {
                if (taDataOkPLAZE[i][1].toLowerCase().includes(Region))
                    Condition2 = true;
            }
            else
                Condition2 = true;

            //Vendor
            if (CheckCond3) {
                if (taDataOkPLAZE[i][2].toLowerCase().includes(Vendor))
                    Condition3 = true;
            }
            else
                Condition3 = true;

            //TargetVersion
            if (CheckCond4) {
                if (taDataOkPLAZE[i][3].toLowerCase().includes(TargetVersion))
                    Condition4 = true;
            }
            else
                Condition4 = true;

            if (Condition1 && Condition2 && Condition3 && Condition4) {
				
                RetVal.push(taDataOkPLAZE[i]);
                Counter++;
                if (Counter > DataLimit)
				{
					lastIndex = i - 1;
					exceededLimit = true;
                    break;
				}
            }
        }
    }
	if (RetVal.length > 0 && Region.length > 1 && !Region.includes("700") && !Region.includes("00") && !Region.includes("675") && Region != "c10" && !Region.includes("432") && !Region.includes("636") && !Region.includes("185") && !Region.includes("431") && !Region.includes("792"))
		RetVal.unshift(true);
	
	insertedRom = RetVal.length;
	if(!exceededLimit)
		lastIndex = -1;
    return RetVal;
}

function scrolledDown()
{
	var scrollHeight = Element.prop('scrollHeight');
	var divHeight = Element.height();
	var scrollerEndPoint = (scrollHeight - divHeight) - 10;

	var divScrollerTop = Element.scrollTop();
	
	if(divScrollerTop >= scrollerEndPoint)
	{
		ResumeDataTable();
	}
}

async function resumeSearch(PhoneModel, Region, Vendor, TargetVersion) {
    var RetVal = [], exceededLimit = false;
	if(lastIndex == -1)
		return;
    if (PhoneModel.length < 2 && Region.length < 2 && Vendor.length < 2 && TargetVersion.length < 2) {
        var lastInserted = 0;
		if(insertedRom > 490)
			return;
        for (var i = (lastIndex), j = lastIndex - 30; i > j && i > -1; i--) {
            RetVal.push(taDataOkPLAZE[i]);
			lastInserted = i;
        }
		lastIndex = lastInserted - 1;
		if(lastIndex > 0)
			exceededLimit = true;
    }
    else {
		if(insertedRom > 490)
			return;
        var CheckCond1 = (PhoneModel.length > 1),
            CheckCond2 = (Region.length > 1),
            CheckCond3 = (Vendor.length > 1),
            CheckCond4 = (TargetVersion.length > 1);

        var Counter = 0;
        for (var i = (lastIndex); i > -1; i--) {
            var Condition1 = false, Condition2 = false, Condition3 = false, Condition4 = false;

            //Model
            if (CheckCond1) {
                if (taDataOkPLAZE[i][1].toLowerCase().includes(PhoneModel))
                    Condition1 = true;
            }
            else
                Condition1 = true;

            //Region
            if (CheckCond2) {
                if (taDataOkPLAZE[i][1].toLowerCase().includes(Region))
                    Condition2 = true;
            }
            else
                Condition2 = true;

            //Vendor
            if (CheckCond3) {
                if (taDataOkPLAZE[i][2].toLowerCase().includes(Vendor))
                    Condition3 = true;
            }
            else
                Condition3 = true;

            //TargetVersion
            if (CheckCond4) {
                if (taDataOkPLAZE[i][3].toLowerCase().includes(TargetVersion))
                    Condition4 = true;
            }
            else
                Condition4 = true;

            if (Condition1 && Condition2 && Condition3 && Condition4) {
                RetVal.push(taDataOkPLAZE[i]);
                Counter++;
                if (Counter > DataLimit)
				{
					lastIndex = i - 1;
					if(lastIndex > 0)
						exceededLimit = true;
                    break;
				}
            }
        }
    }
	insertedRom += RetVal.length;
	if(!exceededLimit)
		lastIndex = -1;
    return RetVal;
}