/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `amplification methods`
--

DROP TABLE IF EXISTS `Sequencing`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Sequencing` (
  `sample_ID` int unsigned NOT NULL,
  `seq timestamp` varchar(100) NOT NULL,
  `Base calling` varchar(100) NOT NULL,
  `Length` int unsigned NOT NULL,
  `Read direction` varchar(100) NOT NULL,
  `Primer codes` varchar(100) NOT NULL,
  `Primer description` varchar(100) NOT NULL,
  `Marker` varchar(100) NOT NULL,
  -- PRIMARY KEY (`sample_ID`),
  -- UNIQUE KEY `sample_ID_UNIQUE` (`sample_ID`),
  CONSTRAINT `seq sample_ID FK` FOREIGN KEY (`sample_ID`) REFERENCES `Sampling` (`sample_ID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `amplification methods`
--

LOCK TABLES `Sequencing` WRITE;
/*!40000 ALTER TABLE `Sequencing` DISABLE KEYS */;
-- INSERT INTO `amplification methods` VALUES ('Amplification 1'),('Amplification 10'),('Amplification 11'),('Amplification 2'),('Amplification 3'),('Amplification 4'),('test Amp'),('test amp 2');
/*!40000 ALTER TABLE `Sequencing` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-03-24 14:50:04
