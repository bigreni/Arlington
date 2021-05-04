function loadFavorites()
{
    var favStop = localStorage.getItem("Favorites");
    var arrFaves = favStop.split("|");
    var arrStops = null;
    var arrIds;
    var text = "";
    for (i = 0; i < arrFaves.length; i++) 
    {
        arrStops = arrFaves[i].split(":");
        arrIds = arrStops[0].split(">");
        text = '<li><button onclick=removeFavorite(' + i + '); style="background-color:red; border:none;float:right;">&#x2718;</button><a href="javascript:loadArrivals(' + arrIds[0] + ',' + arrIds[1] +')"; class="langOption"><h4 class="selectLanguage">' + arrStops[1] + '</h4></a></li>';
	    $("#lstFaves").append(text);
    }
}

function removeFavorite(index)
{
    var favStop = localStorage.getItem("Favorites");
    var arrFaves = favStop.split("|");
    if(arrFaves.length > 1)
    {
        arrFaves.splice(index, 1);
        var faves = arrFaves.join("|");
        localStorage.setItem("Favorites", faves);
    }
    else
    {
        localStorage.removeItem("Favorites");
    }
    location.reload();
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

function loadArrivals(iCodeID,routeStop) {
  
   var myDate = new Date();
   var myDateString = myDate.getMilliseconds();
   
   if(routeStop!=='')
   {
	   var myXmlHttp = CreateXmlHttp();
	   myXmlHttp.onreadystatechange = function() {
		  if(myXmlHttp.readyState == 4) {
				var elemResultHolder = document.getElementById('realTimeResultsContainer');
				elemResultHolder.style.display = "block";
			 eval(myXmlHttp.responseText);
		  }
	   }
	   myXmlHttp.open("GET", "https://www.commuterpage.com/shared/services/get_realtime.cfc?&method=routeinfo" + "&codeid=" + iCodeID + "&stop=" + routeStop + "&ds=" + myDateString);
	   myXmlHttp.send(null);
   }
}

function updatePermaLink(arg){
}
