<?php
$servername = "localhost";
$username = "root";
$password = ""; // no password by default
$dbname = "mathquest_db";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
?>
