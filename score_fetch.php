<?php
if (session_status() == PHP_SESSION_NONE) { // varmistetaan session jatkuminen
    session_start();
}
require_once('connect.php');
require_once("pdo_trycatch.php"); // varmistetaan PDO:n toiminta
function getTopScoresFromDatabase($pdo, $limit = 5) {
    $stmt = $pdo->prepare("SELECT username, score FROM players ORDER BY score DESC LIMIT :limit");
    $stmt->bindParam(':limit', $limit, PDO::PARAM_INT);
    $stmt->execute();
    return $stmt->fetchAll(PDO::FETCH_ASSOC);
}
$data = getTopScoresFromDatabase($pdo);
$currentUserName = isset($_SESSION['psyko']) ? $_SESSION['psyko'] : null;
$currentUser = ['name' => $currentUserName];

$response = [
    'data' => $data,
    'currentUser' => $currentUser
];

echo json_encode($response);
?>