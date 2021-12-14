<?php
$server = "127.0.0.1"; // Change to domain name, e.g. www.iloveunicorns.com
$username = "root"; // Change to the admins username of the server
$password = "abc123"; // Change to the admins password of the server
$database = "wasteless_test"; // Change to the name of the database you would like to connect to on the server

$mySQL = new mysqli($server, $username, $password, $database);

if (!$mySQL) {
    die("Could not connect to the MySQL server: " . mysqli_connect_error());
}

// $sql = "Call CreateProduct('avatarimgVar', 'Brød2', 'Brødhus2', 'Brød kate', 'kdsjfsjdhks', 12, '2021-12-01', '12:12:12')";
// $mySQL->query($sql);