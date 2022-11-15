CREATE DEFINER=`root`@`localhost` PROCEDURE `create database`()
BEGIN

-- create usertable

drop table if exists usertable;

CREATE TABLE `usertable` (
  `uid` int NOT NULL AUTO_INCREMENT,
  `firstname` varchar(45) DEFAULT NULL,
  `lastname` varchar(45) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `phone` varchar(45) DEFAULT NULL,
  `password` varchar(45) DEFAULT NULL,
  `registertime` timestamp NULL DEFAULT NULL,
  `username` varchar(45) DEFAULT NULL,
  `profilepicture` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`uid`),
  UNIQUE KEY `uid_UNIQUE` (`uid`),
  UNIQUE KEY `email_UNIQUE` (`email`)
);

insert into usertable (firstname,lastname,email,phone,password,registertime,username,profilepicture) values ("Cary","Doe","Cary.doe@gamil.com","4254254225","123456",NOW(),"user123","");
insert into usertable (firstname,lastname,email,phone,password,registertime,username,profilepicture) values ("Jason","Davis","Jason.Davis@gamil.com","4254254225","123456",NOW(),"user124","");
insert into usertable (firstname,lastname,email,phone,password,registertime,username,profilepicture) values ("Corey","Reese","Corey.Reese@gamil.com","4254254225","123456",NOW(),"user125","");
insert into usertable (firstname,lastname,email,phone,password,registertime,username,profilepicture) values ("Dominique","Aguirre","Dominique.Aguirre@gamil.com","4254254225","123456",NOW(),"user126","");
insert into usertable (firstname,lastname,email,phone,password,registertime,username,profilepicture) values ("Melissa","Rodriguez","Melissa.Rodriguez@gamil.com","4254254225","123456",NOW(),"user127","");
insert into usertable (firstname,lastname,email,phone,password,registertime,username,profilepicture) values ("Whitney","Green","Whitney.Green@gamil.com","4254254225","123456",NOW(),"user128","");
insert into usertable (firstname,lastname,email,phone,password,registertime,username,profilepicture) values ("Chase","Franklin","Franklin.doe@gamil.com","4254254225","123456",NOW(),"user129","");
insert into usertable (firstname,lastname,email,phone,password,registertime,username,profilepicture) values ("Lauren","Tucker","Lauren.Tucker@gamil.com","4254254225","123456",NOW(),"user130","");
--

drop table if exists itemtable;

CREATE TABLE `itemtable` (
  `itid` INT NOT NULL AUTO_INCREMENT,
  `itemname` VARCHAR(45) NULL,
  `brand` VARCHAR(45) NULL,
  `mnumber` VARCHAR(45) NULL,
  `description` LONGTEXT NULL,
  `price` DECIMAL(6,2) NULL,
  `qty` INT NULL,
  `detail` JSON NULL,
  `gsid` INT NULL DEFAULT 0,
  `posttime` TIMESTAMP NULL,
  `imageid` INT NULL,
  `uid` INT NULL,
  `display` INT NULL DEFAULT 1,
  PRIMARY KEY (`itid`)
  );

insert into usertable (itemname,brand,mnumber,description,price,qty,gsid,posttime,imageid,uid,display) values ("iphone","apple","123456","this is a phone","1499.99",1,1,NOW(),1,1,true);



drop table if exists addresstable;

CREATE TABLE `addresstable` (
  `aid` int NOT NULL AUTO_INCREMENT,
  `street` varchar(255) DEFAULT NULL,
  `apt` varchar(45) DEFAULT NULL,
  `city` varchar(45) DEFAULT NULL,
  `states` varchar(45) DEFAULT NULL,
  `zip` varchar(45) DEFAULT NULL,
  `uid` int DEFAULT NULL,
  `type` int DEFAULT NULL,
  PRIMARY KEY (`aid`),
  UNIQUE KEY `aid_UNIQUE` (`aid`)
);


drop table if exists garagesaletable;

CREATE TABLE `test`.`garagesaletable` (
  `gsid` INT NOT NULL AUTO_INCREMENT,
  `uid` INT NULL,
  `lid` INT NULL,
  `starttime` TIMESTAMP NULL,
  `endtime` TIMESTAMP NULL,
  `aid` INT NULL,
  `description` LONGTEXT NULL,
  `imageid` INT NULL,
  PRIMARY KEY (`gsid`)
  );

drop table if exists itemlisttable;

CREATE TABLE `test`.`itemlisttable` (
  `ltid` INT NOT NULL AUTO_INCREMENT,
  `lid` INT NULL,
  `uid` INT NULL,
  `itid` INT NULL,
  PRIMARY KEY (`ltid`),
  UNIQUE INDEX `ltid_UNIQUE` (`ltid` ASC) VISIBLE
);

drop table if exists ordertable;

CREATE TABLE `test`.`ordertable` (
  `oid` INT NOT NULL AUTO_INCREMENT,
  `uid` INT NULL,
  `lid` INT NULL,
  `ordertime` TIMESTAMP NULL,
  `total` DECIMAL(6,2) NULL,
  `tax` DECIMAL(6,2) NULL,
  `subtotal` DECIMAL(6,2) NULL,
  `billing` VARCHAR(255) NULL,
  `shipping` VARCHAR(255) NULL,
  `cid` VARCHAR(45) NULL,
  PRIMARY KEY (`oid`),
  UNIQUE INDEX `oid_UNIQUE` (`oid` ASC) VISIBLE);

drop table if exists  imagetable;

CREATE TABLE `test`.`imagetable` (
  `itid` int NOT NULL AUTO_INCREMENT,
  `iid` int DEFAULT NULL,
  `src` varchar(255) DEFAULT NULL,
  `uid` int DEFAULT NULL,
  `type` int DEFAULT NULL,
  PRIMARY KEY (`itid`)
);
END