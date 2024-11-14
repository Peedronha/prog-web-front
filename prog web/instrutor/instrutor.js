document.addEventListener('DOMContentLoaded', () => {
    const tabela = document.querySelector('#tabela-atividades tbody');
    const modalContainer = document.querySelector('#modal-container');
    const formAtividade = document.querySelector('#form-atividade');
    const fecharModalBtn = document.querySelector('#fechar-modal');
    const submitAtividadeBtn = document.querySelector('#submit-atividade');
    let editando = false;

    // Dados fixos para demonstração (simulando dados de um backend)
    const atividadesFixas = [
        {id: 1, name: 'João Silva', email: 'joão@email.com', password: '12341'},
        {id: 2, name: 'Maria Eduarda', email: 'edumaria@email.com', password: '12341'}
    ];

    // Abrir modal para adicionar atividade
    document.querySelector('#adicionar-atividade').addEventListener('click', () => {
        modalContainer.style.display = 'block';
        formAtividade.reset();
        document.querySelector('#modal-titulo').textContent = 'Adicionar Instrutor';
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
                <td>${item.email}</td>
                <td>
                    <button class="btn btn-edit" onclick="editarAtividade(${item.id}, '${item.name}', '${item.email}', '${item.password}')">Editar</button>
                    <button class="btn btn-delete" onclick="excluirAtividade(${item.id})">Excluir</button>
                </td>
            `;
            tabela.appendChild(tr);
        });
    }

    function validatePasswords() {
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirmPassword').value;

        if (password !== confirmPassword) {
            alert('As senhas não coincidem. Por favor, verifique novamente.');
            return false; // Prevent form submission
        }
        alert('Senhas coincidem! Formulário pode ser enviado.');
        return true; // Allow form submission
    }

    // Função para editar atividade
    // Tem que montar a integração com o back
    window.editarAtividade = (id, nome, email, cpf, password) => {
        document.querySelector('#modal-titulo').textContent = 'Editar Atividade';
        document.querySelector('#id-atividade').value = id;
        document.querySelector('#nome').value = nome;
        document.querySelector('#email').value = email;
        document.querySelector('#password').value = password;
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
        const email = document.querySelector('#email').value;
        const password = document.querySelector('#password').value;

            if (editando) {
                // Atualizar item existente
                const item = atividadesFixas.find(atividade => atividade.id === parseInt(id));
                if (item) {
                    item.name = nome;
                    item.email = email;
                    item.password = password;
                }
            } else {
                // Adicionar novo item
                const novoItem = {
                    id: atividadesFixas.length + 1, // Gerando um novo ID com base no tamanho atual
                    name: nome,
                    email: email,
                    password: password
                };
                atividadesFixas.push(novoItem);
            }


        carregarTabela(); // Recarregar a tabela
        modalContainer.style.display = 'none'; // Fechar a modal
    });

    // Carregar a tabela na inicialização
    carregarTabela();
});
