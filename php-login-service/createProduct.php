<?php

session_start();

include("mysql.php");

// +----------------------------------------------------+
// |         Get form data to php and database          |
// +----------------------------------------------------+

    $mysql = new MySQL();
    $mysql->Connect();

    // $sqlCreateTable = file_get_contents("wasteless_test.sql");
    // $sql = "SELECT * FROM products";
    // $productresult = $mySQL->query($sql);


    $id = $products[$i]['Id'];
    $avatarImg = $products[$i]['avatarImg'];
    $title = $products[$i]['title'];
    $businessName = $products[$i]['businessName'];
    $category = $products[$i]['category'];
    $productDes = $products[$i]['productDes'];
    $price = $products[$i]['price'];
    $pickupDate = $products[$i]['pickupDate'];
    $pickupTime = $products[$i]['pickupTime'];

    $sql = "INSERT INTO products (id, avatarImg, title, businessName, category, productDes, price, pickupDate, pickupTime) 
        VALUES ('$id','$avatarImg','$title','$businessName','$category','$productDes','$price','$pickupDate','$pickupTime')";

    // $sql = "CALL CreateProduct('$avatarImg', '$title', '$businessName', '$category', '$productDes', '$price', '$pickupDate', '$pickupTime')";
    var_dump($sql);

    // $database = json_decode(file_get_contents("json/Food Database.json"), true);
    // $json = json_decode(file_get_contents("fileName.json"), true);
    // $products = $database['data'];

    // for($i = 1; $i < count($products); $i++) {
    //     $id = $products[$i]['Id'];
    //     $avatarImg = $products[$i]['avatarImg'];
    //     $title = $products[$i]['title'];
    //     $businessName= $products[$i]['busine$businessName'];
    //     $category = $products[$i]['category'];
    //     $productDes = $products[$i]['productDes'];
    //     $price = $products[$i]['price'];
    //     $pickupDate = $products[$i]['pickupDate'];
    //     $PickupTime = $products[$i]['PickupTime'];

    //     $sql = "INSERT INTO products (id, avatarImg, title, businessName, category, productDes, price, pickupDate, pickupTime) 
    //     VALUES ('$id','$avatarImg','$title','$businessName','$category','$productDes','$price','$pickupDate','$pickupTime')";
    //     echo $mysql->mySQL->query($sql);
    // }


?>