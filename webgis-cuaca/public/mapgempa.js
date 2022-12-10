let mbAttr = 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
			'<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
			'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>';
let mbUrl = 'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw';
let apiUrl = 'https://data.bmkg.go.id/DataMKG/TEWS/gempaterkini.xml';
let light   = L.tileLayer(mbUrl, {id: 'mapbox/streets-v12', tileSize: 512, zoomOffset: -1, attribution: mbAttr});
let markersLayers = new L.LayerGroup();
let map = L.map('map',{layers:light}).setView([0, 118.9213], 5);

let baseLayers = {
	"Light": light,
};

getData();
async function getData(){
   let response = await fetch(apiUrl);
   let xmlString = await response.text();
   let parse = new DOMParser();
   let xmlData = parse.parseFromString(xmlString, 'text/xml');
   let gempaterkini = xmlData.querySelectorAll ('gempa');

   gempaterkini.forEach((gempa)=>{
      let coordinates = gempa.querySelector('coordinates').textContent.toString().split(',');
      var Lat = parseFloat(coordinates[0]);
      var Lng = parseFloat(coordinates[1]);
        
      let popUp ='<table width="250px">';
		let date= gempa.querySelector('Tanggal').textContent;
      let hours= gempa.querySelector('Jam').textContent;
      let mag = gempa.querySelector('Magnitude').textContent;
      let wil = gempa.querySelector('Wilayah').textContent;
      let poten = gempa.querySelector('Potensi').textContent; 
        
      popUp += '<tr>'+
                  '<td><strong>Tanggal: '+date+
               '</tr>'+
               '<tr>'+
                  '<td>Kekuatan: '+mag+" SR"+
               '</tr>'+
               '<tr>'+
                  '<td>Pukul: '+hours+
               '</tr>'+
               '<tr>'+
                  '<td>Wilayah: '+wil+
               '</tr>'+
               '<tr>'+
                  '<td><strong>'+poten+
               '</tr>'  

	   popUp +='</table>';
        
      let marker = L.marker([Lat,Lng],{
         icon: L.icon({
            iconUrl: 'assets/images/icons/loc.png',
            iconSize: [35, 40],
            iconAnchor: [25, 25]	
		   })
      }).bindPopup(popUp);
		marker.addTo(markersLayers);
		markersLayers.addTo(map);
      })
    
}

