const perguntas = [

    {
        pergunta: "1. O apocalipse começou e você está em Santo André. Qual é a primeira coisa que você deve fazer?",
        alternativas: [
            "Sair correndo sem saber para onde",
            "Avaliar a situação e procurar um local seguro",
            "Ir procurar um shopping imediatamente",
            "Ficar esperando alguém aparecer"
        ],
        correta: 1
    },

    {
        pergunta: "2. Você precisa atravessar a cidade. Qual é a atitude mais segura?",
        alternativas: [
            "Planejar a rota e evitar áreas desconhecidas",
            "Seguir qualquer multidão que encontrar",
            "Andar sem água para ficar mais leve",
            "Escolher a rota mais longa possível"
        ],
        correta: 0
    },

    {
        pergunta: "3. Você encontrou uma mochila com alguns itens. O que seria mais útil para a sobrevivência?",
        alternativas: [
            "Uma coleção de figurinhas",
            "Água, comida e uma lanterna",
            "Um controle remoto sem pilhas",
            "Um travesseiro gigante"
        ],
        correta: 1
    },

    {
        pergunta: "4. Você está em um prédio e percebe que o local não é mais seguro. O que fazer?",
        alternativas: [
            "Ignorar completamente o problema",
            "Planejar uma saída segura",
            "Começar a gritar pela janela",
            "Voltar para o local de onde veio sem pensar"
        ],
        correta: 1
    },

    {
        pergunta: "5. Um grupo de sobreviventes oferece ajuda. O que você deve fazer antes de confiar completamente neles?",
        alternativas: [
            "Avaliar a situação e manter atenção",
            "Entregar todos os seus suprimentos",
            "Contar onde está seu esconderijo",
            "Seguir o grupo imediatamente"
        ],
        correta: 0
    },

    {
        pergunta: "6. Você encontra um mercado aparentemente abandonado. Qual é a prioridade?",
        alternativas: [
            "Pegar tudo o que encontrar",
            "Verificar se o local é seguro antes de entrar",
            "Entrar correndo e apagar as luzes",
            "Ficar fazendo compras por três horas"
        ],
        correta: 1
    },

    {
        pergunta: "7. Durante a noite, você precisa descansar. Qual opção faz mais sentido?",
        alternativas: [
            "Escolher um lugar protegido e manter seus itens organizados",
            "Dormir no meio da rua",
            "Deixar a porta completamente aberta",
            "Fazer uma festa para comemorar"
        ],
        correta: 0
    },

    {
        pergunta: "8. Depois de vários dias, você encontra uma placa dizendo: 'Santo André está segura'. O que fazer?",
        alternativas: [
            "Ir correndo sem verificar nada",
            "Investigar a informação antes de seguir",
            "Jogar fora todos os seus suprimentos",
            "Acreditar na placa imediatamente"
        ],
        correta: 1
    }

];


let perguntaAtual = 0;
let pontos = 0;
let respondeu = false;


function carregarPergunta() {

    respondeu = false;

    const pergunta = perguntas[perguntaAtual];

    document.getElementById("contador").textContent =
        `Pergunta ${perguntaAtual + 1} de ${perguntas.length}`;

    document.getElementById("pontuacao").textContent =
        `Pontos: ${pontos}`;

    document.getElementById("pergunta").textContent =
        pergunta.pergunta;

    const alternativas =
        document.getElementById("alternativas");

    alternativas.innerHTML = "";

    pergunta.alternativas.forEach((texto, index) => {

        const botao = document.createElement("button");

        botao.classList.add("alternativa");

        botao.textContent = texto;

        botao.onclick = () => selecionarResposta(index, botao);

        alternativas.appendChild(botao);

    });

    document.getElementById("proximo").disabled = true;

    if (perguntaAtual === perguntas.length - 1) {
        document.getElementById("proximo").textContent =
            "VER RESULTADO ☠️";
    } else {
        document.getElementById("proximo").textContent =
            "PRÓXIMA PERGUNTA →";
    }
}


function selecionarResposta(index, botaoEscolhido) {

    if (respondeu) {
        return;
    }

    respondeu = true;

    const pergunta = perguntas[perguntaAtual];

    const botoes =
        document.querySelectorAll(".alternativa");

    botoes.forEach(botao => {
        botao.disabled = true;
    });

    if (index === pergunta.correta) {

        pontos++;

        botaoEscolhido.classList.add("correta");

    } else {

        botaoEscolhido.classList.add("errada");

        botoes[pergunta.correta].classList.add("correta");
    }

    document.getElementById("pontuacao").textContent =
        `Pontos: ${pontos}`;

    document.getElementById("proximo").disabled = false;
}


function proximaPergunta() {

    if (!respondeu) {
        return;
    }

    perguntaAtual++;

    if (perguntaAtual < perguntas.length) {

        carregarPergunta();

    } else {

        mostrarResultado();

    }
}


function mostrarResultado() {

    document.getElementById("quiz").classList.add("escondido");

    const resultado =
        document.getElementById("resultado");

    resultado.classList.remove("escondido");

    let mensagem = "";

    if (pontos <= 2) {

        mensagem =
            `Você fez ${pontos}/8 pontos.<br><br>
            🧟 Você provavelmente seria derrotado pelo primeiro obstáculo.
            Talvez Santo André não esteja pronta para você.`;

    } else if (pontos <= 4) {

        mensagem =
            `Você fez ${pontos}/8 pontos.<br><br>
            😬 Você sobreviveu por pouco!
            Ainda precisa melhorar suas estratégias de sobrevivência.`;

    } else if (pontos <= 6) {

        mensagem =
            `Você fez ${pontos}/8 pontos.<br><br>
            🏃 Você tem boas chances de sobreviver.
            Já está pensando como um verdadeiro sobrevivente.`;

    } else {

        mensagem =
            `Você fez ${pontos}/8 pontos.<br><br>
            🧟‍♂️ PARABÉNS!
            Você conseguiu sobreviver ao apocalipse em Santo André.`;

    }

    document.getElementById("resultadoTexto").innerHTML =
        mensagem;
}


function reiniciarQuiz() {

    perguntaAtual = 0;
    pontos = 0;

    document.getElementById("resultado")
        .classList.add("escondido");

    document.getElementById("quiz")
        .classList.remove("escondido");

    carregarPergunta();
}


carregarPergunta();