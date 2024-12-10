create database livros;

use livros;

create table livro (
	livro_id int primary key auto_increment,
	titulo varchar(255),
    genero varchar(255),
    data_lancamento date,
    autor varchar(255)
);