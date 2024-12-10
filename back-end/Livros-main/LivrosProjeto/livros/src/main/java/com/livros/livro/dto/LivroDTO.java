package com.livros.livro.dto;

public record LivroDTO(
    Integer id,
    String titulo,
    String genero,
    String dataLancamento,
    String autor
) {
}
