-- MySQL dump 10.13  Distrib 8.0.22, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: supermarket-online
-- ------------------------------------------------------
-- Server version	8.0.22

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `cart-items`
--

DROP TABLE IF EXISTS `cart-items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cart-items` (
  `item_id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `product_id` bigint unsigned NOT NULL,
  `amount` int unsigned NOT NULL,
  `total_price` int unsigned NOT NULL,
  `cart_id` bigint unsigned NOT NULL,
  PRIMARY KEY (`item_id`),
  UNIQUE KEY `item_id_UNIQUE` (`item_id`),
  KEY `FK_product_id_idx` (`product_id`),
  KEY `FK_cart_id_idx` (`cart_id`),
  CONSTRAINT `FK_cart_id` FOREIGN KEY (`cart_id`) REFERENCES `shopping-carts` (`cart_id`),
  CONSTRAINT `FK_product_id` FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cart-items`
--

LOCK TABLES `cart-items` WRITE;
/*!40000 ALTER TABLE `cart-items` DISABLE KEYS */;
/*!40000 ALTER TABLE `cart-items` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orders` (
  `order_id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `order_owner` bigint unsigned NOT NULL,
  `cart_id` bigint unsigned NOT NULL,
  `total_price` int unsigned NOT NULL,
  `delivery_city` varchar(45) NOT NULL,
  `delivery_street` varchar(45) NOT NULL,
  `delivery_date` date NOT NULL,
  `order_date` date NOT NULL,
  `last_four_card_digits` int unsigned NOT NULL,
  PRIMARY KEY (`order_id`),
  UNIQUE KEY `order_id_UNIQUE` (`order_id`),
  KEY `FK_user_id_idx` (`order_owner`),
  KEY `FK_cart_id_idx` (`cart_id`),
  CONSTRAINT `FK_cart` FOREIGN KEY (`cart_id`) REFERENCES `shopping-carts` (`cart_id`),
  CONSTRAINT `FK_user_id` FOREIGN KEY (`order_owner`) REFERENCES `users` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `products` (
  `product_id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `product_name` varchar(45) NOT NULL,
  `product_category` bigint unsigned NOT NULL,
  `product_price` int unsigned NOT NULL,
  `product_image_URL` varchar(1000) NOT NULL,
  PRIMARY KEY (`product_id`),
  UNIQUE KEY `Product_ID_UNIQUE` (`product_id`),
  UNIQUE KEY `product_name_UNIQUE` (`product_name`),
  KEY `FK_Category_ID_idx` (`product_category`),
  CONSTRAINT `FK_Category_ID` FOREIGN KEY (`product_category`) REFERENCES `products-categories` (`category_id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (1,'Coca-Cola',1,3,'https://spiazzo.co.il/wp-content/uploads/2019/03/O278207.jpg'),(2,'Entrecote',2,30,'https://s3-eu-west-1.amazonaws.com/straus/media/products2/c0057afd171e4d01837ce971002e89b5.jpg'),(3,'Fish',2,15,'https://cdn.shopify.com/s/files/1/0110/9278/7257/products/fillet-locus.jpg?v=1539001664'),(4,'Watermelon',3,8,'https://media.istockphoto.com/photos/watermelon-slice-isolated-on-white-background-clipping-path-full-of-picture-id1125584344?k=6&m=1125584344&s=612x612&w=0&h=IwK7vpDu55NwRkdJawmV_nNX4nPNrnEr3D86iGXRx_M='),(5,'Milk',4,4,'https://s3-ap-southeast-2.amazonaws.com/wc-prod-pim/JPEG_1000x1000/GH301721_devondale_full_cream_uht_milk_1l.jpg'),(6,'Eggs',4,4,'https://www.heart.org/-/media/images/news/2018/august-2018/0816eggs_sc.jpg'),(7,'Cucumber',3,2,'https://d3m9l0v76dty0.cloudfront.net/system/photos/3809886/large/aad0fb68c0eb3b4eaa236c46b1a81414.jpg'),(8,'Sprite',1,3,'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS2vdDDbngbjPokDWMM340j4eaW_jz_C2odag&usqp=CAU');
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products-categories`
--

DROP TABLE IF EXISTS `products-categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `products-categories` (
  `category_id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `category_name` varchar(25) NOT NULL,
  PRIMARY KEY (`category_id`),
  UNIQUE KEY `Product_ID_UNIQUE` (`category_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products-categories`
--

LOCK TABLES `products-categories` WRITE;
/*!40000 ALTER TABLE `products-categories` DISABLE KEYS */;
INSERT INTO `products-categories` VALUES (1,'drinking'),(2,'Meat and fish'),(3,'Fruits and Vegetables'),(4,'Milk and eggs');
/*!40000 ALTER TABLE `products-categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `shopping-carts`
--

DROP TABLE IF EXISTS `shopping-carts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `shopping-carts` (
  `cart_id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `cret_owner` bigint unsigned NOT NULL,
  `cart_creation_date` date NOT NULL,
  PRIMARY KEY (`cart_id`),
  UNIQUE KEY `cart_id_UNIQUE` (`cart_id`),
  KEY `FK_cart_owner_idx` (`cret_owner`),
  CONSTRAINT `FK_cart_owner` FOREIGN KEY (`cret_owner`) REFERENCES `users` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `shopping-carts`
--

LOCK TABLES `shopping-carts` WRITE;
/*!40000 ALTER TABLE `shopping-carts` DISABLE KEYS */;
/*!40000 ALTER TABLE `shopping-carts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `user_id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `first_name` varchar(25) NOT NULL,
  `last_name` varchar(25) NOT NULL,
  `user_name` varchar(35) NOT NULL,
  `password` varchar(150) NOT NULL,
  `city` varchar(35) DEFAULT NULL,
  `street` varchar(35) DEFAULT NULL,
  `user_type` varchar(10) NOT NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `User_Name_UNIQUE` (`user_name`),
  UNIQUE KEY `User_ID_UNIQUE` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=987654328 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (98765432,'AWSD','AWSD','ASD@ASD.COM','cb39022912e3fb00faaa09ceac85722e','Tel Aviv','EWDS','USER'),(123321123,'chch','chch','c123@gmail.com','a2b488d07fb0bc006a3754eadef589a1','Raanana','Shir Hshirim ','USER'),(123456321,'erdfh','graeh','wsxcde@gbhrfg.com','a2b488d07fb0bc006a3754eadef589a1','Hadera','hiueg','USER'),(123456789,'llllll','bjjbjbjb','m@m.com','a2b488d07fb0bc006a3754eadef589a1','Netanya is the best city','kkkkkk','USER'),(123654789,'mkmk','mkmk','dr@dr.com','68ef38e662f9826433c2769f9f86f905','Raanana','mkmkm','USER'),(159623847,'edbvgkj','boharon','nj@nj.com','a2b488d07fb0bc006a3754eadef589a1','Eilat','Shir Hshirim','USER'),(159632478,'NJHB','MKIJ','SSS@SSSS.COM','1cfafbb38029a9c7abf4bdbc82d710c0','Petah Tikva','BHGV','USER'),(204623250,'chen','boharon','chenboaron93@gmail.com','a2b488d07fb0bc006a3754eadef589a1','','','ADMIN'),(204623258,'mor','ezra','mor@gmail.com','a2b488d07fb0bc006a3754eadef589a1','City 9','alalalalalal','USER'),(206302085,'orly','boharon','orlyisaacs@gmail.com','a2b488d07fb0bc006a3754eadef589a1','City 6','shir hashirim','USER'),(208482599,'ben','ashkenazi','ben@gmail.com','a2b488d07fb0bc006a3754eadef589a1','City 4','yossi','USER'),(222222222,'wsws','wsws','xsw@xs.com','a2b488d07fb0bc006a3754eadef589a1','Hadera','wewew','USER'),(295474580,'avi','boharon','avi@gmail.com','a2b488d07fb0bc006a3754eadef589a1','City 5','cvcvcvcvcvcv','USER'),(298482600,'yossi','ezra','yossi@gmail.com','a2b488d07fb0bc006a3754eadef589a1','City 10','asdasadasd','USER'),(333623264,'chen','boharon','chen@gmail.com','68ef38e662f9826433c2769f9f86f905','City 2','cccc','USER'),(395472688,'orly','boharon','orly@gmail.com','a2b488d07fb0bc006a3754eadef589a1','City 1','cvcvcvcvcvcv','USER'),(456625593,'c','cdcdcd','c@gmail.com','a2b488d07fb0bc006a3754eadef589a1','Hadera','jijiji','USER'),(741258963,'hjghj','njk','vgr@vge.com','68ef38e662f9826433c2769f9f86f905','Jerusalem','gtyfy','USER'),(987654321,'orly','FRFR','ZAQ@ZAQ.COM','0b9a9fbf93b0ab0dcd3bbbac5e7676b5','Jerusalem','Shir Hshirim','USER'),(987654327,'QAZ','QAZ','CDE@VFE.COM','9e539047a5f96250e1036ae2a0471bf8','Eilat','WSX','USER');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-01-11  2:09:03
