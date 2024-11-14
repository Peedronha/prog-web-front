document.addEventListener('DOMContentLoaded', () => {
    const tabelaCargos = document.querySelector('#tabela-cargos tbody');
    const modalContainer = document.querySelector('#modal-container');
    const formCargo = document.querySelector('#form-cargo');
    const fecharModalBtn = document.querySelector('#fechar-modal');
    let editando = false;

    // Dados fixos para demonstração (simulando dados de um backend)
    const cargosFixos = [
        { id: 1, cargoName: 'Instrutor', description: 'Responsável por ministrar aulas e treinos' },
        { id: 2, cargoName: 'Recepcionista', description: 'Responsável pelo atendimento na recepção' }
    ];

    // Abrir modal para adicionar cargo
    document.querySelector('#adicionar-cargo').addEventListener('click', () => {
        modalContainer.style.display = 'block';
        formCargo.reset();
        document.querySelector('#modal-titulo').textContent = 'Adicionar Cargo';
        editando = false;
    });

    // Fechar modal
    fecharModalBtn.addEventListener('click', () => {
        modalContainer.style.display = 'none';
    });

    // Função para carregar a tabela (usando os dados fixos)
    function carregarTabelaCargos() {
        const cargos = cargosFixos;

        tabelaCargos.innerHTML = ''; // Limpar a tabela antes de adicionar novos dados
        cargos.forEach(item => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${item.id}</td>
                <td>${item.cargoName}</td>
                <td>${item.description}</td>
                <td>
                    <button class="btn btn-edit" onclick="editarCargo(${item.id}, '${item.cargoName}', '${item.description}')">Editar</button>
                    <button class="btn btn-delete" onclick="excluirCargo(${item.id})">Excluir</button>
                </td>
            `;
            tabelaCargos.appendChild(tr);
        });
    }

    // Função para editar cargo
    window.editarCargo = (id, nomeCargo, descricao) => {
        document.querySelector('#modal-titulo').textContent = 'Editar Cargo';
        document.querySelector('#id-cargo').value = id;
        document.querySelector('#nome-cargo').value = nomeCargo;
        document.querySelector('#descricao').value = descricao;
        modalContainer.style.display = 'block';
        editando = true;
    };

    // Função para excluir cargo
    window.excluirCargo = (id) => {
        if (confirm('Tem certeza que deseja excluir este cargo?')) {
            const index = cargosFixos.findIndex(item => item.id === id);
            if (index !== -1) {
                cargosFixos.splice(index, 1);
                carregarTabelaCargos();
            }
        }
    };

    // Enviar formulário (adicionar ou editar)
    formCargo.addEventListener('submit', (e) => {
        e.preventDefault();

        const id = document.querySelector('#id-cargo').value;
        const nomeCargo = document.querySelector('#nome-cargo').value;
        const descricao = document.querySelector('#descricao').value;

        if (editando) {
            const item = cargosFixos.find(cargo => cargo.id === parseInt(id));
            if (item) {
                item.cargoName = nomeCargo;
                item.description = descricao;
            }
        } else {
            const novoItem = {
                id: cargosFixos.length + 1,
                cargoName: nomeCargo,
                description: descricao
            };
            cargosFixos.push(novoItem);
        }

        carregarTabelaCargos();
        modalContainer.style.display = 'none';
    });

    // Carregar a tabela na inicialização
    carregarTabelaCargos();
});
