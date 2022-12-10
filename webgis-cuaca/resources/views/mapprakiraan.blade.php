<!DOCTYPE html>
<html>
<head>
	<title>Prakiraan Cuaca di Indonesia</title>
	
	<link rel="stylesheet" href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css"
	   integrity="sha512-xodZBNTC5n17Xt2atTPuE1HxjVMSvLVW9ocqUKLsCC5CXdbqCmblAshOMAS6/keqq/sMZMZ19scR4PsZChSR7A=="
	   crossorigin=""/>
		<link rel="preconnect" href="https://fonts.googleapis.com">
		<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
		<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300&display=swap" rel="stylesheet">
	   
	  	<style type="text/css">
	  	body{
	  		padding: 0;
	  		margin: 0;
	  		font-family: 'Poppins', sans-serif;
	  	}
	  	#map{
	  		height: 100vh;
	  		width: 100%
	  	}
	  	header{
	  		position: absolute;
	  		top:10px;
	  		left:60px;
	  		z-index: 1000;
	  		background: #fffd;
	  		padding: 10px 20px;
	  		width: calc( 100% - 180px)
	  	}
	  	header h3{
	  		padding: 0;
	  		margin: 0 0  5px;
	  		font-size: 22px
	  	}
	  	header p{
	  		padding: 0;
	  		margin: 0;
	  		font-size: 14px;
	  	}
	  	header .select{
	  		position: absolute;
	  		right: 20px;
	  		top: 1rem
	  	}
	  	header .select>select{
	  		font-size: 1rem;
	  		padding: .5rem;
	  		border:1px solid #ddd !important;
	  	}
	  	</style>
</head>
<body>
	<header>
		<div class="title">
			<h3>Prakiraan Cuaca di Indonesia</h3>
			<p>Tanggal : <span class="tanggal"></span></p>
		</div>
		<div class="select">
			<select name="select-tanggal"></select>
		</div>
	</header>
	<div id="map"></div>

</body>
<script src="https://unpkg.com/leaflet@1.7.1/dist/leaflet.js"
   integrity="sha512-XQoYMqMTK8LvdxXYG3nZ448hOEQiglfqkJs1NOQV44cWnUrBc8PkAOcXy20w0vlaXaVUearIOBhiXZ5V3ynxwA=="
   crossorigin=""></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/axios/0.26.0/axios.min.js" integrity="sha512-bPh3uwgU5qEMipS/VOmRqynnMXGGSRv+72H/N260MQeXZIK4PG48401Bsby9Nq5P5fz7hy5UGNmC/W1Z51h2GQ==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.29.4/moment.min.js"></script>
<script type="text/javascript" src="mapprakiraan.js"></script>

</script>
</html>
