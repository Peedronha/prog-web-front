document.addEventListener('DOMContentLoaded', () => {
    const tabelaTreinos = document.querySelector('#tabela-treinos tbody');
    const modalContainer = document.querySelector('#modal-container');
    const formTreino = document.querySelector('#form-treino');
    const fecharModalBtn = document.querySelector('#fechar-modal');
    let editando = false;

    // Dados fixos para demonstração (simulando dados de um backend)
    const treinosFixos = [
        { id: 1, name: 'Supino', duration: '30 mins', repetitions: '3x12' },
        { id: 2, name: 'Agachamento', duration: '20 mins', repetitions: '4x10' }
    ];

    // Abrir modal para adicionar treino
    document.querySelector('#adicionar-treino').addEventListener('click', () => {
        modalContainer.style.display = 'block';
        formTreino.reset();
        document.querySelector('#modal-titulo').textContent = 'Adicionar Treino';
        editando = false;
    });

    // Fechar modal
    fecharModalBtn.addEventListener('click', () => {
        modalContainer.style.display = 'none';
    });

    // Função para carregar a tabela (usando os dados fixos)
    function carregarTabelaTreinos() {
        const treinos = treinosFixos;

        tabelaTreinos.innerHTML = ''; // Limpar a tabela antes de adicionar novos dados
        treinos.forEach(item => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${item.id}</td>
                <td>${item.name}</td>
                <td>${item.duration}</td>
                <td>${item.repetitions}</td>
                <td>
                    <button class="btn btn-edit" onclick="editarTreino(${item.id}, '${item.name}', '${item.duration}', '${item.repetitions}')">Editar</button>
                    <button class="btn btn-delete" onclick="excluirTreino(${item.id})">Excluir</button>
                </td>
            `;
            tabelaTreinos.appendChild(tr);
        });
    }

    // Função para editar treino
    window.editarTreino = (id, nome, duracao, repeticoes) => {
        document.querySelector('#modal-titulo').textContent = 'Editar Treino';
        document.querySelector('#id-treino').value = id;
        document.querySelector('#nome-exercicio').value = nome;
        document.querySelector('#duracao').value = duracao;
        document.querySelector('#repeticoes').value = repeticoes;
        modalContainer.style.display = 'block';
        editando = true;
    };

    // Função para excluir treino
    window.excluirTreino = (id) => {
        if (confirm('Tem certeza que deseja excluir este treino?')) {
            const index = treinosFixos.findIndex(item => item.id === id);
            if (index !== -1) {
                treinosFixos.splice(index, 1);
                carregarTabelaTreinos();
            }
        }
    };

    // Enviar formulário (adicionar ou editar)
    formTreino.addEventListener('submit', (e) => {
        e.preventDefault();

        const id = document.querySelector('#id-treino').value;
        const nome = document.querySelector('#nome-exercicio').value;
        const duracao = document.querySelector('#duracao').value;
        const repeticoes = document.querySelector('#repeticoes').value;

        if (editando) {
            const item = treinosFixos.find(treino => treino.id === parseInt(id));
            if (item) {
                item.name = nome;
                item.duration = duracao;
                item.repetitions = repeticoes;
            }
        } else {
            const novoItem = {
                id: treinosFixos.length + 1,
                name: nome,
                duration: duracao,
                repetitions: repeticoes
            };
            treinosFixos.push(novoItem);
        }

        carregarTabelaTreinos();
        modalContainer.style.display = 'none';
    });

    // Carregar a tabela na inicialização
    carregarTabelaTreinos();
});
