/*!40101 SET NAMES utf8 */;
/*!40014 SET FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/ wasteless_test /*!40100 DEFAULT CHARACTER SET utf8mb4 */;
USE wasteless_test;

DROP TABLE IF EXISTS countries;
CREATE TABLE `countries` (
  `id` int NOT NULL AUTO_INCREMENT,
  `countryName` varchar(100) DEFAULT NULL,
  `countryPopulation` int DEFAULT NULL,
  `continent` varchar(50) DEFAULT NULL,
  `dateAdded` date DEFAULT NULL,
  `dateEdited` date DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `countryName` (`countryName`)
) ENGINE=InnoDB AUTO_INCREMENT=50 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS products;
CREATE TABLE `products` (
  `id` int NOT NULL AUTO_INCREMENT,
  `avatarImg` varchar(200) DEFAULT NULL,
  `title` varchar(100) DEFAULT NULL,
  `businessName` varchar(50) DEFAULT NULL,
  `category` varchar(30) DEFAULT NULL,
  `productDes` varchar(400) DEFAULT NULL,
  `price` int DEFAULT NULL,
  `pickupDate` date DEFAULT NULL,
  `pickupTime` time DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS userlogin;
CREATE TABLE `userlogin` (
  `id` int NOT NULL,
  `username` varchar(30) DEFAULT NULL,
  `pass` varchar(60) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

DROP TABLE IF EXISTS users;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT COMMENT 'primary key',
  `businessName` varchar(50) DEFAULT NULL,
  `adress` varchar(50) DEFAULT NULL,
  `zipcode` int DEFAULT NULL,
  `country` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=63 DEFAULT CHARSET=utf8mb3;

CREATE OR REPLACE VIEW `allproducts` AS select `products`.`id` AS `id`,`products`.`avatarImg` AS `avatarImg`,`products`.`title` AS `title`,`products`.`businessName` AS `businessName`,`products`.`category` AS `category`,`products`.`productDes` AS `productDes`,`products`.`price` AS `price`,`products`.`pickupDate` AS `pickupDate`,`products`.`pickupTime` AS `pickupTime` from `products`;

CREATE OR REPLACE VIEW `userlist` AS select `users`.`id` AS `userID`,`userlogin`.`username` AS `username`,`users`.`businessName` AS `businessName`,`users`.`adress` AS `adress`,`users`.`zipcode` AS `zipcode`,`countries`.`countryName` AS `countryName` from ((`users` join `countries` on((`users`.`country` = `countries`.`id`))) left join `userlogin` on((`users`.`id` = `userlogin`.`id`)));

INSERT INTO countries(id,countryName,countryPopulation,continent,dateAdded,dateEdited) VALUES(1,'Denmark',5806000,'Europe','2021-09-10','2021-09-10'),(2,'Sweden',10230000,'Europe','2021-09-10','2021-09-10'),(3,'Finland',5518000,'Europe','2021-09-10','2021-09-10'),(4,'Norway',5328000,'Europe','2021-09-10','2021-09-10'),(5,'Poland',37970000,'Europe','2021-09-10','2021-09-10'),(6,'Ukraine',44390000,'Europe','2021-09-10','2021-09-10'),(7,'Germany',83020000,'Europe','2021-09-10','2021-09-10'),(8,'France',67060000,'Europe','2021-09-10','2021-09-10'),(9,'Italy',60360000,'Europe','2021-09-10','2021-09-10'),(10,'Spain',46940000,'Europe','2021-09-10','2021-09-10'),(11,'Portugal',10280000,'Europe','2021-09-10','2021-09-10'),(12,'Netherlands',17280000,'Europe','2021-09-10','2021-09-10'),(13,'Switzerland',8545000,'Europe','2021-09-10','2021-09-10'),(14,'Austria',8859000,'Europe','2021-09-10','2021-09-10'),(15,'Slovenia',2081000,'Europe','2021-09-10','2021-09-10'),(16,'Slovakia',5450000,'Europe','2021-09-10','2021-09-10'),(17,'Czech Republic',10650000,'Europe','2021-09-10','2021-09-10'),(18,'Estonia',1325000,'Europe','2021-09-10','2021-09-10'),(19,'Latvia',1920000,'Europe','2021-09-10','2021-09-10'),(20,'Lithuania',2794000,'Europe','2021-09-10','2021-09-10'),(21,'Belarus',9467000,'Europe','2021-09-10','2021-09-10'),(22,'Russia',144400000,'Europe','2021-09-10','2021-09-10'),(23,'United Kingdom',67886000,'Europe','2021-09-10','2021-09-10'),(24,'Romania',19237000,'Europe','2021-09-10','2021-09-10'),(25,'Belgium',11589000,'Europe','2021-09-10','2021-09-10'),(26,'Greece',10423000,'Europe','2021-09-10','2021-09-10'),(27,'Hungary',9660000,'Europe','2021-09-10','2021-09-10'),(28,'Serbia',8737000,'Europe','2021-09-10','2021-09-10'),(29,'Bulgaria',6948000,'Europe','2021-09-10','2021-09-10'),(30,'Ireland',4937000,'Europe','2021-09-10','2021-09-10'),(31,'Croatia',4105000,'Europe','2021-09-10','2021-09-10'),(33,'Moldova',4033000,'Europe','2021-09-10','2021-09-10'),(34,'Bosnia and Herzegovina',3280000,'Europe','2021-09-10','2021-09-10'),(35,'Albania',2877000,'Europe','2021-09-10','2021-09-10'),(36,'North Macedonia',2083000,'Europe','2021-09-10','2021-09-10'),(37,'Montenegro',628000,'Europe','2021-09-10','2021-09-10'),(38,'Luxemborg',625000,'Europe','2021-09-10','2021-09-10'),(39,'Malta',441000,'Europe','2021-09-10','2021-09-10'),(40,'Iceland',341000,'Europe','2021-09-10','2021-09-10'),(41,'Monaco',39000,'Europe','2021-09-10','2021-09-10'),(42,'Liechtenstein',38000,'Europe','2021-09-10','2021-09-10');

INSERT INTO products(id,avatarImg,title,businessName,category,productDes,price,pickupDate,pickupTime) VALUES(1,NULL,'Lucky bread bag','Lagkagehuset','Bread','Lucky bag with bread',29,NULL,NULL),(2,NULL,NULL,'Br??dhus',NULL,NULL,NULL,NULL,NULL),(3,'avatarimgVar','Br??d','Br??dhus','Br??d kate','kdsjfsjdhks',12,'2021-12-01','12:12:12'),(4,NULL,NULL,'Br??dhus2',NULL,NULL,NULL,NULL,NULL),(5,'avatarimgVar','Br??d2','Br??dhus2','Br??d kate','kdsjfsjdhks',12,'2021-12-01','12:12:12'),(6,NULL,NULL,'Br??dhus2',NULL,NULL,NULL,NULL,NULL),(7,'avatarimgVar','Br??d2','Br??dhus2','Br??d kate','kdsjfsjdhks',12,'2021-12-01','12:12:12'),(8,NULL,NULL,'Br??dhus2',NULL,NULL,NULL,NULL,NULL),(9,'avatarimgVar','Br??d2','Br??dhus2','Br??d kate','kdsjfsjdhks',12,'2021-12-01','12:12:12'),(10,NULL,NULL,'Br??dhus2',NULL,NULL,NULL,NULL,NULL),(11,'avatarimgVar','Br??d2','Br??dhus2','Br??d kate','kdsjfsjdhks',12,'2021-12-01','12:12:12'),(12,'avatarimgVar','Br??d2','Br??dhus2','Br??d kate','kdsjfsjdhks',12,'2021-12-01','12:12:12'),(13,'avatarimgVar','Br??d2','Br??dhus2','Br??d kate','kdsjfsjdhks',12,'2021-12-01','12:12:12'),(14,'','title','business','cat','desc',200,'2021-12-08','11:04:00'),(15,'','ghj','gbnm','ghjm','ghjm',234,'2021-12-16','03:45:00'),(16,'','sadftyg','asdfgh','adsfg','adSFDGFGH',23456,'2021-04-23','04:57:00'),(17,'','sadftyg','asdfgh','adsfg','adSFDGFGH',23456,'2021-04-23','04:57:00');

INSERT INTO userlogin(id,username,pass) VALUES(57,'Test','$2y$10$cg0PrkttTXI65aZ1SNImGeOUp4.THzqz8Cd489zDYb9x97RWFErsW'),(58,'LH','$2y$10$jjPmSY6jpZHf2MQqM0Qp6.UKDnkUy63LwYbrqZCFbaOg42x1G6p7y'),(59,'lag@kage.dk','$2y$10$5pP3mDTn2g3zIyrxNRQKtO.e6yHjMREoe5RpW1sj4AvG1YYha6h9u'),(60,'rema@rema.dk','$2y$10$7lWjpo1Jtz1p43026d/3guJFDNRms1ZYwfIhrDRZDZ5RhCbtFSH7y'),(61,'fika@fika.dk','$2y$10$Ic83S3gnUAGG9nlw3RGgn..9xH97/7kgfT3LrATeIyN.hYBP/HRTq'),(62,'k??d@k??d.dk','$2y$10$tf03pJeY44ssvdu3ooPNyepqWG1asQ98fyzrwKWA5zmjcqES7JtE2');
INSERT INTO users(id,businessName,adress,zipcode,country) VALUES(59,'Lagkagehuset','S??ndergade',8700,1),(60,'Rema','Randersvej',8200,1),(61,'Fika','J??gerg??rdsgade',8000,1),(62,'K??d','K??dvej',8600,1);DROP PROCEDURE IF EXISTS AddNewUser;
CREATE PROCEDURE `AddNewUser`(
    IN businessnameVar VARCHAR(100),
    IN countrynameVar VARCHAR(100)
)
BEGIN
    START TRANSACTION;
    IF
        NOT EXISTS (SELECT id FROM countries WHERE countryName = countrynameVar)
    THEN
        INSERT INTO countries (countryName) VALUES (countrynameVar);
    END IF;
    SET @countryID := (SELECT id FROM countries WHERE countryName = countrynameVar);
    INSERT INTO users (businessName, country)
    VALUES (businessnameVar, @countryID);
    COMMIT;
END;

DROP PROCEDURE IF EXISTS CreateProduct;
CREATE PROCEDURE `CreateProduct`(
    IN avatarimgVar VARCHAR(200),
    IN titleVar VARCHAR(100),
    IN businessnameVar VARCHAR(50),
    IN categoryVar VARCHAR(30),
    IN productdesVar VARCHAR(400),
    IN priceVar INT,
    IN pickupdateVar DATE,
    IN pickuptimeVar TIME
)
BEGIN
    START TRANSACTION;

        INSERT INTO products (avatarImg, title, businessName, category, productDes, price, pickupDate, pickupTime)
        VALUES (avatarimgVar, titleVar, businessnameVar, categoryVar, productdesVar, priceVar, pickupdateVar, pickuptimeVar);
 
    COMMIT;
END;

DROP PROCEDURE IF EXISTS CreateUser;
CREATE PROCEDURE `CreateUser`(
    IN businessnameVar VARCHAR(50),
    IN adressVAR VARCHAR(50),
    IN zipcodeVar INT,
    IN usernameVar VARCHAR(30),
    IN passwordVar VARCHAR(60),
    IN countrynameVar VARCHAR(100)
)
BEGIN
    START TRANSACTION;

        IF
            NOT EXISTS (SELECT id FROM countries WHERE countryName = countrynameVar)
        THEN
            INSERT INTO countries (countryName) VALUES (countrynameVar);
        END IF;

        SET @countryID := (SELECT id FROM countries WHERE countryName = countrynameVar);

        INSERT INTO users (businessname, adress, zipcode, country)
        VALUES (businessnameVar, adressVar, zipcodeVar, @countryID);
 
        SET @userID := (SELECT id FROM users ORDER BY id DESC LIMIT 1);

        INSERT INTO userlogin (id, username, pass)
        VALUES (@userID, usernameVar, passwordVar);
    COMMIT;
END;