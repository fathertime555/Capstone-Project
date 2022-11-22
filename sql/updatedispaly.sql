CREATE DEFINER=`root`@`localhost` PROCEDURE `updatedisplay`(in _itid int,in _display int, out result int)
BEGIN
declare countRow int;
update itemtable set display=2 where itid=_itid;
SET countRow =  ROW_COUNT();
set result=countRow;
END