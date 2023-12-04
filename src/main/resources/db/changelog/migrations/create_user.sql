create table users
(
    id       uuid default gen_random_uuid() primary key,
    username varchar unique,
    password varchar,
    enabled  varchar
);

