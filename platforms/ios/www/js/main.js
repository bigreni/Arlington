    function onLoad() {
        if ((/(ipad|iphone|ipod|android|windows phone)/i.test(navigator.userAgent))) {
            document.addEventListener('deviceready', checkFirstUse, false);
        } else {
            notFirstUse();
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
        document.addEventListener('onAdLoaded', function (data) {
            document.getElementById("screen").style.display = 'none';
        });
        document.addEventListener('onAdPresent', function (data) { });
        document.addEventListener('onAdLeaveApp', function (data) { 
            document.getElementById("screen").style.display = 'none';
        });
        document.addEventListener('onAdDismiss', function (data) { 
            document.getElementById("screen").style.display = 'none';    
        });
    }

    function createSelectedBanner() {
          AdMob.createBanner({adId:admobid.banner});
    }

    function loadInterstitial() {
        if ((/(android|windows phone)/i.test(navigator.userAgent))) {
            AdMob.prepareInterstitial({ adId: admobid.interstitial, isTesting: false, autoShow: false });
            //document.getElementById("screen").style.display = 'none';     
        } else if ((/(ipad|iphone|ipod)/i.test(navigator.userAgent))) {
            AdMob.prepareInterstitial({ adId: admobid.interstitial, isTesting: false, autoShow: false });
            //document.getElementById("screen").style.display = 'none';     
        } else
        {
            document.getElementById("screen").style.display = 'none';     
        }
    }

   function checkFirstUse()
    {
        $("span").remove();
        $(".dropList").select2();
        initApp();
        checkPermissions();
        askRating();
        //document.getElementById("screen").style.display = 'none';
    }

   function notFirstUse()
    {
        $("span").remove();
        $(".dropList").select2();
        document.getElementById("screen").style.display = 'none';
    }

    function checkPermissions(){
        const idfaPlugin = cordova.plugins.idfa;
    
        idfaPlugin.getInfo()
            .then(info => {
                if (!info.trackingLimited) {
                    return info.idfa || info.aaid;
                } else if (info.trackingPermission === idfaPlugin.TRACKING_PERMISSION_NOT_DETERMINED) {
                    return idfaPlugin.requestPermission().then(result => {
                        if (result === idfaPlugin.TRACKING_PERMISSION_AUTHORIZED) {
                            return idfaPlugin.getInfo().then(info => {
                                return info.idfa || info.aaid;
                            });
                        }
                    });
                }
            });
    }    

function askRating()
{
cordova.plugins.AppRate.setPreferences = {
    reviewType: {
        ios: 'AppStoreReview',
        android: 'InAppBrowser'
        },
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

function showAd()
{
    document.getElementById("screen").style.display = 'block';     
    if ((/(ipad|iphone|ipod|android|windows phone)/i.test(navigator.userAgent))) {
        AdMob.isInterstitialReady(function(isready){
            if(isready) 
                AdMob.showInterstitial();
        });
    }
    document.getElementById("screen").style.display = 'none'; 
}

function loadFaves()
{
    showAd();
    window.location = "Favorites.html";
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
        myXmlHttp.open("GET", "https://webservices.commuterpage.com/rest/realtime/" + method + "/" + iCodeID + "/" + getTimestamp());
        myXmlHttp.send(null);
        $("#stopSelect").val('0');
        $("span").remove();
        $(".dropList").select2();
   }

   function getTimestamp() {
	var now = new Date();
	var utcSecondsSinceEpoch = Math.round(now.getTime() / 1000);
	return utcSecondsSinceEpoch;
}  

function LoadRouteDetails(method) {
  
   showAd(); 
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

function saveFavorites()
{
    var favStop = localStorage.getItem("Favorites");
    var newFave = $('#route option:selected').val() + ">" + $("#stopSelect option:selected").val() + ":" + $('#route option:selected').text() + " > " + $("#stopSelect option:selected").text();
        if (favStop == null)
        {
            favStop = newFave;
        }   
        else if(favStop.indexOf(newFave) == -1)
        {
            favStop = favStop + "|" + newFave;               
        }
        else
        {
            $("#message").text('Stop is already favorited!!');
            return;
        }
        localStorage.setItem("Favorites", favStop);
        $("#message").text('Stop added to favorites!!');
}
