drop table if exists articles;
create table articles (
  id integer primary key autoincrement,
  title text not null,
  creationDate text not null,
  content text,
  photoName text,
  latitude real,
  longitude real
);

drop table if exists users;
create table users (
  id integer primary key AUTOINCREMENT,
  username text not NULL,
  password text not NULL,
  firstName text not NULL,
  lastName text not NULL
);

drop table if exists followers;
create table followers (
  id integer primary key AUTOINCREMENT,
  username text not NULL,
  password text not NULL,
  firstName text not NULL,
  lastName text not NULL,
  email text not NULL
)
