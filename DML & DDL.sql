create database  Market;
use Market;
create table product (
    id int not null AUTO_INCREMENT,
    description varchar(255) not null,
    code varchar(255) unique not null,
    price decimal not null,
    quantity int default 0,
    primary key(id)
);