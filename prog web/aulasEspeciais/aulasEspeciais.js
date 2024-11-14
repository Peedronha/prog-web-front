document.addEventListener('DOMContentLoaded', () => {
    const tabelaAulas = document.querySelector('#tabela-aulas tbody');
    const modalContainer = document.querySelector('#modal-container');
    const formAula = document.querySelector('#form-aula');
    const fecharModalBtn = document.querySelector('#fechar-modal');
    let editando = false;

    // Dados fixos para demonstração (simulando dados de um backend)
    const aulasFixas = [
        { id: 1, activityName: 'Muay Thai', instructor: 'Carlos Silva', duration: '1 hora', dayOfWeek: 'Segunda' },
        { id: 2, activityName: 'Yoga', instructor: 'Ana Costa', duration: '1 hora e 30 mins', dayOfWeek: 'Quarta' }
    ];

    // Abrir modal para adicionar aula
    document.querySelector('#adicionar-aula-especial').addEventListener('click', () => {
        modalContainer.style.display = 'block';
        formAula.reset();
        document.querySelector('#modal-titulo').textContent = 'Adicionar Aula Especial';
        editando = false;
    });

    // Fechar modal
    fecharModalBtn.addEventListener('click', () => {
        modalContainer.style.display = 'none';
    });

    // Função para carregar a tabela (usando os dados fixos)
    function carregarTabelaAulas() {
        const aulas = aulasFixas;

        tabelaAulas.innerHTML = ''; // Limpar a tabela antes de adicionar novos dados
        aulas.forEach(item => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${item.id}</td>
                <td>${item.activityName}</td>
                <td>${item.instructor}</td>
                <td>${item.duration}</td>
                <td>${item.dayOfWeek}</td>
                <td>
                    <button class="btn btn-edit" onclick="editarAula(${item.id}, '${item.activityName}', '${item.instructor}', '${item.duration}', '${item.dayOfWeek}')">Editar</button>
                    <button class="btn btn-delete" onclick="excluirAula(${item.id})">Excluir</button>
                </td>
            `;
            tabelaAulas.appendChild(tr);
        });
    }

    // Função para editar aula
    window.editarAula = (id, nomeAtividade, instrutor, duracao, diaSemana) => {
        document.querySelector('#modal-titulo').textContent = 'Editar Aula Especial';
        document.querySelector('#id-aula').value = id;
        document.querySelector('#nome-atividade').value = nomeAtividade;
        document.querySelector('#instrutor').value = instrutor;
        document.querySelector('#duracao').value = duracao;
        document.querySelector('#dia-semana').value = diaSemana;
        modalContainer.style.display = 'block';
        editando = true;
    };

    // Função para excluir aula
    window.excluirAula = (id) => {
        if (confirm('Tem certeza que deseja excluir esta aula especial?')) {
            const index = aulasFixas.findIndex(item => item.id === id);
            if (index !== -1) {
                aulasFixas.splice(index, 1);
                carregarTabelaAulas();
            }
        }
    };

    // Enviar formulário (adicionar ou editar)
    formAula.addEventListener('submit', (e) => {
        e.preventDefault();

        const id = document.querySelector('#id-aula').value;
        const nomeAtividade = document.querySelector('#nome-atividade').value;
        const instrutor = document.querySelector('#instrutor').value;
        const duracao = document.querySelector('#duracao').value;
        const diaSemana = document.querySelector('#dia-semana').value;

        if (editando) {
            const item = aulasFixas.find(aula => aula.id === parseInt(id));
            if (item) {
                item.activityName = nomeAtividade;
                item.instructor = instrutor;
                item.duration = duracao;
                item.dayOfWeek = diaSemana;
            }
        } else {
            const novoItem = {
                id: aulasFixas.length + 1,
                activityName: nomeAtividade,
                instructor: instrutor,
                duration: duracao,
                dayOfWeek: diaSemana
            };
            aulasFixas.push(novoItem);
        }

        carregarTabelaAulas();
        modalContainer.style.display = 'none';
    });

    // Carregar a tabela na inicialização
    carregarTabelaAulas();
});
