CREATE TABLE `products`(
  `id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `avatarImg` VARCHAR(200),
  `title` VARCHAR(100),
  `businessName` VARCHAR(50),
  `category` VARCHAR(30),
  `productDes` VARCHAR(400),
  `price` INT,
  `pickupDate` DATE,
  `pickupTime` TIME
);