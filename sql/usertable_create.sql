CREATE DATABASE `test` ;
use test;
CREATE TABLE `itemlisttable` (
  `ltid` int NOT NULL AUTO_INCREMENT,
  `lid` int DEFAULT NULL,
  `uid` int DEFAULT NULL,
  `itid` int DEFAULT NULL,
  PRIMARY KEY (`ltid`),
  UNIQUE KEY `ltid_UNIQUE` (`ltid`)
);
CREATE TABLE `addresstable` (
  `aid` int NOT NULL AUTO_INCREMENT,
  `street` varchar(255) DEFAULT NULL,
  `apt` varchar(45) DEFAULT NULL,
  `city` varchar(45) DEFAULT NULL,
  `states` varchar(45) DEFAULT NULL,
  `zip` varchar(45) DEFAULT NULL,
  `uid` int DEFAULT NULL,
  `type` int DEFAULT NULL,
  `lat` varchar(45) DEFAULT NULL,
  `lng` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`aid`),
  UNIQUE KEY `aid_UNIQUE` (`aid`)
);
CREATE TABLE `garagesaletable` (
  `gsid` int NOT NULL AUTO_INCREMENT,
  `uid` int DEFAULT NULL,
  `lid` int DEFAULT NULL,
  `starttime` timestamp NULL DEFAULT NULL,
  `endtime` timestamp NULL DEFAULT NULL,
  `aid` int DEFAULT NULL,
  `_description` longtext,
  `imageid` int DEFAULT NULL,
  PRIMARY KEY (`gsid`)
);
CREATE TABLE `imagetable` (
  `itid` int NOT NULL AUTO_INCREMENT,
  `iid` int DEFAULT NULL,
  `src` varchar(255) DEFAULT NULL,
  `uid` int DEFAULT NULL,
  `type` int DEFAULT NULL,
  `main` int DEFAULT '0',
  PRIMARY KEY (`itid`)
);
CREATE TABLE `itemtable` (
  `itid` int NOT NULL AUTO_INCREMENT,
  `itemname` varchar(45) DEFAULT NULL,
  `brand` varchar(45) DEFAULT NULL,
  `mnumber` varchar(45) DEFAULT NULL,
  `description` longtext,
  `price` decimal(6,2) DEFAULT NULL,
  `qty` int DEFAULT NULL,
  `detail` json DEFAULT NULL,
  `gsid` int DEFAULT '0',
  `posttime` timestamp NULL DEFAULT NULL,
  `imageid` int DEFAULT NULL,
  `uid` int DEFAULT NULL,
  `display` int DEFAULT '1',
  PRIMARY KEY (`itid`)
);

