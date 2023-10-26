<?php
require_once("connect.php");
try {
    $pdo = new PDO('mysql:host=localhost;dbname=psykopeli_playerbase;charset=utf8mb4', 'root', '');
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch(PDOException $e) {
    echo 'Error connecting to database: ' . $e->getMessage();
}

// Check if the connection was successful
if (!$pdo) {
    die('Error: Could not connect to the database');
}
?>