package com.livros.livro.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.livros.livro.DAO.DAOteste;
import com.livros.livro.model.LivroModel;

import jakarta.transaction.Transactional;

@RestController
@RequestMapping("/livros")
public class LivroController {

    @Autowired
    private DAOteste dao;

    @PostMapping
    public ResponseEntity<LivroModel> criarLivro(@RequestBody LivroModel Livro) {
        try {

            LivroModel novaLivro = dao.save(Livro);
            return new ResponseEntity<>(novaLivro, HttpStatus.CREATED);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping
    public List<LivroModel> listarLivros() {
        return (List<LivroModel>) dao.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<LivroModel> buscarLivroPorId(@PathVariable Integer id) {
        Optional<LivroModel> Livro = dao.findById(id);
        return Livro.map(ResponseEntity::ok)
                   .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<LivroModel> atualizarLivro(@PathVariable Integer id, @RequestBody LivroModel Livro) {
        if (!dao.existsById(id)) {
            return ResponseEntity.notFound().build();
        }

        Livro.setId(id);
        LivroModel LivroAtualizada = dao.save(Livro);
        return ResponseEntity.ok(LivroAtualizada);
    }

    @DeleteMapping("/{Id}")
    @Transactional
    public Optional<LivroModel> ExcluirPartida(@PathVariable Integer Id) {
    	Optional<LivroModel> roundE = dao.findById(Id);
    	dao.deleteById(Id);
    	return roundE;
  }
}
