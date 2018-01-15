    function onLoad() {
        if ((/(ipad|iphone|ipod|android|windows phone)/i.test(navigator.userAgent))) {
            document.addEventListener('deviceready', checkFirstUse, false);
        } else {
            checkFirstUse();
        }
    }

  var admobid = {};
  if( /(android)/i.test(navigator.userAgent) ) { // for android & amazon-fireos
    admobid = {
      banner: 'ca-app-pub-1683858134373419/7790106682', // or DFP format "/6253334/dfp_example_ad"
      interstitial: 'ca-app-pub-9249695405712287/7962159153'
    };
  } else if(/(ipod|iphone|ipad)/i.test(navigator.userAgent)) { // for ios
    admobid = {
      banner: 'ca-app-pub-1683858134373419/7790106682', // or DFP format "/6253334/dfp_example_ad"
      interstitial: 'ca-app-pub-9249695405712287/5787311558'
    };
  }

    function initApp() {
        if (!AdMob) { alert('admob plugin not ready'); return; }
        initAd();
        //display interstitial at startup
        loadInterstitial();
    }
    function initAd() {
        var defaultOptions = {
            position: AdMob.AD_POSITION.BOTTOM_CENTER,
            bgColor: 'black', // color name, or '#RRGGBB'
            isTesting: false // set to true, to receiving test ad for testing purpose
        };
        AdMob.setOptions(defaultOptions);
        registerAdEvents();
    }
    // optional, in case respond to events or handle error
    function registerAdEvents() {
        // new events, with variable to differentiate: adNetwork, adType, adEvent
        document.addEventListener('onAdFailLoad', function (data) {
            document.getElementById("screen").style.display = 'none';
        });
        document.addEventListener('onAdLoaded', function (data) { });
        document.addEventListener('onAdPresent', function (data) { });
        document.addEventListener('onAdLeaveApp', function (data) { });
        document.addEventListener('onAdDismiss', function (data) { 
            document.getElementById("screen").style.display = 'none';    
        });
    }

    function createSelectedBanner() {
          AdMob.createBanner({adId:admobid.banner});
    }

    function loadInterstitial() {
        AdMob.prepareInterstitial({ adId: admobid.interstitial, isTesting: true, autoShow: true });
    }

   function checkFirstUse()
    {
        $('#simplemenu').sidr();
        $("span").remove();
        $(".dropList").select2();
        window.ga.startTrackerWithId('UA-88579601-3', 1, function(msg) {
            window.ga.trackView('Home');
        });    
        initApp();
        askRating();
        //document.getElementById("screen").style.display = 'none';
    }

function askRating()
{
  AppRate.preferences = {
  openStoreInApp: true,
  useLanguage:  'en',
  usesUntilPrompt: 10,
  promptAgainForEachNewVersion: true,
  storeAppURL: {
                ios: '1296110225',
                android: 'market://details?id=com.arlington.free'
               }
};
 
AppRate.promptForRating(false);
}

var autoRefreshState = 0;

function CreateXmlHttp() {
   var xmlHttp;
   if (window.XMLHttpRequest) {
      xmlHttp = new XMLHttpRequest();
      }
   else if (window.ActiveXObject) {
      xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
      }
   else {
      alert("Your browser does not support AJAX!");
      xmlHttp = null;
      return false;
      }
   return(xmlHttp);
   }

function LoadRouteInfo(iCodeID,method) {
        document.getElementById('btnSave').style.visibility = "hidden";
        document.getElementById('realTimeResultsContainer').style.display = "none";
        var stopDropdownList = document.getElementById('stopSelect');
        $("#message").text('');
        var myXmlHttp = CreateXmlHttp();
        myXmlHttp.onreadystatechange = function () {
            if (myXmlHttp.readyState == 4) {
                eval(myXmlHttp.responseText);

                try {

                    if (stopDropdownList) {
                        stopDropdownList.removeAttribute('disabled');
                    }   
                } catch (error) {

                    // log error
                }
            }
        }
        myXmlHttp.open("GET", "https://www.commuterpage.com/shared/services/get_realtime.cfc?&method=" + method + "&codeid=" + iCodeID);
        myXmlHttp.send(null);
        $("#stopSelect").val('0');
        $("span").remove();
        $(".dropList").select2();
   }


function LoadRouteDetails(method) {
  
   var routeStop;
   var iCodeID;
   var myDate = new Date();
   var myDateString = myDate.getMilliseconds();
   
    routeStop = document.getElementById('stopSelect').value;
	iCodeID = document.getElementById('route').value;
   
   if(routeStop!=0)
   {
	   var myXmlHttp = CreateXmlHttp();
	   myXmlHttp.onreadystatechange = function() {
		  if(myXmlHttp.readyState == 4) {
				var elemResultHolder = document.getElementById('realTimeResultsContainer');
				elemResultHolder.style.display = "block";
			 eval(myXmlHttp.responseText);
		  }
	   }
	   myXmlHttp.open("GET", "https://www.commuterpage.com/shared/services/get_realtime.cfc?&method=" + method + "&codeid=" + iCodeID + "&stop=" + routeStop + "&ds=" + myDateString);
	   myXmlHttp.send(null);
	   document.getElementById('btnSave').style.visibility = "visible";
       $("#message").text('');
   }
   else
   {
       $("#message").text('');
	   document.getElementById('btnSave').style.visibility = "hidden";
       document.getElementById('realTimeResultsContainer').style.display = "none";
   }
}

function updatePermaLink(arg){
}
