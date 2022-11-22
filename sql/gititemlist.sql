CREATE DEFINER=`root`@`localhost` PROCEDURE `getitemlist`()
BEGIN
	select *  from itemtable LEFT join (select src,iid,main from imagetable) as itable on itemtable.itid=itable.iid and itemtable.display=1 and itable.main=1 order by itemtable.itid desc;
END