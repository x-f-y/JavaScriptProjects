-- SQL 是结构化查询语言，它是专门用来访问和处理数据库的编程语言
-- 使用 SQL 语言编写出来的代码，叫做 SQL 语句
-- SQL 语言只能在关系型数据库中使用（例如MySQL、Oracle、SQL Server），非关系型数据库（例如Mongodb）不支持 SQL 语言
-- SQL 语句中的关键字对大小写不敏感

-- 查询 user 表中的所有列
-- SELECT * FROM `user`;

-- 查询 user 表中的 username 列 和 password 列
-- SELECT username, password FROM `user`;

-- 向 user 表中插入数据
-- INSERT INTO `user` (username, password) VALUES ('tony stark', '098123');
-- SELECT * FROM `user`;

-- 对 user 表中的数据进行更新
-- UPDATE `user` SET username='root', password='root' WHERE id=1;
-- SELECT * FROM `user`;

-- 删除 user 表中 id 为2的用户
-- DELETE FROM `user` WHERE id=2;
-- SELECT * FROM `user`;

-- 演示 where 字句的使用
-- SELECT * FROM `user` WHERE id=3;
-- SELECT * FROM `user` WHERE id>=2;
-- <> 和 != 都表示不等于
-- SELECT * FROM `user` WHERE username<>'root';
-- SELECT * FROM `user` WHERE username!='root';

-- and 和 or 运算符演示
-- SELECT * FROM `user` WHERE username<>'root' AND id<4;
-- SELECT * FROM `user` where password='root' OR username='xh';

-- 使用 order by 关键字对 user 表进行排序 ASC 升序（默认） DESC 降序，有多个排序规则时，用逗号隔开
-- SELECT * FROM `user` ORDER BY id DESC;

-- count() 和 as 关键字演示
-- SELECT COUNT(*) FROM `user` WHERE username<>'root';
-- SELECT COUNT(*) AS total FROM `user` WHERE username<>'root';