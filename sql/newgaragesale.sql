CREATE DEFINER=`root`@`localhost` PROCEDURE `newgaragesale`(
in _street varchar(200),
in _city varchar(200),
in _states varchar(20),
in _zip varchar(10),
in _starttime timestamp, 
in _endtime timestamp, 
in _uid int, 
in __description longtext)
BEGIN
declare address int;
insert into addresstable (street,city,states,zip,uid) values (_street,_city,_states,_zip,_uid);

set address=LAST_INSERT_ID();

insert into garagesaletable (aid,starttime,endtime,_description,uid) values (address,_starttime,_endtime,__description,_uid);
select LAST_INSERT_ID() as aid;
END