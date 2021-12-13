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
        // tjekker om serveren er connecet for at se om der kommer nogle errors
    }

    $avatarImg = $_POST['avatarImg'];
    $title = $_POST['title'];
    $businessName = $_POST['businessName'];
    $category = $_POST['category'];
    $productDes = $_POST['productDes'];
    $price = $_POST['price'];
    $pickupDate = $_POST['pickupDate'];
    $pickupTime = $_POST['pickupTime'];

    //samler form dataen i variables
    //Her indsætter vi det til vores table
    $qry = "Call CreateProduct(`avatarImg`,`title`,`businessName`,`category`,`productDes`,`price`,`pickupDate`,`pickupTime`,) VALUES ('$avatarImg','$title','$businessName','$category','$productDes','$price','$pickupDate','$pickupTime',)";

    
    $insert = mysqli_query($con,$qry);
    if(!$insert) {
    echo "der er et problem med at indsætte data";
    }
    else {
        echo "Data fungere";
    }

?>