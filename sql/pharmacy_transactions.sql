-- MySQL dump 10.13  Distrib 8.0.28, for Win64 (x86_64)
--
-- Host: localhost    Database: pharmacy
-- ------------------------------------------------------
-- Server version	8.0.28

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
-- Table structure for table `transactions`
--

DROP TABLE IF EXISTS `transactions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `transactions` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `inv_number` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `status` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT 'pending',
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `payment_proof_path` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `total_payment` int NOT NULL,
  `address_id` int NOT NULL,
  `shipper_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  KEY `address_id` (`address_id`),
  CONSTRAINT `transactions_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  CONSTRAINT `transactions_ibfk_2` FOREIGN KEY (`address_id`) REFERENCES `user_addresses` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=37 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `transactions`
--

LOCK TABLES `transactions` WRITE;
/*!40000 ALTER TABLE `transactions` DISABLE KEYS */;
INSERT INTO `transactions` VALUES (18,2,'20220710122913','approved','2022-07-10 12:29:13',NULL,13400,1,1),(19,2,'20220710123029','approved','2022-07-10 12:30:29',NULL,13400,1,1),(20,2,'20220710123044','approved','2022-07-10 12:30:44','/Users/antonius/projects/purwadhika/jcwd-vl005-04-be/src/storages/payment/payment_proof_cc7188565668e24fd1944d94951fd2fa.jpg',13400,1,1),(21,2,'20220710123210','approved','2022-07-10 12:32:10','/Users/antonius/projects/purwadhika/jcwd-vl005-04-be/src/storages/payment/payment_proof_287483a4ffe6f25158fd776911609ee9.jpg',10450,1,1),(22,2,'20220710123250','approved','2022-07-10 12:32:50','/Users/antonius/projects/purwadhika/jcwd-vl005-04-be/src/storages/payment/payment_proof_ed22e43dd4034fdf9fbebf0102a0c944.jpg',13600,1,1),(23,2,'20220710124528','approved','2022-07-10 12:45:28',NULL,9700,4,4),(24,2,'20220710124921','approved','2022-07-10 12:49:21','http://127.0.0.1:5000/files/payment/payment_proof_cc7188565668e24fd1944d94951fd2fa.jpg',10450,1,6),(25,2,'20220711123729','approved','2022-07-11 12:37:29','http://127.0.0.1:5000/files/payment/payment_proof_6d2237ce15afe823fece9035f00c871a.jpg',6700,1,1),(26,2,'20220712072550','approved','2022-07-12 07:25:50','http://127.0.0.1:5000/files/payment/payment_proof_fdf8f8f2c51db76b00af109395526a54.jpg',6700,6,2),(27,2,'20220712074254','approved','2022-07-12 07:42:54',NULL,8250,1,1),(28,2,'20220712074312','approved','2022-07-12 07:43:12','http://127.0.0.1:5000/files/payment/payment_proof_b0595bf1d2f6f0c77069d83d12e76145.jpg',3250,1,1),(29,2,'20220715100806','approved','2022-07-15 10:08:06','http://127.0.0.1:5000/files/payment/payment_proof_23a2478d03032aa2ca254086e47d5b60.jpg',5750,4,1),(30,2,'20220715113818','pending','2022-07-15 11:38:18',NULL,5750,1,1),(31,2,'20220717021019','pending','2022-07-17 02:10:19',NULL,97500,1,1),(32,2,'20220717021027','pending','2022-07-17 02:10:27',NULL,97500,3,1),(33,2,'20220717021033','pending','2022-07-17 02:10:33',NULL,97500,3,4),(34,2,'20220717021208','pending','2022-07-17 02:12:08',NULL,6500,1,1),(35,2,'20220717021209','pending','2022-07-17 02:12:09',NULL,6500,1,1),(36,4,'20220717021231','in_review','2022-07-17 02:12:31','http://127.0.0.1:5000/files/payment/payment_proof_dfc71352b17a3c2095271683fc6f5540.jpg',6700,1,1);
/*!40000 ALTER TABLE `transactions` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-07-22 10:22:00
