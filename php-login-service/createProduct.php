<?php

    // Start sessions
    session_start();
    include("mysql.php");

    // +----------------------------------------------------+
    // |         Get form data to php and database          |
    // +----------------------------------------------------+


    $con = new mysqli($server, $username, $password, $database);
    if(!$con) {
        echo "Håber det her virker";
        //
        // tjekker om serveren er connecet for at se om der kommer nogle errors
    }

    $businessName = $_POST['businessName'];
    $title = $_POST['title'];
    //samler form dataen i variables
    //Her indsætter vi det til vores table
    $qry = "call CreateProduct (`businessName`,`title`) VALUES ('$businessName','$title')";

    //INSERT INTO `products`

    $insert = mysqli_query($con,$qry);
    if(!$insert) {
    echo "der er et problem med at indsætte data";
    }
    else {
        echo "Data fungere";
    }


?>