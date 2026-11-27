const tabuleiro = document.getElementsByClassName("tabuleiro")[0]
const timer = document.getElementsByClassName("timer")[0]

const placar_obj = document.getElementsByClassName("placar")[0]

const time_jogando_obj = document.getElementsByClassName("time_jogando")[0]
const time_jogando_caracter = time_jogando_obj.children[0].children[0]

let dados_placar_txt = localStorage.getItem('placar_pontos')
let dados_placar;

// placar zerado (usado na primeira vez ou se o dado salvo estiver corrompido)
const placar_zerado = { x: 0, o: 0, velha: 0 }

if(dados_placar_txt === null) {
    dados_placar = { ...placar_zerado }
    salvar_placar();
} else {
    try {
        dados_placar = JSON.parse(dados_placar_txt)
    } catch (erro) {
        dados_placar = { ...placar_zerado }
        salvar_placar();
    }
}

const placar_x = placar_obj.children[0]
const placar_o = placar_obj.children[1]
const placar_velha = placar_obj.children[2]

placar_x.textContent = `X: ${dados_placar.x}`
placar_o.textContent = `O: ${dados_placar.o}`
placar_velha.textContent = `#: ${dados_placar.velha}`

for (let i = 0; i < 9; i++) {
    tabuleiro.innerHTML += `<div class="espaco vazio espaco-${i}"></div>`
}

const times = ["X", "O"]
let time_jogando = null
let btn_continuar = null

const comeco = Math.floor(Math.random()*100) + 1

const inicios_horizontal = [0, 3, 6]
const inicios_vertical = [0,1,2]
const inicios_diagonal_esquerda = [0]
const inicios_diagonal_direita = [2]

const dicionario_direcoes_passos = {
    horizontal: 1,
    vertical: 3,
    diagonal_esquerda: 4,
    diagonal_direita: 2
}

if(comeco > 50) {
    time_jogando = "X"
} else { time_jogando = "O"}

turno_placar()

let timer_id = null;
let jogadas = 0

let ids_highligh = []
let ids_highligh_num = 0

let linhas_vitorias = 0

// ao clicar em uma casa deixar ela selecionada com um "placeholder" da peça do time jogando
// criar uma variavel para guardar o espaço selecionado
// se outro espaço for clicado, tirar o place holder do espaço selecionado anteriormente 
// caso a mesma casa seja clicada 2x, colocar a peça do time jogando e trocar de turno

let vitoria = null

tabuleiro.addEventListener('click', function(event) {

    const espaco_clicado = checar_espaco(event)
    if(espaco_clicado === null) {
        return
    }

    if(jogadas < 1) {
        comecar_contador()
    }

    jogadas++

    if(linhas_vitorias > 0) { return }

    colocar_peca(espaco_clicado)

    const vitorias = checar_vitoria(time_jogando)
    const velha = checar_velha()

    if(vitorias !== null ) {
        for(const index in vitorias) {
            if(vitorias[index] != null) {
                vitoria = vitorias
                linhas_vitorias++
                parar_contador()
            }
        }
    }

    // checa a direção que ganhou
    if(linhas_vitorias < 1 && velha != true) { 
        trocar_times()
        return console.log("ninguem ganhou ainda")
    }

    if (velha === true && linhas_vitorias === 0) {
        zerar_contador()
        highlight_velha()
        atualizar_placar(velha)
        
        setTimeout(()=> {
            btn_continuar = tela_velha()

            btn_continuar.addEventListener('click', function() {
                const tela_velha = document.getElementsByClassName("vitoria")[0]
                tela_velha.remove()
                tirar_highlight()
                limpar_tabuleiro()
                trocar_times()

                jogadas = 0
            })
        }, 1500)

        return
    }

    // animação das linhas que ganharam
    for(let i = 0; i < linhas_vitorias; i++) {
        for(const direcao in vitoria) {
            if(vitoria[direcao] == null) { continue }
            const casa_inicial = vitoria[direcao]
            highlight(casa_inicial[0], direcao)
        }
    }

    zerar_contador()
    atualizar_placar(velha);

    setTimeout(()=> {
        btn_continuar = tela_vitoria();

        btn_continuar.addEventListener('click', function() {
        const tela_vitoria = document.getElementsByClassName("vitoria")[0]
        tela_vitoria.remove()
        tirar_highlight()
        limpar_tabuleiro()
        trocar_times()

        linhas_vitorias--
        jogadas = 0
        })
    }, 1500 )

})

function trocar_times() {
    time_jogando = time_jogando === "X" ? "O" : "X"
    turno_placar()
}

function checar_espaco(event) {
    const peca_clicada = event.target
    if(!peca_clicada.classList.contains("vazio")) {
            return null
        }
    return peca_clicada
}

function colocar_peca(espaco_clicado) {
        let cor_time = null
        time_jogando === "X" ? cor_time = "X" : cor_time = "O"
        espaco_clicado.innerHTML = `<span class="peca ${cor_time}">${time_jogando}</span>`

        // remove o vazio da div para não ficar trocando infinito
        espaco_clicado.classList.remove("vazio")
}

function checar_horizontal(pecas) {

    const index_vitoria = []
    
    inicios_horizontal.forEach(inicio => {
        if(pecas.includes(inicio) && pecas.includes(inicio + 1) && pecas.includes(inicio + 2)) { 
            index_vitoria.push(inicio) 
        }
    });
    
    if(index_vitoria.length === 0) {
        return null
    }

    return index_vitoria

}

function checar_vertical(pecas) {

    const index_vitoria = []

    inicios_vertical.forEach(inicio => {
        if(pecas.includes(inicio) && pecas.includes(inicio + 3) && pecas.includes(inicio + 6)) {
            index_vitoria.push(inicio)
        }
    })

    if(index_vitoria.length === 0) {
        return null
    }
        
    return index_vitoria
}

function checar_diagonal_direita(pecas) {

    const index_vitoria = []
    const inicio = inicios_diagonal_direita[0]

    if(pecas.includes(inicio) && pecas.includes(inicio + 2) && pecas.includes(inicio + 4)) {
        index_vitoria.push(inicio)
        return index_vitoria
    }

    return null

}

function checar_diagonal_esquerda(pecas) {

    const index_vitoria = []
    const inicio = inicios_diagonal_esquerda[0]

    if(pecas.includes(inicio) && pecas.includes(inicio + 4) && pecas.includes(inicio + 8)) {
        index_vitoria.push(inicio)
        return index_vitoria
    }
    
    return null 

}

function checar_velha() {
    const espacos_vazios = tabuleiro.querySelectorAll(".vazio")
    if(espacos_vazios.length <= 0) {
        return true
    }

    return false
}

function checar_vitoria(time_jogando) {

    const pecas = tabuleiro.querySelectorAll(`.${time_jogando}`)
    const pecas_time_jogando = []
    
    pecas.forEach(peca => {
        pecas_time_jogando.push(Number(peca.parentElement.classList[1].split("-")[1]))
    });

    if(pecas.length < 3) {
        return null
    }

    let ganhou = {
        horizontal: null,
        vertical: null,
        diagonal_esquerda: null,
        diagonal_direita: null
    }

    // aqui pega o valo
    ganhou.horizontal = checar_horizontal(pecas_time_jogando)
    ganhou.vertical = checar_vertical(pecas_time_jogando)
    ganhou.diagonal_direita = checar_diagonal_direita(pecas_time_jogando)
    ganhou.diagonal_esquerda = checar_diagonal_esquerda(pecas_time_jogando)

    return ganhou
}

function highlight(casa_inicial, direcao) {
    let casas = []
    let cores = []
    let proxima_cor = 3

    const pasos = dicionario_direcoes_passos[direcao]

    for(let i = 0; i < 3; i++) {
        const casa_atual_obj = document.getElementsByClassName(`espaco-${casa_inicial + (pasos * i)}`)[0]
        casa_atual_obj.classList.add(`casa_vitoria_${i}`)
        casas.push(casa_atual_obj)
    }

    if(direcao === "horizontal") {
        cores = [0,0,0]
    } else {
        cores = [0,0,0]
    }

    ids_highligh.push(setInterval(() => {
        for(let i = 0; i < 3; i++) {
            casas[i].classList.remove("casa_vitoria_0", "casa_vitoria_1", "casa_vitoria_2", "casa_vitoria_3", "casa_vitoria_4")
            casas[i].classList.add(`casa_vitoria_${cores[i]}`)
        }
        
        if(direcao === "horizontal") {
            cores.pop()
            cores.unshift(proxima_cor)
        } else {
            cores.shift()
            cores.push(proxima_cor)
        }

        proxima_cor--

        if(proxima_cor < 0) {
            proxima_cor = 4
        } 


    },180))

}

function highlight_velha(){
    let casas_pares = []
    let casas_impares = []
    
    let acender_pares = false

    for (let i = 0; i < 9; i++) {
        const casa_atual = document.getElementsByClassName(`espaco-${i}`)[0];
        
        if (i % 2 === 0) {
            casas_pares.push(casa_atual);
        } else {
            casas_impares.push(casa_atual);
        }
    }

    ids_highligh.push(setInterval(() => {
        for (let i = 0; i < casas_pares.length; i++) {
            casas_pares[i].classList.remove("casa_velha_0", "casa_velha_1");
        }
        for (let i = 0; i < casas_impares.length; i++) {
            casas_impares[i].classList.remove("casa_velha_0", "casa_velha_1");
        }


        if(acender_pares === true) {
            for (let i = 0; i < casas_pares.length; i++) {
                casas_pares[i].classList.add("casa_velha_0");
            }
            for (let i = 0; i < casas_impares.length; i++) {
                casas_impares[i].classList.add("casa_velha_1");
            }
            acender_pares = false;
        } else {
            for (let i = 0; i < casas_impares.length; i++) {
                casas_impares[i].classList.add("casa_velha_0");
            }
            for (let i = 0; i < casas_pares.length; i++) {
                casas_pares[i].classList.add("casa_velha_1");
            }
            acender_pares = true;
        }

    }, 180))
}

function tirar_highlight() {

    ids_highligh.forEach(id => {
        clearInterval(id)
    });

    const pecas_vitoria = tabuleiro.querySelectorAll(`[class*="vitoria_"]`);
    const pecas_velha = tabuleiro.querySelectorAll(`[class*="casa_velha_"]`);

    pecas_vitoria.forEach(peca => {
        peca.classList.remove("casa_vitoria_0", "casa_vitoria_1", "casa_vitoria_2", "casa_vitoria_3", "casa_vitoria_4")
    });

    pecas_velha.forEach(peca => {
        peca.classList.remove("casa_velha_0", "casa_velha_1")
    });

}

// TIMER

function comecar_contador() {
    let segundos = 0

    timer_id = setInterval(() => {
        segundos += 0.01
        timer.textContent = `${segundos.toFixed(2)}`
    }, 10)

}

function parar_contador() {
    clearInterval(timer_id)
    timer_id = null
}

function zerar_contador() {
    parar_contador()
    timer.textContent = "0.00"
}

// atualizar placar

function atualizar_placar(velha_booleano) {

    // se velha, imprime tela de velha
    if(velha_booleano){
        dados_placar.velha = dados_placar.velha + 1
        placar_velha.textContent = `#: ${dados_placar.velha}`

        salvar_placar()
        return
    }

    // se não... 
    // faz a tela de vitoria do time
    
    if(time_jogando === "X") {
        dados_placar.x = dados_placar.x + 1
        placar_x.textContent = `X: ${dados_placar.x}`  
    } else {
        dados_placar.o = dados_placar.o + 1
        placar_o.textContent = `O: ${dados_placar.o}`
    }

    salvar_placar()

}

function turno_placar() {
    time_jogando_caracter.classList.remove("X", "O")
    time_jogando_caracter.classList.add(`${time_jogando}`) 
    time_jogando_caracter.textContent = `${time_jogando}`
}

// telas

function tela_vitoria() {
    const main_obj = document.querySelector("main")
    const div_vitoria = document.createElement("div")
    div_vitoria.classList.add("vitoria")

    div_vitoria.innerHTML = `
            <h2> Vitoria do time: <span class="peca ${time_jogando}">${time_jogando}</span></h2>
            <button class="continuar">Continuar</button>
    ` 

    main_obj.appendChild(div_vitoria)

    const btn_continuar = div_vitoria.querySelector(".continuar")

    return btn_continuar
}

function tela_velha() {
    const main_obj = document.querySelector("main")
    const div_vitoria = document.createElement("div")
    div_vitoria.classList.add("vitoria")

    div_vitoria.innerHTML = `
            <h2> Deu velha :P</h2>
            <button class="continuar">Continuar</button>
    ` 

    main_obj.appendChild(div_vitoria)

    const btn_continuar = div_vitoria.querySelector(".continuar")

    return btn_continuar
}

function limpar_tabuleiro() {

    const espacos = tabuleiro.querySelectorAll('div.espaco')

    espacos.forEach(espaco => {
        espaco.innerHTML = ""
        espaco.classList.add("vazio")
    })
}

// salvar localStorage

function salvar_placar() {
    const placar_texto = JSON.stringify(dados_placar)
    localStorage.setItem('placar_pontos', placar_texto);
}