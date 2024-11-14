document.addEventListener('DOMContentLoaded', () => {
    const tabela = document.querySelector('#tabela-atividades tbody');
    const modalContainer = document.querySelector('#modal-container');
    const formAtividade = document.querySelector('#form-atividade');
    const fecharModalBtn = document.querySelector('#fechar-modal');
    const submitAtividadeBtn = document.querySelector('#submit-atividade');
    let editando = false;

    // Dados fixos para demonstração (simulando dados de um backend)
    const atividadesFixas = [
        { id: 1, name: 'Maquina 1', marca: 'ABC', grupo: 'Superior' },
        { id: 2, name: 'Maquina 2', marca: 'EFG', grupo: 'Posterior Perna' }
    ];

    // Abrir modal para adicionar atividade
    document.querySelector('#adicionar-atividade').addEventListener('click', () => {
        modalContainer.style.display = 'block';
        formAtividade.reset();
        document.querySelector('#modal-titulo').textContent = 'Adicionar Atividade';
        editando = false;
    });

    // Fechar modal
    fecharModalBtn.addEventListener('click', () => {
        modalContainer.style.display = 'none';
    });

    // Função para carregar a tabela (usando os dados fixos)
    function carregarTabela() {
        // Em um cenário real, substituiríamos por uma chamada fetch para o backend
        const atividades = atividadesFixas; // Usando os dados fixos

        tabela.innerHTML = ''; // Limpar a tabela antes de adicionar novos dados
        //Preenche a tabela
        atividades.forEach(item => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${item.id}</td>
                <td>${item.name}</td>
                <td>${item.marca}</td>
                <td>${item.grupo}</td>
                <td>
                    <button class="btn btn-edit" onclick="editarAtividade(${item.id}, '${item.name}', '${item.marca}', '${item.grupo}')">Editar</button>
                    <button class="btn btn-delete" onclick="excluirAtividade(${item.id})">Excluir</button>
                </td>
            `;
            tabela.appendChild(tr);
        });
    }

    // Função para editar atividade
    // Tem que montar a integração com o back
    window.editarAtividade = (id, nome, marca, grupo) => {
        document.querySelector('#modal-titulo').textContent = 'Editar Máquina';
        document.querySelector('#id-atividade').value = id;
        document.querySelector('#nome').value = nome;
        document.querySelector('#marca').value = marca;
        document.querySelector('#grupo').value = grupo;
        modalContainer.style.display = 'block';
        editando = true;
    };

    // Função para excluir atividade
    // Tem que montar a integração com o back
    window.excluirAtividade = (id) => {
        if (confirm('Tem certeza que deseja excluir esta atividade?')) {
            // Aqui, simularíamos a exclusão do backend
            const index = atividadesFixas.findIndex(item => item.id === id);
            if (index !== -1) {
                atividadesFixas.splice(index, 1); // Remover item do array fixo
                carregarTabela(); // Recarregar a tabela
            }
        }
    };

    // Enviar formulário (adicionar ou editar)
    formAtividade.addEventListener('submit', (e) => {
        e.preventDefault();

        const id = document.querySelector('#id-atividade').value;
        const nome = document.querySelector('#nome').value;
        const marca = document.querySelector('#marca').value;
        const grupo = document.querySelector('#grupo').value;

        if (editando) {
            // Atualizar item existente
            const item = atividadesFixas.find(atividade => atividade.id === parseInt(id));
            if (item) {
                item.name = nome;
                item.marca = marca;
                item.grupo = grupo;
            }
        } else {
            // Adicionar novo item
            const novoItem = {
                id: atividadesFixas.length + 1, // Gerando um novo ID com base no tamanho atual
                name: nome,
                marca: marca,
                grupo: grupo
            };
            atividadesFixas.push(novoItem);
        }

        carregarTabela(); // Recarregar a tabela
        modalContainer.style.display = 'none'; // Fechar a modal
    });

    // Carregar a tabela na inicialização
    carregarTabela();
});
