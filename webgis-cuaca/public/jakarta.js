let apiUrl = 'https://data.bmkg.go.id/DataMKG/MEWS/DigitalForecast/DigitalForecast-Indonesia.xml';

//let utc = 7;
let date = new Date();
let dateTime = date.getFullYear()+''+
                (date.getMonth()+1).toString().padStart(2,'0')+''+
                (date.getDate()).toString().padStart(2,'0')+''+
                (date.getHours()-7)+'00';
//console.log(dateTime)
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
	let areas = xmlData.querySelectorAll('area[id="501195"]');
	//console.log(areas);
	
	areas.forEach((area)=>{
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
		console.log (prakiraan);
	})

	areas.forEach((area)=>{
		let temps = area.querySelectorAll('parameter[id="t"] timerange');
		let getTime = false;
		let posSuhu;

		temps.forEach((t,i)=>{
            let getDateTime = t.getAttribute('datetime');
            if(getDateTime>=dateTime && getTime==false){
                posSuhu=i;
                getTime=true;
            }
            //console.log(getDateTime)
        });
		
		let suhu = temps[posSuhu].querySelector('value[unit="C"]').textContent;
		console.log (suhu);
	})
}