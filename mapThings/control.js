var jsonData;
let numOfCar;
var truckShown = new Object()
var map;
var layers = longdo.Layers
var thisTruck;
var locWay;
var ready = false;
var speedAnimation
var search;
var suggest;

function init2() {
    // เซตแมพ
    map = new longdo.Map({
        placeholder : document.getElementById('mymap')
    });
    
    
//    $.getJSON('http://www.whateverorigin.org/get?url='+encodeURIComponent('http://usermap.longdo.com/montri/MM-WifiBox/data/2018-05-06.json')+'&callback=?', (res)=> {
//        jsonData = res.contents [0]
//        loadData()
//        
//    })
    ;   
    $.getJSON('http://usermap.longdo.com/montri/MM-Exercise/RealWorldExercise.php', (res) => {
        jsonData = res[0]
//        conso
        loadData()
    })
    
    //setUpRoute
    //set place holder route result
//    map.Route.placeholder(document.getElementById('result'));
//        map.Route.add(new longdo.Marker(
//          { lon: 100.538316, lat: 13.764953 },
//          { title: 'Victory monument', detail: 'I\'m here' }
//        ));
    //add all of mark point
    
    //เซตที่แปะ placehoder
    setUpSearch()
    
    setUpMapRoute()

}

function loadData() {
    for(index in jsonData) {
//        console.log(jsonData[index]);
        let truckObj = jsonData[index]
        let id = truckObj["imei"]
        let loc = {
            lon : truckObj.lon,
            lat : truckObj.lat
        }
        if (!(id in truckShown)) {
            truckShown[id] = {
                des : [truckObj],
                loc : [loc]
            }
//            console.log(truckShown)
    //        var ar = truckShown["tst"].split(" ")
    //        var date = ar[0]
    //        var [year, month, day] = date.split("-")
    //        var time = ar[1]
    //        var [hour,min,sec] = time.split(":")
        } else {
           truckShown[id].des.push(truckObj)
           truckShown[id].loc.push(loc)
//           truckShown[id].sort(compareTruck)
        }
    }
    addAllTruck()
}

function compareTruck(trA, trB) {
    let sts1 = trA.tst
    let sts2 = trB.tst
    if(sts1 < sts2) {
        return 1
    } else {
        return -1
    }
    
}
    
function addTruck(loc,id) {
    let marker = new longdo.Marker(loc, {
        title : `${id}`,
        icon : {
            url : 'https://map.longdo.com/mmmap/images/pin_mark.png', 
            offset : {x: 12, y: 45}
        }, 
        detail : "moving",
        weight: longdo.OverlayWeight.Top,
        clickable: true,
        draggable: false
    });

    map.Overlays.drop(marker)
    return marker
}

function addAllTruck() {
    for (index in truckShown) {
        locWay = truckShown[index].loc
        thisTruck = addTruck(locWay[0],index)
        ready = true
    }
//       console.log(marker.location())
//        map.Overlays.pathAnimation(marker, new longdo.Polyline([{ lon: 102, lat: 18 }, { lon: 98, lat: 17 }, { lon: 99, lat: 14 }]));
//       map.Overlays.pathAnimation(marker, new longdo.Polyline(locWay));
}

function moveTruck() {
    if(!ready) {
        alert('not ready to move')
        return;
    }

    if(thisTruck.location() !== locWay[0] && thisTruck.location() !== locWay.slice(-1)[0]) {
        alert('why u press butt');
        return;
    }
    if(thisTruck.location() === locWay.slice(-1)[0]) {
        alert('will start again');
        thisTruck.move(locWay[0], true);    
    }
    
    map.Overlays.pathAnimation(thisTruck, new longdo.Polyline(locWay));
}

function changeSpeed() {
    let speedBar = document.getElementById('speedAnimation');
    speedAnimation = speedBar.value/10;

}

function checkMarker(marker) {
    var index = markerArray.findIndex( (element)=> {
        return marker.location.lon === element.location.lon && marker.location.lat === element.location.lat
    })
}


function setUpMapRoute() {
//    map.Route.placeholder(document.getElementById('route'));
//		map.Route.add({lon: 100.65184, lat:13.79435});
//		map.Route.add({lon: 100.64266, lat:13.76717});
		
//		map.Route.search();
    // dynamic
//		map.Route.enableContextMenu();
//		map.Route.auto(true);
//		
//		map.Event.bind('beforeContextmenu', function(event) {
//			var element = document.createElement('div');
//			element.class = 'abc';
//			element.id = 'aaa';
//			element.innerHTML = 'clear search';
//			element.style.cursor = 'pointer';
//			element.onclick = function() {
//			map.Route.clear();
//				};
//			event.add(element);
//		});
//		map.Event.bind('beforeContextmenu', function(event) {
//			var element = document.createElement('div');
//			element.class = 'abc';
//			element.id = 'aaa';
//			element.innerHTML = 'Home &lt The Mall';
//			element.style.cursor = 'pointer';
//			element.onclick = function() {
//			homethemall();
//			};
//			event.add(element);
//		});
    
    
    // set mode
//     <button onclick="map.Route.mode(longdo.RouteMode.Cost);">ไปตามถนนหลัก</button>
//     <button onclick="map.Route.mode(longdo.RouteMode.Distance);">ไปทางลัด</button>

//    <button onclick="map.Route.label(longdo.RouteLabel.Time);">แสดงเวลา</button>          
//    <button onclick="map.Route.enableRoute(longdo.RouteType.Tollway, false);">ไม่ขึ้นทางด่วน</button>      
//    <button onclick="map.Route.enableRestrict(longdo.RouteRestrict.Bike, true);">มอเตอร์ไซค์</button>
//    <u>ข้อมูลเพิ่มเติม</u>: หากต้องการสั่งให้ทำงานต่อหลังจากที่คำนวณเส้นทางเสร็จแล้ว สามารถดัก event GuideComplete ได้ <a href="../advance/01-event.th.php">ดูตัวอย่างได้ที่นี่</a><br /><br />


}

