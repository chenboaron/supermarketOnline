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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products-categories`
--

LOCK TABLES `products-categories` WRITE;
/*!40000 ALTER TABLE `products-categories` DISABLE KEYS */;
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
  `city` varchar(15) DEFAULT NULL,
  `street` varchar(35) DEFAULT NULL,
  `user_type` varchar(10) NOT NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `User_Name_UNIQUE` (`user_name`),
  UNIQUE KEY `User_ID_UNIQUE` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'chen','boharon','chenboaron93@gmail.com','a2b488d07fb0bc006a3754eadef589a1','','','admin');
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

-- Dump completed on 2020-12-31  1:41:02
