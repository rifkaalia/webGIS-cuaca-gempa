let mbAttr = 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
			'<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
			'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>';
let mbUrl = 'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw';
let apiUrl = 'https://data.bmkg.go.id/DataMKG/MEWS/DigitalForecast/DigitalForecast-Indonesia.xml';
let light   = L.tileLayer(mbUrl, {id: 'mapbox/light-v9', tileSize: 512, zoomOffset: -1, attribution: mbAttr});
let markersLayers = new L.LayerGroup();
let map = L.map('map',{layers:light}).setView([0, 118.9213], 5);

let baseLayers = {
	"Light": light,
};
//let utc = 7;
let date = new Date();
let dateTime = date.getFullYear()+''+
                (date.getMonth()+1).toString().padStart(2,'0')+''+
                (date.getDate()).toString().padStart(2,'0')+''+
                (date.getHours()-7)+'00';
console.log(dateTime)
let kodeCuaca = {
	'0':['Cerah','cerah.png'],
	'1':['Cerah Berawan ','cerahberawan.png'],
	'2':['Cerah Berawan ','cerahberawan.png'],
	'3':['Berawan ','berawan.png'],
	'4':['Berawan Tebal','awantebal.png'],
	'5':['Udara Kabur','udarakabur.png'],
	'10':['Asap','asap.png'],
	'45':['Kabut','kabut.png'],
	'60':['Hujan Ringan','hujanringan.png'],
	'61':['Hujan Sedang','hujan.png'],
	'63':['Hujan Lebat','hujanlebat.png'],
	'80':['Hujan Lokal','hujanlokal.png'],
	'95':['Hujan Petir','hujanpetir.png'],
	'97':['Hujan Petir','hujanpetir.png'],
};

getData();
async function getData(){
	
	let response = await fetch(apiUrl);
	let xmlString = await response.text();
	let parse = new DOMParser();
	let xmlData = parse.parseFromString(xmlString,'text/xml');
	let areas = xmlData.querySelectorAll('area');
	areas.forEach((area)=>{
		let lat = area.getAttribute('latitude');
		let lng = area.getAttribute('longitude');
		let prov = area.getAttribute('description');
		let weathers = area.querySelectorAll('parameter[id="weather"] timerange');
		
		let getTime = false;
		let posPrakiraan;
		//console.log(weathers);
        
        weathers.forEach((weather,i)=>{
            let getDateTime = weather.getAttribute('datetime');
            if(getDateTime>=dateTime && getTime==false){
                posPrakiraan=i;
                getTime=true;
            }
            //console.log(getDateTime)
        });
        
        let prakiraan = weathers[posPrakiraan].querySelector('value').textContent;
        let iconUrl = 'assets/images/icons/'+kodeCuaca[prakiraan][1];
        let deskripsi = kodeCuaca[prakiraan][0];  
		//console.log (prakiraan)
		let marker = L.marker([lat,lng],{
			icon: L.icon({
		    iconUrl: iconUrl,
		    iconSize: [50, 50],
		    iconAnchor: [25, 25]
		})
		}).bindPopup('<strong>Kota '+prov+'</strong><br>Keterangan : '+deskripsi);
		marker.addTo(markersLayers);
		markersLayers.addTo(map);
    })
}