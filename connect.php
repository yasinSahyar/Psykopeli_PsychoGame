<?php
		$servername = "localhost"; //portti tarkistettu 17.2.22 ja todettu toimivaksi
		$username = "root";  
		$password = "";
		$dbname = "psykopeli_playerbase";
		
		// luodaan yhteys
		$conn = new mysqli($servername, $username, $password, $dbname);
		// tarkistetaan yhteys
		if ($conn->connect_error) {
		die("Connection failed: " . $conn->connect_error);
		}
	?>