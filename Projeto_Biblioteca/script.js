// Função para mostrar o formulário de adicionar livro
function mostrarFormulario() {
    document.getElementById('formularioLivros').style.display = 'block';
}

// Função para fechar o formulário de adicionar livro
function fecharFormulario() {
    document.getElementById('formularioLivros').style.display = 'none';
    document.getElementById('nomeLivro').value = '';
    document.getElementById('autor').value = '';
    document.getElementById('imagemLivro').value = '';
    document.getElementById('conteudoLivro').value = '';
}

// Função para adicionar livro ao DOM
function adicionarLivro(event) {
    event.preventDefault();

    const nomeLivro = document.getElementById('nomeLivro').value;
    const autor = document.getElementById('autor').value;
    const imagemLivro = document.getElementById('imagemLivro').files[0];
    const conteudoLivro = document.getElementById('conteudoLivro').value;

    const reader = new FileReader();

    reader.onloadend = function () {
        // Criação do conteúdo do livro
        const livro = document.createElement('div');
        livro.classList.add('livro-publicado');

        const imagemElement = document.createElement('img');
        imagemElement.src = reader.result;
        livro.appendChild(imagemElement);

        const infoLivro = document.createElement('div');
        infoLivro.classList.add('info-livro');
        infoLivro.innerHTML = `
            <h3>${nomeLivro}</h3>
            <p><strong>Publicado por:</strong> ${autor}</p>
        `;
        livro.appendChild(infoLivro);

        // Botão de "Ler" que abre o modal
        const btnLeitura = document.createElement('button');
        btnLeitura.classList.add('btn-leitura');
        btnLeitura.innerText = 'Ler';
        btnLeitura.onclick = () => abrirModal(nomeLivro, autor, imagemElement.src, conteudoLivro);
        livro.appendChild(btnLeitura);

        // Adicionando o livro na lista de livros publicados
        document.getElementById('livrosPublicados').appendChild(livro);

        // Fechar o formulário e limpar os campos
        fecharFormulario();
    };

    if (imagemLivro) {
        reader.readAsDataURL(imagemLivro);
    }
}

// Função para abrir o modal de leitura
function abrirModal(nomeLivro, autor, imagemSrc, conteudo) {
    document.getElementById('modal').style.display = 'flex';
    const modalConteudo = document.getElementById('modalConteudo');
    modalConteudo.innerHTML = `
        <h2>${nomeLivro}</h2>
        <p><strong>Publicado por:</strong> ${autor}</p>
        <img src="${imagemSrc}" alt="Imagem do Livro" style="width: 100px; height: 150px;">
        <h3>Conteúdo:</h3>
        <p>${conteudo}</p>
        <button class="close-modal-btn" onclick="fecharModal()">×</button>
    `;
}

// Função para fechar o modal
function fecharModal() {
    document.getElementById('modal').style.display = 'none';
}

// Função para abrir o menu
function openMenu() {
    document.getElementById('menuLateral').style.width = '250px';
}

// Função para fechar o menu
function closeMenu() {
    document.getElementById('menuLateral').style.width = '0';
}

// Adiciona o evento de submit ao formulário
document.getElementById('formLivro').addEventListener('submit', adicionarLivro);
