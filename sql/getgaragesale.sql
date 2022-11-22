CREATE DEFINER=`root`@`localhost` PROCEDURE `getgaragesale`()
BEGIN
select * from garagesaletable as garage left join (select*from addresstable) as address on garage.aid=address.aid;
END