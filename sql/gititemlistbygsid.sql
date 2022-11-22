CREATE DEFINER=`root`@`localhost` PROCEDURE `getitemlistbygsid`(in _gsid int)
BEGIN
	select *  from (select * from itemtable where gsid=_gsid) as item LEFT join (select src,iid,main from imagetable) as itable on item.itid=itable.iid and item.display=1 and itable.main=1 order by item.itid desc;
END