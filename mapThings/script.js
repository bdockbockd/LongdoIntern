var map;
var layers = longdo.Layers
function init() {
    map = new longdo.Map({
          placeholder: document.getElementById('map'),
		  zoom: 15,
		  lastView:false,
		   location:{lat:13.79435,lon:100.65184}
    });
//    map.Search.placeholder(document.getElementById('result'));

//    layerTrigg()
    
    // click overlay
//    map.Event.bind('overlayClick', function (markerSelect) {
//        map.Overlays.remove(markerSelect);
//    });
    
    // click map
//    map.Event.bind('click', function() {
//        addTruck();
//    })
//    map.Search.placeholder(document.getElementById("result"))
    
    
//    map.Route.placeholder(document.getElementById('result'));
//
//    // Static
//    map.Route.add(new longdo.Marker(
//      { lon: 100.538316, lat: 13.764953 },
//      { title: 'Victory monument', detail: 'I\'m here' }
//    ));
//    map.Route.add({ lon: 100, lat: 15 });
//    map.Route.search();
//
//    // Dynamic
//    map.Route.enableContextMenu();
//    map.Route.auto(true);
    
//    var data_file = "http://usermap.longdo.com/montri/MM-WifiBox/data/2018-05-06.json"
//    requestJson(data_file, updateLoc)
    
    
    //Jquery
//    var jqxhr = $.getJSON( "data.json", function() {
//      console.log( "success" );
//    })
//      .done(function() {
//        console.log( "second success" );
//      })
//      .fail(function() {
//        console.log( "error" );
//      })
//      .always(function() {
//        console.log( "complete" );
//      });
//
//    // Perform other work here ...

//    // Set another completion function for the request above
//    jqxhr.complete(function() {
//      console.log( "second complete" );
//    });    
    
//    $.get(data_file, function(data, status){
////        alert("Data: " + data + "\nStatus: " + status);
//        for (things in data[0]) {
//            for(thing in things) {
//                console.log(thing)
//            }
//        }
//    });
    
    
    //CORS
//    var request = createCORSRequest("get", data_file);
//    if (request){
//        request.onload = function(){
//            //do something with request.responseText
//            alert(request.responseText)
//        };
//    request.send();
//    }
    map.Route.placeholder(document.getElementById('route'));
    map.Route.add({lon: 100.65184, lat:13.79435});
    map.Route.add({lon: 100.64266, lat:13.76717});

    map.Route.search();
    map.Route.enableContextMenu();
    map.Route.auto(true);

    map.Event.bind('beforeContextmenu', function(event) {
        var element = document.createElement('div');
        element.class = 'abc';
        element.id = 'aaa';
        element.innerHTML = 'clear search';
        element.style.cursor = 'pointer';
        element.onclick = function() {
        map.Route.clear();
            };
        event.add(element);
    });
    map.Event.bind('beforeContextmenu', function(event) {
        var element = document.createElement('div');
        element.class = 'abc';
        element.id = 'aaa';
        element.innerHTML = 'Home &lt The Mall';
        element.style.cursor = 'pointer';
        element.onclick = function() {
        homethemall();
        };
        event.add(element);
    });
}

function homethemall(){
    map.Route.placeholder(document.getElementById('route'));
    map.Route.add({lon: 100.65184, lat:13.79435});
    map.Route.add({lon: 100.64266, lat:13.76717});

    map.Route.search();
    map.Route.enableContextMenu();
    map.Route.auto(true);
    }


function checkField(str){
    console.log(str)
    map.Layers.clear()
	switch(str){
		case 'Normal':
            map.Layers.add(layers.NOMRAL)
			break;
		case 'political':
            map.Layers.add(layers.POLITICAL)
            break;
		case 'google':
            map.Layers.add(layers.GOOGLE_ROADMAP)
			break;
		case 'gray':
            map.Layers.add(layers.GRAY)
			break;
		case 'hydro':                                  
            map.Layers.add(layers.HYDRO)
            break
		case 'google_satellite':
            map.Layers.add(layers.GOOGLE_SATELLITE)
            break
		case 'osm':
            map.Layers.add(layers.OSM)
            break
		default:
            map.Layers.add(layers.NOMRAL)
    }
}

function layerTrigg() {
    ["traffic","camera","event"].forEach((item)=>{
        let box = document.getElementById(item)    
        box.addEventListener('change', function(item) {
                            console.log(item)

            if(item==="traffic") {
                if(box.checked === true) {
                    map.Layers.add(layers.TRAFFIC)
                } else {
                    map.Layers.remove(layers.TRAFFIC)
                }
            } else if(item==="camera") {
                if(box.checked === true) {
                    map.Overlays.load(longdo.Overlays.cameras);
                } else {
                    map.Overlays.unload(longdo.Overlays.cameras)
                }
            } else {
                if(box.checked === true) {
                    map.Overlays.load(longdo.Overlays.events);
                } else {
                    map.Overlays.unload(longdo.Overlays.events);
                }
            }
            
        })
    });
}


function curloc() {
    let result = map.location()
    console.log(result)
    alert(`latitude : ${result.lat} , longtitude : ${result.lon} `)
}

function jumpto() {
    var latbox = document.getElementById('latitude')
    var lonbox = document.getElementById('longtitude')
    console.log(latbox.value)
    if(latbox && lonbox && parseFloat(latbox.value) && parseFloat(lonbox.value)) {
        try {
            map.location({
            lon: parseFloat(latbox.value),
            lat: parseFloat(lonbox.value)
        }, true)
        }catch(e){
            alert(e)
        }
        
    } else {
        alert('you need to fill both lat and lon value in proper way')
    }
}

function zoomtrig() {
    let zoombar = document.getElementById('zoomzoom')
    map.zoom(zoombar.value, true);
}

function requestJson(url, updateloc) {
    var http_request = new XMLHttpRequest();
    alert('start')
    http_request.onreadystatechange = function() {
        if(this.readyState === 4 && this.status === 200) {
            var jsonObj = JSON.parse(http_request.responseText);
            alert(jsonObj)
//            setInterval(updateLoc(), 2000 );
        } else {
            alert('fail some way')
        }
    }
    http_request.open("GET",url, true);
    http_request.send()
}

function createCORSRequest(method, url){
    var xhr = new XMLHttpRequest();
    if ("withCredentials" in xhr){
        xhr.open(method, url, true);
    } else if (typeof XDomainRequest != "undefined"){
        xhr = new XDomainRequest();
        xhr.open(method, url);
    } else {
        xhr = null;
    }
    return xhr;
}

function fetchData() {
//    let obj = JSON.parse(data)
    for(index in data) {
        //
        console.log(data[index]);
    }
}