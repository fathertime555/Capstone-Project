CREATE DEFINER=`root`@`localhost` PROCEDURE `additem`(
in _itemname varchar(45),
in _brand varchar(45),
in _mnumber varchar(45),
in _description LONGTEXT,
in _price DECIMAL(6,2),
in _qty INT,
in _gsid INT,
in _imageid INT,
in _uid INT,
in _display INT,
out itemid int
)
BEGIN
insert into itemtable (itemname,brand,mnumber,description,price,qty,gsid,posttime,imageid,uid,display) values (_itemname,_brand,_mnumber,_description,_price,_qty,_gsid,NOW(),_imageid,_uid,_display);
set itemid=LAST_INSERT_ID();
select itemid;
END