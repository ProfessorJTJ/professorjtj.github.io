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
				passedAds = 0;
                for (var i = 0, j = value.length; i < j; i++) {
                    var element = document.createElement("tr");
					var appendTextt = "";
                    element.innerHTML += ("<td>" + value[i][0] + "<br><span class=\"badge badge-info\">" + value[i][5] + "</span></td>"); // ROMID
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
		
                    //element.innerHTML += ("<td><h2>" + value[i][3] + "</h2></td>"); // OS Target
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
                }
            }
        });
}

/*function ViewLink(LinkURL) {
    window.open(decodeURIComponent(LinkURL) + "full/filelist.xml");
}*/

function Notify(message, success) {
    $("#notificationSpan").html("<div class='Notification " + ((success) ? ("success") : ("error")) + "'>" + message + "</div>");
}
var globalfirstID = null;
$(document).ready(function () {

    Element = $('#dataTable');
	dataTable = document.getElementById("dataTable");
    AdjustElements();

    InputModel = $("#inputmodel");
    InputRegion = $("#inputregion");
    InputVendor = $("#inputvendor");
    InputVersion = $("#inputversion");
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
    url: ( ("hsah.sdrawmrif").split("").reverse().join("") + "?" + localStorage.getItem("LLBoadT")),
    success: function (result) {	
			var sawdwDAW = takethedataout(result);
			taDataOkPLAZE = JSON.parse(sawdwDAW);
			var url = window.location.href.substr(window.location.href.lastIndexOf('/') + 1);
			if(isNumeric(url))
			{
				globalfirstID = url;
				SetDataTable(url);
			}
			else
			{
				SetDataTable();
			}
		}
	});
}

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
}

var succeeded = false;
var xhr = $.ajax({
    type: "HEAD",
    cache: false,
    async: false,
    url: (("hsah.sdrawmrif").split("").reverse().join("")),
    success: function () {
        succeeded = true;

    }
});
if (succeeded) {

    var LastModification = xhr.getResponseHeader('Last-Modified'), LocalLastLoad = localStorage.getItem("LLBoad"), LocalLastLoadTime = localStorage.getItem("LLBoadT");
    if (LocalLastLoad == null || LocalLastLoadTime == null || LocalLastLoad != LastModification) {
        localStorage.setItem("LLBoad", LastModification);
        localStorage.setItem("LLBoadT", (new Date().getTime()).toString());
    }
    LoadDatabase();
}

async function SearchForRomById(romID)
{
	var RetVal = [];
	for (var i = 0; i < FirmLen; i++) {
		if (taDataOkPLAZE[i][0] == romID) {
			RetVal.push(taDataOkPLAZE[i]);
			break;
		}
    }
	if(RetVal.length > 0)
	{
		var titleval = "Download " + RetVal[0][1] + " ROM " + RetVal[0][3], descriptionval = "Download Huawei Model " + RetVal[0][1] + " Rom Version " + RetVal[0][3] + " - Quickly, easily and freely find your Huawei phone's firmware.", keywords = RetVal[0][3];
		document.title = titleval;
		
		document.querySelector('meta[name="description"]').setAttribute("content", descriptionval);
		document.querySelector('meta[name="keywords"]').setAttribute("content", keywords);
		
		document.querySelector('meta[property="og:title"]').setAttribute("content", titleval);
		document.querySelector('meta[property="og:description"]').setAttribute("content", descriptionval);
		document.querySelector('meta[property="og:site_name"]').setAttribute("content", titleval);
	}
    return RetVal;
}

async function SearchForRom(PhoneModel, Region, Vendor, TargetVersion) {
    var RetVal = [];

    if (PhoneModel.length < 2 && Region.length < 2 && Vendor.length < 2 && TargetVersion.length < 2) {
        for (var i = (FirmLen - 1), j = FirmLen - 30; i > j && i > -1; i--) {
            RetVal.push(taDataOkPLAZE[i]);
        }
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
                    break;
            }
        }
    }
    return RetVal;
}