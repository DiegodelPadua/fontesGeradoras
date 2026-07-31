// ======================================================
// FUNÇÕES AUXILIARES
// ======================================================

/**
 * Retorna um elemento do HTML pelo seu ID.
 *
 * @param {string} id
 * @returns {HTMLElement|null}
 */
function obterElemento(id) {
    return document.getElementById(id);
}


/**
 * Formata um valor numérico usando vírgula decimal.
 *
 * @param {number} valor
 * @param {number} casas
 * @returns {string}
 */
function formatarNumero(valor, casas = 2) {

    return Number(valor).toLocaleString(
        "pt-BR",
        {
            minimumFractionDigits: casas,
            maximumFractionDigits: casas
        }
    );

}


// ======================================================
// MENU RESPONSIVO
// ======================================================

const botaoMenu =
obterElemento("botao-menu");

const menu =
obterElemento("menu");


if (botaoMenu && menu) {

    botaoMenu.addEventListener(
        "click",
        () => {
            menu.classList.toggle("aberto");
        }
    );


    document
        .querySelectorAll(".menu a")
        .forEach(link => {

            link.addEventListener(
                "click",
                () => {
                    menu.classList.remove("aberto");
                }
            );

        });

}


// ======================================================
// DADOS DAS FONTES GERADORAS
// ======================================================

const fontesGeradoras = {

    quimica: {
        nome: "Pilha",
        iconeEntrada: "🧪",
        iconeGerador: "🔋",
        entrada: "Química",
        tensao: 1.5,
        unidade: "VCC",
        saida: "Corrente contínua",
        intensidade: 22,
        brilho: 14,
        hero: "Energia química → elétrica",
        explicacao:
            "Reações químicas criam uma diferença de potencial entre os terminais da pilha."
    },

    termica: {
        nome: "Termopar",
        iconeEntrada: "🔥",
        iconeGerador: "🌡️",
        entrada: "Térmica",
        tensao: 0.08,
        unidade: "VCC",
        saida: "Pequena tensão contínua",
        intensidade: 10,
        brilho: 7,
        hero: "Energia térmica → elétrica",
        explicacao:
            "A junção aquecida de dois metais diferentes produz uma pequena tensão elétrica."
    },

    luz: {
        nome: "Célula fotovoltaica",
        iconeEntrada: "☀️",
        iconeGerador: "🔆",
        entrada: "Luminosa",
        tensao: 6,
        unidade: "VCC",
        saida: "Corrente contínua",
        intensidade: 48,
        brilho: 30,
        hero: "Energia luminosa → elétrica",
        explicacao:
            "Os fótons da luz provocam o movimento de cargas nas camadas semicondutoras da célula."
    },

    mecanica: {
        nome: "Cristal piezoelétrico",
        iconeEntrada: "🔨",
        iconeGerador: "💎",
        entrada: "Mecânica",
        tensao: 15,
        unidade: "V pulsante",
        saida: "Pulso elétrico",
        intensidade: 68,
        brilho: 42,
        hero: "Energia mecânica → elétrica",
        explicacao:
            "A compressão ou a torção do cristal produz uma diferença de potencial."
    },

    magnetica: {
        nome: "Alternador",
        iconeEntrada: "🌀",
        iconeGerador: "🧲",
        entrada: "Mecânica e magnética",
        tensao: 127,
        unidade: "VCA",
        saida: "Corrente alternada",
        intensidade: 100,
        brilho: 65,
        hero: "Energia mecânica → magnética → elétrica",
        explicacao:
            "A movimentação da bobina ou do campo magnético produz uma tensão elétrica por indução."
    }

};


// ======================================================
// SIMULADOR DE FONTES GERADORAS
// ======================================================

const botoesFonte =
document.querySelectorAll(".botao-fonte");

const displayTensao =
obterElemento("display-tensao");

const displayUnidade =
obterElemento("display-unidade");

const barraGeracao =
obterElemento("barra-geracao");

const entradaEnergia =
obterElemento("entrada-energia");

const maquinaGeradora =
obterElemento("maquina-geradora");

const lampadaTeste =
obterElemento("lampada-teste");

const tipoEntrada =
obterElemento("tipo-entrada");

const nomeDispositivo =
obterElemento("nome-dispositivo");

const tipoSaida =
obterElemento("tipo-saida");

const explicacaoSimulador =
obterElemento("explicacao-simulador");


// Elementos da seção inicial.
const valorHero =
obterElemento("valor-hero");

const unidadeHero =
obterElemento("unidade-hero");

const iconeHero =
obterElemento("icone-hero");

const seloHero =
obterElemento("selo-hero");

const rotorHero =
obterElemento("rotor-hero");


/**
 * Atualiza o simulador com a fonte selecionada.
 *
 * @param {string} chaveFonte
 */
function atualizarFonte(chaveFonte) {

    const fonte =
    fontesGeradoras[chaveFonte];

    if (!fonte) {
        return;
    }


    if (displayTensao) {

        const casas =
        fonte.tensao < 1 ? 3 : 2;

        displayTensao.textContent =
        Number(fonte.tensao).toFixed(casas);

    }


    if (displayUnidade) {
        displayUnidade.textContent =
        fonte.unidade;
    }


    if (barraGeracao) {
        barraGeracao.style.width =
        `${fonte.intensidade}%`;
    }


    if (entradaEnergia) {
        entradaEnergia.textContent =
        fonte.iconeEntrada;
    }


    if (maquinaGeradora) {

        maquinaGeradora.textContent =
        fonte.iconeGerador;

        maquinaGeradora.classList.remove(
            "ativa"
        );

        // Reinicia a animação.
        void maquinaGeradora.offsetWidth;

        maquinaGeradora.classList.add(
            "ativa"
        );

    }


    if (lampadaTeste) {

        lampadaTeste.style.filter =
        `drop-shadow(0 0 ${fonte.brilho}px gold)`;

        lampadaTeste.style.transform =
        `scale(${0.9 + fonte.intensidade / 400})`;

    }


    if (tipoEntrada) {
        tipoEntrada.textContent =
        fonte.entrada;
    }


    if (nomeDispositivo) {
        nomeDispositivo.textContent =
        fonte.nome;
    }


    if (tipoSaida) {
        tipoSaida.textContent =
        fonte.saida;
    }


    if (explicacaoSimulador) {
        explicacaoSimulador.textContent =
        fonte.explicacao;
    }


    // Atualiza a ilustração inicial.
    if (valorHero) {
        valorHero.textContent =
        formatarNumero(
            fonte.tensao,
            fonte.tensao < 1 ? 2 : 0
        );
    }


    if (unidadeHero) {
        unidadeHero.textContent =
        fonte.unidade;
    }


    if (iconeHero) {
        iconeHero.textContent =
        fonte.iconeGerador;
    }


    if (seloHero) {
        seloHero.textContent =
        fonte.hero;
    }


    if (rotorHero) {

        rotorHero.classList.toggle(
            "girando",
            chaveFonte === "magnetica"
        );

    }

}


botoesFonte.forEach(botao => {

    botao.addEventListener(
        "click",
        () => {

            botoesFonte.forEach(item => {
                item.classList.remove("ativo");
            });

            botao.classList.add("ativo");

            atualizarFonte(
                botao.dataset.fonte
            );

        }
    );

});


// ======================================================
// SIMULAÇÃO DE INDUÇÃO MAGNÉTICA
// ======================================================

const ima =
obterElemento("ima");

const tensaoInduzida =
obterElemento("tensao-induzida");

const explicacaoInducao =
obterElemento("explicacao-inducao");

const botaoMoverIma =
obterElemento("mover-ima");

const botaoInverterIma =
obterElemento("inverter-ima");

const botaoPararIma =
obterElemento("parar-ima");


let inducaoAtiva = false;

let polosInvertidos = false;

let intervaloInducao = null;


/**
 * Atualiza a leitura do medidor de indução.
 */
function atualizarLeituraInducao() {

    if (!inducaoAtiva) {

        if (tensaoInduzida) {
            tensaoInduzida.textContent =
            "0,00 V";
        }

        return;
    }


    const valorAleatorio =
    (
        0.6 +
        Math.random() * 2.4
    );


    const sinal =
    polosInvertidos ? "-" : "+";


    if (tensaoInduzida) {

        tensaoInduzida.textContent =
        `${sinal}${formatarNumero(valorAleatorio, 2)} V`;

    }

}


/**
 * Inicia o movimento do ímã.
 */
function iniciarInducao() {

    inducaoAtiva = true;

    if (ima) {
        ima.classList.add("movendo");
    }


    if (explicacaoInducao) {

        explicacaoInducao.textContent =
        "O movimento do ímã altera o fluxo magnético através da bobina e produz tensão induzida.";

    }


    clearInterval(intervaloInducao);

    atualizarLeituraInducao();

    intervaloInducao =
    setInterval(
        atualizarLeituraInducao,
        450
    );

}


/**
 * Interrompe a demonstração.
 */
function pararInducao() {

    inducaoAtiva = false;

    clearInterval(intervaloInducao);

    if (ima) {
        ima.classList.remove("movendo");
    }


    if (tensaoInduzida) {
        tensaoInduzida.textContent =
        "0,00 V";
    }


    if (explicacaoInducao) {

        explicacaoInducao.textContent =
        "Sem movimento relativo entre o ímã e a bobina, não há variação de fluxo magnético.";

    }

}


if (botaoMoverIma) {

    botaoMoverIma.addEventListener(
        "click",
        iniciarInducao
    );

}


if (botaoPararIma) {

    botaoPararIma.addEventListener(
        "click",
        pararInducao
    );

}


if (botaoInverterIma) {

    botaoInverterIma.addEventListener(
        "click",
        () => {

            polosInvertidos =
            !polosInvertidos;

            if (ima) {
                ima.classList.toggle(
                    "invertido",
                    polosInvertidos
                );
            }


            if (explicacaoInducao) {

                explicacaoInducao.textContent =
                "Ao inverter os polos do ímã, o sentido da tensão induzida também é invertido.";

            }


            atualizarLeituraInducao();

        }
    );

}


// ======================================================
// MISSÃO INTERATIVA
// ======================================================

const energiaMissao =
obterElemento("energia-missao");

const dispositivoMissao =
obterElemento("dispositivo-missao");

const aplicacaoMissao =
obterElemento("aplicacao-missao");

const botaoVerificarMissao =
obterElemento("verificar-missao");

const botaoReiniciarMissao =
obterElemento("reiniciar-missao");

const feedbackMissao =
obterElemento("feedback-missao");

const missaoConcluida =
obterElemento("missao-concluida");


/**
 * Atualiza visualmente um objetivo da missão.
 *
 * @param {string} id
 * @param {boolean} concluido
 */
function atualizarObjetivo(
    id,
    concluido
) {

    const objetivo =
    obterElemento(id);

    if (!objetivo) {
        return;
    }


    objetivo.classList.toggle(
        "concluido",
        concluido
    );


    const simbolo =
    objetivo.querySelector("span");

    if (simbolo) {

        simbolo.textContent =
        concluido ? "✓" : "○";

    }

}


/**
 * Verifica as escolhas da missão.
 */
function verificarMissao() {

    const energiaCorreta =
    energiaMissao?.value === "termica";

    const dispositivoCorreto =
    dispositivoMissao?.value === "termopar";

    const aplicacaoCorreta =
    aplicacaoMissao?.value === "temperatura";


    atualizarObjetivo(
        "obj-energia",
        energiaCorreta
    );

    atualizarObjetivo(
        "obj-dispositivo",
        dispositivoCorreto
    );

    atualizarObjetivo(
        "obj-aplicacao",
        aplicacaoCorreta
    );


    if (
        energiaCorreta &&
        dispositivoCorreto &&
        aplicacaoCorreta
    ) {

        if (feedbackMissao) {

            feedbackMissao.textContent =
            "Correto! O termopar produz tensão por ação térmica e pode ser usado como sensor de temperatura.";

            feedbackMissao.className =
            "feedback-missao sucesso";

        }


        if (missaoConcluida) {
            missaoConcluida.hidden = false;
        }

    } else {

        if (feedbackMissao) {

            feedbackMissao.textContent =
            "Ainda não. Procure a fonte formada pela junção de dois metais diferentes que produz tensão quando aquecida.";

            feedbackMissao.className =
            "feedback-missao erro";

        }


        if (missaoConcluida) {
            missaoConcluida.hidden = true;
        }

    }

}


if (botaoVerificarMissao) {

    botaoVerificarMissao.addEventListener(
        "click",
        verificarMissao
    );

}


/**
 * Reinicia a missão.
 */
function reiniciarMissao() {

    if (energiaMissao) {
        energiaMissao.value = "";
    }

    if (dispositivoMissao) {
        dispositivoMissao.value = "";
    }

    if (aplicacaoMissao) {
        aplicacaoMissao.value = "";
    }


    [
        "obj-energia",
        "obj-dispositivo",
        "obj-aplicacao"
    ].forEach(id => {

        atualizarObjetivo(
            id,
            false
        );

    });


    if (feedbackMissao) {

        feedbackMissao.textContent =
        "Analise a descrição antes de escolher as opções.";

        feedbackMissao.className =
        "feedback-missao";

    }


    if (missaoConcluida) {
        missaoConcluida.hidden = true;
    }

}


if (botaoReiniciarMissao) {

    botaoReiniciarMissao.addEventListener(
        "click",
        reiniciarMissao
    );

}


// ======================================================
// CARROSSEL DE CURIOSIDADES
// ======================================================

const curiosidades = [
    {
        icone: "🌡️",
        titulo: "O termopar também é um sensor",
        texto:
            "A junção de metais diferentes pode produzir uma pequena tensão quando aquecida.",
        destaque:
            "Aplicação: medição de temperatura"
    },

    {
        icone: "☀️",
        titulo: "A célula fotovoltaica usa fótons",
        texto:
            "A luz transfere energia aos elétrons do material semicondutor, permitindo a circulação de carga.",
        destaque:
            "Energia luminosa → elétrica"
    },

    {
        icone: "💎",
        titulo: "Alguns cristais produzem tensão",
        texto:
            "Quartzo e outros materiais piezoelétricos podem gerar diferença de potencial quando comprimidos.",
        destaque:
            "Pressão mecânica → tensão"
    },

    {
        icone: "🧲",
        titulo: "O campo magnético é muito utilizado",
        texto:
            "Dínamos, alternadores e geradores eletromecânicos utilizam o princípio da indução magnética.",
        destaque:
            "Movimento + campo magnético"
    },

    {
        icone: "💧",
        titulo: "A água não gera eletricidade diretamente",
        texto:
            "Na hidrelétrica, a água movimenta a turbina, que aciona o gerador elétrico.",
        destaque:
            "Água → movimento → eletricidade"
    },

    {
        icone: "🌬️",
        titulo: "O conjunto eólico é chamado aerogerador",
        texto:
            "O vento gira as pás e o movimento é transferido ao gerador.",
        destaque:
            "Energia eólica → mecânica → elétrica"
    },

    {
        icone: "🔋",
        titulo: "Pilhas e baterias produzem corrente contínua",
        texto:
            "A polaridade permanece definida entre os terminais positivo e negativo.",
        destaque:
            "Saída comum: CC"
    },

    {
        icone: "⚡",
        titulo: "O alternador produz tensão alternada",
        texto:
            "A polaridade da tensão gerada varia conforme o movimento relativo entre a bobina e o campo magnético.",
        destaque:
            "Saída comum: CA"
    }
];


const iconeCuriosidade =
obterElemento("icone-curiosidade");

const numeroCuriosidade =
obterElemento("numero-curiosidade");

const tituloCuriosidade =
obterElemento("titulo-curiosidade");

const textoCuriosidade =
obterElemento("texto-curiosidade");

const destaqueCuriosidade =
obterElemento("destaque-curiosidade");

const indicadoresCuriosidade =
obterElemento("indicadores-curiosidade");

const botaoCuriosidadeAnterior =
obterElemento("curiosidade-anterior");

const botaoProximaCuriosidade =
obterElemento("proxima-curiosidade");


let indiceCuriosidade = 0;


/**
 * Cria os indicadores do carrossel.
 */
function criarIndicadores() {

    if (!indicadoresCuriosidade) {
        return;
    }

    indicadoresCuriosidade.innerHTML = "";


    curiosidades.forEach(
        (
            curiosidade,
            indice
        ) => {

            const indicador =
            document.createElement("button");

            indicador.type =
            "button";

            indicador.className =
            "indicador-curiosidade";

            indicador.setAttribute(
                "aria-label",
                `Mostrar curiosidade ${indice + 1}`
            );


            indicador.addEventListener(
                "click",
                () => {

                    indiceCuriosidade =
                    indice;

                    atualizarCuriosidade();

                }
            );


            indicadoresCuriosidade.appendChild(
                indicador
            );

        }
    );

}


/**
 * Atualiza a curiosidade mostrada.
 */
function atualizarCuriosidade() {

    const curiosidade =
    curiosidades[indiceCuriosidade];


    if (iconeCuriosidade) {
        iconeCuriosidade.textContent =
        curiosidade.icone;
    }


    if (numeroCuriosidade) {

        numeroCuriosidade.textContent =
        `Curiosidade ${indiceCuriosidade + 1} ` +
        `de ${curiosidades.length}`;

    }


    if (tituloCuriosidade) {
        tituloCuriosidade.textContent =
        curiosidade.titulo;
    }


    if (textoCuriosidade) {
        textoCuriosidade.textContent =
        curiosidade.texto;
    }


    if (destaqueCuriosidade) {
        destaqueCuriosidade.textContent =
        curiosidade.destaque;
    }


    document
        .querySelectorAll(
            ".indicador-curiosidade"
        )
        .forEach(
            (
                indicador,
                indice
            ) => {

                indicador.classList.toggle(
                    "ativo",
                    indice === indiceCuriosidade
                );

            }
        );

}


if (botaoCuriosidadeAnterior) {

    botaoCuriosidadeAnterior.addEventListener(
        "click",
        () => {

            indiceCuriosidade =
            (
                indiceCuriosidade -
                1 +
                curiosidades.length
            ) %
            curiosidades.length;

            atualizarCuriosidade();

        }
    );

}


if (botaoProximaCuriosidade) {

    botaoProximaCuriosidade.addEventListener(
        "click",
        () => {

            indiceCuriosidade =
            (
                indiceCuriosidade +
                1
            ) %
            curiosidades.length;

            atualizarCuriosidade();

        }
    );

}


// ======================================================
// DESAFIO FINAL
// ======================================================

const perguntas = [
    {
        pergunta:
            "Qual é a principal função de uma fonte geradora?",

        alternativas: [
            "Apenas armazenar fios",
            "Fornecer tensão elétrica ao circuito",
            "Eliminar todas as cargas elétricas"
        ],

        correta: 1,

        explicacao:
            "A fonte geradora fornece a diferença de potencial necessária ao funcionamento do circuito."
    },

    {
        pergunta:
            "Qual dispositivo gera tensão por ação térmica?",

        alternativas: [
            "Termopar",
            "Alternador",
            "Pilha comum"
        ],

        correta: 0,

        explicacao:
            "O termopar utiliza a junção de dois metais diferentes submetida ao aquecimento."
    },

    {
        pergunta:
            "A célula fotovoltaica transforma qual energia em elétrica?",

        alternativas: [
            "Luminosa",
            "Nuclear",
            "Sonora"
        ],

        correta: 0,

        explicacao:
            "A célula fotovoltaica utiliza a energia da luz."
    },

    {
        pergunta:
            "O efeito piezoelétrico ocorre quando certos cristais sofrem:",

        alternativas: [
            "Compressão ou torção",
            "Somente resfriamento",
            "Contato com água"
        ],

        correta: 0,

        explicacao:
            "A ação mecânica sobre o cristal pode produzir diferença de potencial."
    },

    {
        pergunta:
            "Qual forma de geração é utilizada em dínamos e alternadores?",

        alternativas: [
            "Ação magnética",
            "Ação química",
            "Ação térmica"
        ],

        correta: 0,

        explicacao:
            "Dínamos e alternadores utilizam o princípio da indução magnética."
    },

    {
        pergunta:
            "Qual usina utiliza a água para movimentar uma turbina?",

        alternativas: [
            "Hidrelétrica",
            "Nuclear",
            "Eólica"
        ],

        correta: 0,

        explicacao:
            "A usina hidrelétrica utiliza a energia da água represada."
    },

    {
        pergunta:
            "Na usina eólica, o gerador é movimentado principalmente pelo:",

        alternativas: [
            "Vento",
            "Combustível nuclear",
            "Calor do termopar"
        ],

        correta: 0,

        explicacao:
            "O vento gira as pás do aerogerador."
    },

    {
        pergunta:
            "Qual fonte normalmente fornece corrente contínua?",

        alternativas: [
            "Pilha",
            "Alternador",
            "Rede elétrica residencial"
        ],

        correta: 0,

        explicacao:
            "A pilha possui terminais de polaridade definida e fornece corrente contínua."
    },

    {
        pergunta:
            "O que acontece quando o ímã fica parado em relação à bobina?",

        alternativas: [
            "Não há variação de fluxo e a tensão induzida tende a zero",
            "A tensão aumenta indefinidamente",
            "A bobina se transforma em uma pilha"
        ],

        correta: 0,

        explicacao:
            "A indução depende da variação do fluxo magnético através da bobina."
    },

    {
        pergunta:
            "Na termelétrica, o vapor possui a função de:",

        alternativas: [
            "Girar a turbina",
            "Criar uma reação química na pilha",
            "Produzir luz diretamente"
        ],

        correta: 0,

        explicacao:
            "O vapor movimenta a turbina ligada ao gerador."
    }
];


const perguntaElemento =
obterElemento("pergunta");

const alternativasContainer =
document.querySelector(".alternativas");

const respostaDesafio =
obterElemento("resposta-desafio");


const botaoProxima =
document.createElement("button");

botaoProxima.type =
"button";

botaoProxima.className =
"botao-proxima";

botaoProxima.style.display =
"none";


if (respostaDesafio) {

    respostaDesafio.insertAdjacentElement(
        "afterend",
        botaoProxima
    );

}


let perguntaAtual = 0;

let pontuacao = 0;

let respondida = false;


/**
 * Exibe a pergunta atual.
 */
function mostrarPergunta() {

    if (
        !perguntaElemento ||
        !alternativasContainer ||
        !respostaDesafio
    ) {
        return;
    }


    respondida = false;


    const item =
    perguntas[perguntaAtual];


    perguntaElemento.textContent =
    `${perguntaAtual + 1}. ${item.pergunta}`;


    alternativasContainer.innerHTML =
    "";

    respostaDesafio.textContent =
    "";

    botaoProxima.style.display =
    "none";


    item.alternativas.forEach(
        (
            alternativa,
            indice
        ) => {

            const botao =
            document.createElement("button");

            botao.type =
            "button";

            botao.className =
            "alternativa";

            botao.textContent =
            alternativa;


            botao.addEventListener(
                "click",
                () => {

                    verificarResposta(
                        indice,
                        botao
                    );

                }
            );


            alternativasContainer.appendChild(
                botao
            );

        }
    );

}


/**
 * Corrige a resposta selecionada.
 *
 * @param {number} indiceSelecionado
 * @param {HTMLButtonElement} botaoSelecionado
 */
function verificarResposta(
    indiceSelecionado,
    botaoSelecionado
) {

    if (respondida) {
        return;
    }


    respondida = true;


    const item =
    perguntas[perguntaAtual];


    document
        .querySelectorAll(".alternativa")
        .forEach(
            (
                botao,
                indice
            ) => {

                botao.disabled = true;

                if (indice === item.correta) {

                    botao.classList.add(
                        "correta"
                    );

                }

            }
        );


    if (indiceSelecionado === item.correta) {

        pontuacao++;

        if (respostaDesafio) {

            respostaDesafio.textContent =
            `✅ Resposta correta! ${item.explicacao}`;

        }

    } else {

        botaoSelecionado.classList.add(
            "errada"
        );


        if (respostaDesafio) {

            respostaDesafio.textContent =
            `❌ Resposta incorreta. ${item.explicacao}`;

        }

    }


    botaoProxima.textContent =
    perguntaAtual === perguntas.length - 1
        ? "Ver resultado"
        : "Próxima questão";


    botaoProxima.style.display =
    "inline-block";

}


/**
 * Mostra o resultado final do desafio.
 */
function mostrarResultado() {

    if (
        !perguntaElemento ||
        !alternativasContainer ||
        !respostaDesafio
    ) {
        return;
    }


    perguntaElemento.textContent =
    "Quiz concluído!";


    alternativasContainer.innerHTML =
    "";


    const porcentagem =
    Math.round(
        (
            pontuacao /
            perguntas.length
        ) *
        100
    );


    let mensagem = "";


    if (porcentagem === 100) {

        mensagem =
        "Excelente! Você acertou todas as questões.";

    } else if (porcentagem >= 70) {

        mensagem =
        "Muito bom! Você compreendeu os principais conceitos.";

    } else if (porcentagem >= 50) {

        mensagem =
        "Bom trabalho! Revise as formas de geração e tente novamente.";

    } else {

        mensagem =
        "Continue estudando e explore novamente os simuladores.";

    }


    respostaDesafio.innerHTML =
    `
        Você acertou
        <strong>${pontuacao}</strong>
        de
        <strong>${perguntas.length}</strong>
        questões.

        <br><br>

        ${mensagem}
    `;


    botaoProxima.textContent =
    "Refazer quiz";

    botaoProxima.dataset.modo =
    "refazer";

}


botaoProxima.addEventListener(
    "click",
    () => {

        if (
            botaoProxima.dataset.modo ===
            "refazer"
        ) {

            perguntaAtual = 0;

            pontuacao = 0;

            botaoProxima.dataset.modo =
            "";

            mostrarPergunta();

            return;
        }


        if (
            perguntaAtual <
            perguntas.length - 1
        ) {

            perguntaAtual++;

            mostrarPergunta();

        } else {

            mostrarResultado();

        }

    }
);


// ======================================================
// INICIALIZAÇÃO DO SITE
// ======================================================

atualizarFonte("quimica");

criarIndicadores();

atualizarCuriosidade();

mostrarPergunta();


console.log(
    "Site sobre Fontes Geradoras carregado com sucesso."
);
