// Função para adicionar mensagens ao chat
function addMessage(content, sender) {
    const chatBox = document.getElementById('chat-box');
    const messageDiv = document.createElement('div');
    messageDiv.className = 'message ' + sender;
    
    // Cria a imagem do usuário
    const img = document.createElement('img');
    img.src = sender === 'user' ? 'imgs/imgUser.png' : 'imgs/logoOtt.webp'; // Substitua pelos caminhos corretos das fotos

    const textDiv = document.createElement('div');
    textDiv.textContent = content;
    
    messageDiv.appendChild(img);
    messageDiv.appendChild(textDiv);
    chatBox.appendChild(messageDiv);
    chatBox.scrollTop = chatBox.scrollHeight; // Rolagem automática para a mensagem mais recente
}

// Função para processar a entrada do usuário
function processUserInput() {
    const userInput = document.getElementById('user-input').value.trim();
    if (userInput === '') return;

    addMessage(userInput, 'user');

    // Simula uma resposta do chatbot
    setTimeout(() => {
        let botResponse = generateBotResponse(userInput);
        addMessage(botResponse, 'bot');
    }, 1000); // Simula um delay na resposta

    document.getElementById('user-input').value = ''; // Limpa o campo de entrada
}

// Função para gerar a resposta do chatbot com base na entrada do usuário
function generateBotResponse(input) {
    const lowerCaseInput = input.toLowerCase();

    const responses = {
        greeting: 'Olá! Bem-vindo à Ott Sistemas. Como posso ajudar você com a cerca elétrica hoje?',
        installation: 'Para a instalação de cercas elétricas, siga estas etapas: 1. Escolha o local. 2. Instale os postes. 3. Fixe o fio. 4. Conecte o energizador. 5. Teste o sistema.',
        maintenance: 'A manutenção das cercas elétricas inclui: 1. Inspecionar os fios e postes regularmente. 2. Limpar os postes. 3. Verificar o funcionamento do energizador. 4. Substituir peças danificadas.',
        price: 'Os preços de instalação e manutenção de cercas elétricas variam dependendo do tamanho e complexidade do sistema. Entre em contato conosco para um orçamento personalizado.',
        problems: 'Para problemas comuns: 1. Verifique se o energizador está funcionando corretamente. 2. Certifique-se de que os fios estão bem conectados. 3. Verifique se os postes estão firmes. 4. Verifique se há danos visíveis nos fios.',
        battery: 'A bateria deve ser verificada regularmente para garantir que está carregada. Se a cerca estiver com desempenho irregular, pode ser necessário substituir a bateria.',
        firing: 'Se você está tendo problemas com o disparo da cerca, verifique se todos os componentes estão funcionando corretamente e se o energizador está configurado corretamente.',
        contact: 'Você pode entrar em contato conosco pelo telefone (XX) XXXX-XXXX ou pelo e-mail contato@ottsistemas.com.',
        serviceAreas: 'Atendemos as seguintes áreas: Cidade A, Cidade B, e Cidade C. Entre em contato para verificar se atendemos sua localização.',
        warranty: 'Oferecemos uma garantia de 12 meses para instalação e manutenção de cercas elétricas. Verifique os termos e condições para mais detalhes.',
        troubleshooting: 'Se estiver enfrentando problemas, tente as seguintes soluções: 1. Verifique a conexão elétrica. 2. Teste o energizador. 3. Inspecione os fios para possíveis danos.',
        farewell: 'Tchau! Se precisar de mais ajuda, estamos aqui para você.',
        thanks: 'De nada! Se tiver mais perguntas, estou aqui para ajudar.',
        workingHours: 'Nosso horário de atendimento é de segunda a sexta-feira, das 8h às 18h. Aos sábados, atendemos das 9h às 13h.',
        emergency: 'Em casos de emergência, entre em contato imediatamente pelo telefone (XX) XXXX-XXXX.',
        default: 'Desculpe, não entendi. Você pode reformular sua pergunta ou verificar nossas perguntas frequentes.'
    };

    // Mapeamento de palavras-chave para respostas
    const keywords = {
        greeting: ['olá', 'oi', 'bem-vindo', 'saudações'],
        installation: ['instalação', 'como instalar', 'montagem', 'colocação'],
        maintenance: ['manutenção', 'cuidados', 'verificação', 'manter'],
        price: ['preço', 'valor', 'custo', 'quanto custa'],
        problems: ['problemas', 'dúvidas', 'defeitos', 'problema', 'disparando', 'disparo'],
        battery: ['bateria', 'carregar', 'substituir bateria'],
        contact: ['contato', 'telefone', 'e-mail', 'falar com'],
        serviceAreas: ['áreas de atendimento', 'localização', 'cidades atendidas'],
        warranty: ['garantia', 'tempo de garantia', 'cobertura'],
        troubleshooting: ['solução de problemas', 'troubleshooting', 'resolver problemas'],
        farewell: ['tchau', 'adeus', 'até logo', 'despedida'],
        thanks: ['obrigado', 'agradecido', 'valeu'],
        workingHours: ['horário de atendimento', 'horário', 'quando estamos abertos'],
        emergency: ['emergência', 'urgência', 'ajuda imediata']
    };

    // Função auxiliar para verificar se o input contém alguma das palavras-chave
    function checkKeywords(input, keywords) {
        for (const [key, values] of Object.entries(keywords)) {
            for (const value of values) {
                if (input.includes(value)) {
                    return key;
                }
            }
        }
        return 'default';
    }

    // Responde com base na categoria encontrada ou com a resposta padrão
    const responseKey = checkKeywords(lowerCaseInput, keywords);
    return responses[responseKey] || responses.default;
}

// Função para iniciar o chat com uma mensagem de boas-vindas
function initiateChat() {
    addMessage('Olá! Bem-vindo à Ott Sistemas. Como posso ajudar você com a cerca elétrica hoje?', 'bot');
}

// Inicia o chat com a mensagem de boas-vindas
initiateChat();

// Configura os eventos
document.getElementById('send-button').addEventListener('click', processUserInput);
document.getElementById('user-input').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        processUserInput();
    }
});
