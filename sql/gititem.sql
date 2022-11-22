CREATE DEFINER=`root`@`localhost` PROCEDURE `getitem`(in _itid int)
BEGIN
select*from itemtable where itid=_itid;
END