create schema bookstore;

create table bookstore.books (
    id serial primary key,
    isbn numeric,
    title text not null,
    authors text,
    category text,
    imprint text,
    lang text,
    pages numeric,
    publi_year numeric,
    date timestamp default now()
);