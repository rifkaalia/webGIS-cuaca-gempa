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
let utc = 7;
let date = new moment();
let tanggal =  document.querySelector('.tanggal');
let selectTanggal = document.querySelector('[name=select-tanggal]');
let nextDate;
let createSelect = false;
let selectOption = [];
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


selectTanggal.addEventListener('change',()=>{
	console.log(selectTanggal.value);
	getData(selectTanggal.value);
});

getData(date);
async function getData(dateTime){
	markersLayers.clearLayers();
	dateTime = moment(dateTime).subtract(utc,'h'); 
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
		//let temp = area.querySelector('parameter[id="t"] timerange');
		let getTime = false;
		let posPrakiraan;
		// console.log(weathers);
		let popUp ='<table width="190px">';
		weathers.forEach((weather,i)=>{
			let getDateTime = weather.getAttribute('datetime');
			let prakiraan = weathers[i].querySelector('value').textContent;

			if(!selectOption.includes(getDateTime.substring(0,8))){
				selectOption.push(getDateTime.substring(0,8));
			}

			if(getDateTime.substring(0,8) == dateTime.format('YYYYMMDD')){
				popUp += '<tr>'+
							'<td>'+convertTime(getDateTime.substring(8))+
							'<td>:</td>'+
							'<td><img style="width:40px;float:left" src="'+'assets/images/icons/'+kodeCuaca[prakiraan][1]+'"> '+
							'<span style="position:relative;top:10px">'+kodeCuaca[prakiraan][0]+'</span></td>'+
							'</tr>';
			}

			if(getDateTime.substring(0,10)>=dateTime.format('YYYYMMDDHH') && getTime==false){
				posPrakiraan=i;
				nextDate=getDateTime;
				getTime=true;
			}
			//console.log(getDateTime);
		});

		popUp +='</table>';

		let prakiraan = weathers[posPrakiraan].querySelector('value').textContent;
		let iconUrl = 'assets/images/icons/'+kodeCuaca[prakiraan][1];
		let deskripsi = kodeCuaca[prakiraan][0];


		let marker = L.marker([lat,lng],{
			icon: L.icon({
		    iconUrl: iconUrl,
		    iconSize: [50, 50],
		    iconAnchor: [25, 25]
		})
		}).bindPopup('<strong>Kota '+prov+'</strong><br>'+parseDate(nextDate)+'<br>Keterangan : '+deskripsi+popUp);
		marker.addTo(markersLayers);
		markersLayers.addTo(map);
		tanggal.textContent = parseDate(nextDate);
		// console.log(area);
	});

	if(createSelect==false){
		selectOption.forEach((getDate)=>{
			console.log(getDate);
			let option = moment(getDate).format('D MMMM YYYY');
			let value = moment(getDate).format('YYYYMMDD');
			if(value==moment(date).format('YYYYMMDD')){
				value = moment(date).format('YYYY-MM-DD HH');
			}
			else{
				value = moment(getDate).format('YYYY-MM-DD')+' 0'+utc;
			}
			let newOption = new Option(option, value);
			selectTanggal.add(newOption);

		});
		selectTanggal.value = moment(date).format('YYYY-MM-DD HH');
		createSelect=true;
	}

}

function convertTime(time){
	//console.log(time);
	if(time=='0000'){
		return 'Pagi';
	}
	else if(time=='0600'){
		return 'Siang';
	}
	else if(time=='1200'){
		return 'Malam';
	}
	else if(time=='1800'){
		return 'Dini Hari';
	}
	else{
		return 'Error';
	}

}

function parseDate(date){
	let tahun = date.substr(0,4);
	let bulan = date.substr(4,2);
	let tanggal = date.substr(6,2);
	let jam = date.substr(8,2);
	let menit = date.substr(10,2);
	let setTanggal = tahun+'-'+bulan+'-'+tanggal+' '+jam+':'+menit+':00';
	return moment(setTanggal).add(utc,'h').format('DD MMMM YYYY HH:mm')+' WIB';

}