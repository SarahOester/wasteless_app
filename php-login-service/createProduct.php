<?php
    // Start sessions
    session_start();
    include("src/mysql.php");

    header('Content-Type: application/json; charset=utf-8');

    // +----------------------------------------------------+
    // |         Get form data to php and database          |
    // +----------------------------------------------------+

    $con = new mysqli($server, $username, $password, $database);
    if($con) {
//        echo "Håber det her virker";
        // Tjekker om serveren er connecet for at se om der kommer nogle errors

        // Samler form dataen i variables
        if ($_GET['action'] == "create") {
            $userObject = json_decode(file_get_contents('php://input'));
            $avatarImg = $userObject->avatarImg;
            $title = $userObject->title;
            $businessName = $userObject->businessName;
            $category = $userObject->category;
            $productDes = $userObject->productDes;
            $price = $userObject->price;
            $pickupDate = $userObject->pickupDate;
            $pickupTime = $userObject->pickupTime;

                $sql = "CALL CreateProduct ('$avatarImg','$title','$businessName','$category','$productDes','$price','$pickupDate','$pickupTime')";
                if ($mySQL->query($sql) === TRUE) {
                    $response['success'] = TRUE;
                    echo json_encode($response);
                } else {
                    $response['success'] = FALSE;
                    $response['error'] = "Create product failed. Please try again.";
                    echo json_encode($response);
                }
        }

        if ($_GET['action'] == "read") {
            $sql = "SELECT title, businessName, price, pickupDate, pickupTime FROM products WHERE businessName = 'Brødhus' ORDER BY id DESC";
            $result = $mySQL->query($sql);
            if ($result == true) {
                $resultsArray = [];
                while($row = $result->fetch_object()) {
                    $resultsArray[] = $row;
                }
                $response['status'] = TRUE;
                $response['data'] = $resultsArray;
                echo json_encode($response);
            } else {
                $response['status'] = FALSE;
                $response['error'] = "Read failed.";
                echo json_encode($response);
            }
        }
    }
?>