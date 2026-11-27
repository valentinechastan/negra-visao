// Tema do jogo (cores das peças e das casas).
// É carregado em novo_jogo.html e customizar.html.
// As cores escolhidas ficam salvas no localStorage do navegador.

const CHAVE_TEMA = 'tema_cores'
const TEMA_PADRAO = { x: '#2563eb', o: '#ef4444', casa: '#ffffff' }

function carregar_tema() {
    try {
        const salvo = JSON.parse(localStorage.getItem(CHAVE_TEMA))
        if (salvo) {
            return { ...TEMA_PADRAO, ...salvo }
        }
    } catch (erro) {
        // dado inválido: usa o tema padrão
    }
    return { ...TEMA_PADRAO }
}

function salvar_tema(tema) {
    localStorage.setItem(CHAVE_TEMA, JSON.stringify(tema))
}

function aplicar_tema(tema) {
    let estilo = document.getElementById('estilo-tema')

    if (estilo === null) {
        estilo = document.createElement('style')
        estilo.id = 'estilo-tema'
        document.head.appendChild(estilo)
    }

    // :not([class*="casa_"]) evita pintar por cima da animação de vitória/velha
    estilo.textContent = `
        .peca.X { color: ${tema.x}; }
        .peca.O { color: ${tema.o}; }
        .espaco:not([class*="casa_"]) { background-color: ${tema.casa}; }
    `
}

aplicar_tema(carregar_tema())
