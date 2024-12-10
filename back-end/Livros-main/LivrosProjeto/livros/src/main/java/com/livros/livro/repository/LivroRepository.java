package com.livros.livro.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.livros.livro.model.LivroModel;

public interface LivroRepository extends JpaRepository<LivroModel, Integer> {

}
