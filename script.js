// ============================================================
// Negra Visão | Quilombo Urbano - JavaScript do site
// Funcionalidades:
//   1) Botões do topo rolam até a seção correta
//   2) Menu destaca a seção que está na tela
//   3) Janela "doe / apoie" (abre, fecha com X, clique fora ou ESC)
// O jogo da velha (aplicação JavaScript) fica em jogo/index.html
// e é aberto pelo link "jogar" do menu.
// ============================================================

// ---------- 1) botões que rolam até uma seção ----------
document.querySelectorAll("[data-scroll]").forEach(function (botao) {
    botao.addEventListener("click", function () {
        const destino = document.querySelector(botao.dataset.scroll);
        if (destino) {
            destino.scrollIntoView({ behavior: "smooth" });
        }
    });
});

// ---------- 2) destacar no menu a seção visível ----------
const linksMenu = document.querySelectorAll(".desktop-nav a[href^='#']");
const secoes = [];

linksMenu.forEach(function (link) {
    const secao = document.querySelector(link.getAttribute("href"));
    if (secao) {
        secoes.push({ link: link, secao: secao });
    }
});

function marcarMenu() {
    // referência: o meio da janela. A última seção que já passou dela é a "atual"
    const referencia = window.scrollY + window.innerHeight * 0.5;
    let atual = null;

    secoes.forEach(function (item) {
        if (item.secao.offsetTop <= referencia) {
            atual = item;
        }
    });

    linksMenu.forEach(function (link) {
        link.classList.remove("ativo");
    });
    if (atual) {
        atual.link.classList.add("ativo");
    }
}

window.addEventListener("scroll", marcarMenu);
marcarMenu();

// ---------- 3) janela "doe / apoie" ----------
const modal = document.getElementById("modal-apoio");

function abrirApoio() {
    modal.hidden = false;
}

function fecharApoio() {
    modal.hidden = true;
}

document.querySelectorAll("[data-abrir-apoio]").forEach(function (botao) {
    botao.addEventListener("click", abrirApoio);
});

document.querySelectorAll("[data-fechar-apoio]").forEach(function (botao) {
    botao.addEventListener("click", fecharApoio);
});

// clicar no fundo escuro (fora da caixa) fecha
modal.addEventListener("click", function (evento) {
    if (evento.target === modal) {
        fecharApoio();
    }
});

// tecla ESC fecha
document.addEventListener("keydown", function (evento) {
    if (evento.key === "Escape" && !modal.hidden) {
        fecharApoio();
    }
});
