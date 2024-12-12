const apiUrl = "http://localhost:8080/livros"; // Update this with your actual backend API URL
const modalContainer = document.getElementById("modal-container");
const livroForm = document.getElementById("livroForm");
const livrosTableBody = document.getElementById("livrosTableBody");
let editingLivroId = null;

function openModal(livro = null) {
    modalContainer.style.display = "flex";
    if (livro) {
        document.getElementById("titulo").value = livro.titulo;
        document.getElementById("autor").value = livro.autor;
        document.getElementById("genero").value = livro.genero;
        document.getElementById("ano").value = livro.dataLancamento;
        editingLivroId = livro.id;
    } else {
        livroForm.reset();
        editingLivroId = null;
    }
}

function closeModal() {
    modalContainer.style.display = "none";
    livroForm.reset();
    editingLivroId = null;
}

async function getLivros() {
    try {
        const response = await fetch(apiUrl);
        const livros = await response.json();
        livrosTableBody.innerHTML = livros
            .map((livro) => `
                <tr>
                    <td>${livro.titulo}</td>
                    <td>${livro.autor}</td>
                    <td>${livro.genero}</td>
                    <td>${livro.dataLancamento}</td>
                    <td><button onclick="editarLivro(${livro.id})" class="edit">Editar</button></td>
                    <td><button onclick="deletarLivro(${livro.id})" class="delete">Excluir</button></td>
                </tr>
            `)
            .join("");
    } catch (error) {
        console.error("Erro ao buscar livros:", error);
    }
}

livroForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const livro = {
        titulo: document.getElementById("titulo").value,
        autor: document.getElementById("autor").value,
        genero: document.getElementById("genero").value,
        dataLancamento: document.getElementById("ano").value,
    };

    try {
        const response = await fetch(editingLivroId ? `${apiUrl}/${editingLivroId}` : apiUrl, {
            method: editingLivroId ? "PUT" : "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(livro),
        });

        if (response.ok) {
            closeModal();
            getLivros();
        } else {
            console.error("Erro ao salvar livro:", response.statusText);
        }
    } catch (error) {
        console.error("Erro ao salvar livro:", error);
    }
});

async function editarLivro(id) {
    try {
        const response = await fetch(`${apiUrl}/${id}`);
        const livro = await response.json();
        openModal(livro);
    } catch (error) {
        console.error("Erro ao buscar livro:", error);
    }
}

async function deletarLivro(id) {
    if (confirm("Tem certeza que deseja excluir este livro?")) {
        try {
            const response = await fetch(`${apiUrl}/${id}`, { method: "DELETE" });
            if (response.ok) {
                getLivros();
            } else {
                console.error("Erro ao excluir livro:", response.statusText);
            }
        } catch (error) {
            console.error("Erro ao excluir livro:", error);
        }
    }
}

getLivros();
