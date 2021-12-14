<?php
    // Start sessions
    session_start();
    include("src/mysql.php");

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

        if ($action == "read") {
         $sql = "SELECT id FROM products WHERE businessName = '$businessName'";
                $result = $mySQL->query($sql);

            if ($mySQL->query($sql) === TRUE) {
                        $response['signupSuccess'] = TRUE;
                        echo json_encode($response);
                    } else {
                        $response['signupSuccess'] = FALSE;
                        $response['error'] = "Signup failed. Please try again.";
                        echo json_encode($response);
                    }
        }
    }
?>