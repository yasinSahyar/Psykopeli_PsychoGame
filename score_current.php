<?php
if (session_status() == PHP_SESSION_NONE) { // varmistetaan session jatkuminen
    session_start();
}
require_once('connect.php');
require_once("pdo_trycatch.php"); // varmistetaan PDO:n toiminta
$query = $pdo->prepare("SELECT * FROM players ORDER BY score DESC");
$query->execute();
$allScores = $query->fetchAll(PDO::FETCH_ASSOC);

// Find the rank of the current user in the fetched data
$currentRank = 0;
foreach ($allScores as $score) {
    $currentRank++;
    if ($score['username'] == $_SESSION['psyko']) {
        break;
    }
}

// Return the entire dataset and the current user's rank in JSON format
$result = array(
    "data" => $allScores,
    "currentUser" => array(
        "name" => $_SESSION['psyko'],
        "rank" => $currentRank
    )
);

echo json_encode($result);