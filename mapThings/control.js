var jsonData;
let numOfCar;
var markerArray = []
var map;
var layers = longdo.Layers

function init2() {
    
    map = new longdo.Map({
        placeholder : document.getElementById('mymap')
    });
    
    $.getJSON('http://www.whateverorigin.org/get?url='+encodeURIComponent('http://usermap.longdo.com/montri/MM-WifiBox/data/2018-05-06.json')+'&callback=?', (res)=> {
        jsonData = res.contents [0]
        updateLoc(jsonData)
        
    });    
}

function updateLoc() {
    for(index in jsonData) {
//        console.log(jsonData[index]);
        let carObj = jsonData[index]
        addTruck({
            lon: carObj.lon,
            lat: carObj.lat
        })
    }
}
    
function addTruck(loc,id) {
    let marker = new longdo.Marker(loc, {
        title : `${id}`,
        icon : {
            url : 'https://map.longdo.com/mmmap/images/pin_mark.png', 
            offset : {x: 12, y: 45}
        }, 
        clickable: true,
        draggable: true
    });
    let marker2 = new longdo.Marker(loc, {
        title : "BCar",
        icon : {
            url : 'https://map.longdo.com/mmmap/images/pin_mark.png', 
            offset : {x: 12, y: 45}
        }, 
        clickable: true,
        draggable: true
    });
    map.Overlays.add(marker) 
    console.log(marker.location().longitude)
//    addMarker(marker)
//    checkMarker(marker)
}

function moveLoc(data) {
    jsonData = data
}

function addMarker(marker) {
    markerArray.push(marker)

}

function checkMarker(marker) {
    console.log(markerArray.findIndex( (element)=> {
        return marker === element
    }))
    
}

