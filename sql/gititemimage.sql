CREATE DEFINER=`root`@`localhost` PROCEDURE `getitemimage`(in _itid int)
BEGIN
select*from imagetable where iid=_itid;
END