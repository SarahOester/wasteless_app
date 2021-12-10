<?php
session_start();

include("mysql.php");

// Funktion til at uploade billeder

$file = $_FILES["fileToUpload"];
$targetFolder = "../profilepicture";
$fileType = strtolower(pathinfo($file["name"], PATHINFO_EXTENSION));
$fileName = basename($file["name"]);
$fileSize = $file["size"];
$avatarImg = $targetFolder . $_SESSION['username'] . $fileName;

if ($fileType == "jpeg" || $fileType == "jpg" || $fileType == "png"){
    if ($fileSize < 2000000){
        move_uploaded_file($file["tmp_name"], $avatarImg);
        echo "Your image has been succesfully uploaded.";

        $userId = $_SESSION['id'];
        $sql = "INSERT INTO userSettings (id, avatarImg) values ('$id', '$avatarImg')";
	    $result = $mySQL->query($sql);

        echo "<img src='$avatarImg'>";
    }
    else {
        echo "Sorry, your file is too large.";
    }
}
else{
    echo "Sorry, only JPG, JPEG & PNG files are allowed.";
}

?>