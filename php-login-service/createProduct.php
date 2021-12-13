<?php
    var_dump($_POST);
    // ['title']
    exit;

    // Start sessions
    session_start();

    include("mysql.php");

    // +----------------------------------------------------+
    // |         Get form data to php and database          |
    // +----------------------------------------------------+

  /*  if (isset($_GET['action'])) {
    $action = $_GET['action'];

        // CREATE PRODUTCS
        if ($action == "signup") {
            $loginObject = json_decode(file_get_contents('php://input'));
            $avatarImg = $loginObject->avatarImg;
            $title = $loginObject->title;
            $businessName = $loginObject->businessName;
            $category = $loginObject->category;
            $productDes = $loginObject->productDes;
            $price = $loginObject->price;
            $pickupDate = $loginObject->pickupDate;
            $pickupTime = $loginObject->pickupTime;

            //Put into database
            $sql = "CALL CreateProduct('$avatarImg', '$title', '$businessName', '$category', '$productDes', '$price', '$pickupDate', '$pickupTime')";
                        if ($mySQL->query($sql) === TRUE) {
                            $response['newProductCreated'] = TRUE;
                            echo json_encode($response);
                        } else {
                            $response['newProductCreated'] = FALSE;
                            $response['error'] = "Was not able to create a new product.";
                            echo json_encode($response);
                        }
            }
    }

*/

    $con = new mysqli($server,$username,$password,$database);
    if(!$con) {
        echo "Håber det her virker";
        // tjekker om serveren er connecet for at se om der kommer nogle errors
    }
    
    $businessName = $_POST['businessName'];
    $title = $_POST['title'];
    //samler form dataen i variables
    //Her indsætter vi det til vores table
    $qry = "INSERT INTO `products`(`businessName`,`title`) VALUES ('$businessName','$title')";
    
    $insert = mysqli_query($con,$qry);
    if(!$insert) {
    echo "der er et problem med at indsætte data";
    }
    else {
        echo "Data fungere";
    }

   
    // $mysql = new MySQL();
    // $mysql->Connect();

    

    // if (!empty($avatarImg) && !empty($title) && !empty($businessName) && !empty($category) && !empty($productDes) && !empty($price) && !empty($pickupDate) && !empty($pickupTime)) {
            
    //     }

    // $sql = "Call CreateProduct('avatarimgVar', 'Brød2', 'Brødhus2', 'Brød kate', 'kdsjfsjdhks', 12, '2021-12-01', '12:12:12')";
    // $mySQL->query($sql);
    



    // // Get access to the FileUpload Class
    // require "src/fileUpload.php";

    // if(isset($_POST['action'])) {
    //     // If the 'upload' action is called, then do this
    //     if($_POST['action'] == "upload") {
    //         // Creates a new instance of the FileUpload class
    //         $newUpload = new FileUpload($_FILES['fileToUpload']);

    //         // Check if file type is an accepted image file format
    //         $acceptedFileTypes = ['png', 'jpg', 'jpeg', 'gif', 'bmp'];
    //         if(in_array($newUpload->GetFileType(), $acceptedFileTypes)) {

    //             // Renaming the file before uploading
    //             $newUpload->RenameFile(date('Ymd_His'));

    //             // Uploads the original file, and saves the JSON response in a session 
    //             $_SESSION['json'] = $newUpload->UploadFile("files/original");
    //         } else {
    //             $data['status'] = "failed";
    //             $data['error'] = "Wrong file type";
    //             $_SESSION['json'] = json_encode($data);
    //         }

    //         // Redirect back to the index.php page
    //         header("location: index.php");
    //     }
    // }


?>