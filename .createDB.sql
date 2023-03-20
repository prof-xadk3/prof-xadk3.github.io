create table atoken (id integer, itr varchar(128), token varchar(128));
		insert into atoken (id, itr, token) values (0, '0000000000', '0000000000');
		insert into atoken (id, itr, token) values (1, '1111111111', '1111111111');
		insert into atoken (id, itr, token) values (2, '9999999999', '9999999999');
		select * from atoken;
