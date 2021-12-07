<?php
    $server = "127.0.0.1";
    $username = "root";
    $password = "abc123";
    $database = "wasteless_test";

    $mySQL = new mysqli($server, $username, $password, $database);

    if(!$mySQL){
        die("Could not connect to the server " . mysqli_connect_error());
    }
?>