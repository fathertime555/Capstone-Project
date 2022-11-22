CREATE DEFINER=`root`@`localhost` PROCEDURE `addimage`(in _itid int,in _src varchar(200),in _main int)
BEGIN
	insert into imagetable (iid,src,main) values (_itid,_src,_main);
END