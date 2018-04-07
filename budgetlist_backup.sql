-- MySQL dump 10.13  Distrib 5.6.17, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: budgetlist
-- ------------------------------------------------------
-- Server version	5.6.17

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `budgelist_class`
--

DROP TABLE IF EXISTS `budgelist_class`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `budgelist_class` (
  `class_id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `class_classname_id` int(11) unsigned NOT NULL COMMENT '名称id',
  `class_group_id` int(11) unsigned NOT NULL COMMENT '属性id',
  `class_specifications` varchar(255) NOT NULL COMMENT '规格（用尺寸和乘号描述）',
  `class_otherspecifications` varchar(255) NOT NULL COMMENT '除尺寸外的规格（用文字描述）',
  `class_numbers` int(11) unsigned NOT NULL COMMENT '数量',
  `class_ square` float unsigned NOT NULL COMMENT '平方数',
  `class_price` float unsigned NOT NULL COMMENT '单价',
  `class_totalprice` float unsigned NOT NULL COMMENT '单项总金额',
  PRIMARY KEY (`class_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `budgelist_class`
--

LOCK TABLES `budgelist_class` WRITE;
/*!40000 ALTER TABLE `budgelist_class` DISABLE KEYS */;
/*!40000 ALTER TABLE `budgelist_class` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `budgelist_classname`
--

DROP TABLE IF EXISTS `budgelist_classname`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `budgelist_classname` (
  `class_name_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `class_name` varchar(255) NOT NULL COMMENT '类名称',
  PRIMARY KEY (`class_name_id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `budgelist_classname`
--

LOCK TABLES `budgelist_classname` WRITE;
/*!40000 ALTER TABLE `budgelist_classname` DISABLE KEYS */;
INSERT INTO `budgelist_classname` VALUES (1,'大门'),(2,'小门'),(3,'大柱'),(4,'小柱'),(5,'围栏'),(6,'方管柱'),(7,'电机'),(8,'电线'),(9,'橡胶条'),(10,'线管'),(11,'预埋铁'),(12,'铁板'),(13,'橡胶条2');
/*!40000 ALTER TABLE `budgelist_classname` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `budgelist_group`
--

DROP TABLE IF EXISTS `budgelist_group`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `budgelist_group` (
  `group_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `group_name` varchar(255) NOT NULL COMMENT '组名称',
  PRIMARY KEY (`group_id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `budgelist_group`
--

LOCK TABLES `budgelist_group` WRITE;
/*!40000 ALTER TABLE `budgelist_group` DISABLE KEYS */;
INSERT INTO `budgelist_group` VALUES (1,'东门'),(2,'西门'),(3,'南门'),(4,'北门'),(5,'附件'),(6,'小计');
/*!40000 ALTER TABLE `budgelist_group` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `budgetlist_list`
--

DROP TABLE IF EXISTS `budgetlist_list`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `budgetlist_list` (
  `list_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `list_name` varchar(255) NOT NULL COMMENT '清单名称',
  `list_type_id` int(10) unsigned NOT NULL COMMENT '清单类型',
  `list_savepath` varchar(255) NOT NULL COMMENT '文件保存路径',
  PRIMARY KEY (`list_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `budgetlist_list`
--

LOCK TABLES `budgetlist_list` WRITE;
/*!40000 ALTER TABLE `budgetlist_list` DISABLE KEYS */;
/*!40000 ALTER TABLE `budgetlist_list` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `budgetlist_list_relation`
--

DROP TABLE IF EXISTS `budgetlist_list_relation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `budgetlist_list_relation` (
  `listr_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `listr_list_id` int(10) unsigned NOT NULL,
  `listr_class_id` int(10) unsigned NOT NULL,
  `listr_group_id` int(10) unsigned NOT NULL,
  PRIMARY KEY (`listr_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `budgetlist_list_relation`
--

LOCK TABLES `budgetlist_list_relation` WRITE;
/*!40000 ALTER TABLE `budgetlist_list_relation` DISABLE KEYS */;
/*!40000 ALTER TABLE `budgetlist_list_relation` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `budgetlist_type`
--

DROP TABLE IF EXISTS `budgetlist_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `budgetlist_type` (
  `type_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `type_name` varchar(255) NOT NULL COMMENT '类型名称',
  PRIMARY KEY (`type_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `budgetlist_type`
--

LOCK TABLES `budgetlist_type` WRITE;
/*!40000 ALTER TABLE `budgetlist_type` DISABLE KEYS */;
INSERT INTO `budgetlist_type` VALUES (1,'结算清单'),(2,'预算清单');
/*!40000 ALTER TABLE `budgetlist_type` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-04-07  9:40:11
