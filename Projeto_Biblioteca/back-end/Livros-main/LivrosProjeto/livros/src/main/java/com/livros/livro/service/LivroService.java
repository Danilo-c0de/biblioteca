package com.livros.livro.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.livros.livro.model.LivroModel;
import com.livros.livro.repository.LivroRepository;

@Service
public class LivroService {

    @Autowired
    private LivroRepository repository;


    /**
     *
     * @param Livro A partida (Livro) a ser salva.
     * @return A partida salva, ou uma exceção se a imagem for inválida.
     */
    public LivroModel salvar(LivroModel Livro) {

        return repository.save(Livro);
    }

    /**
     *
     *
     * @return
     */
    public List<LivroModel> listarTodos() {
        return repository.findAll();
    }

    /**
     * 
     *
     * @param id   
     * @param Livro 
     * @return
     */
    public LivroModel atualizar(Integer id, LivroModel Livro) {
        Optional<LivroModel> existingLivro = repository.findById(id);
        if (existingLivro.isPresent()) {
            Livro.setId(id);
            return repository.save(Livro);
        }
        return null;
    }

    /**
     *
     *
     * @param 
     */
    public void deletar(Integer id) {
        repository.deleteById(id);
    }

    /**
     * 
     *
     * @param 
     * @return 
     */
    public LivroModel buscarPorId(Integer id) {
        return repository.findById(id).orElse(null); 
    }
}
