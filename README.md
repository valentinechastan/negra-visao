# Negra Visão | Quilombo Urbano

Projeto semestral de **Introdução ao Desenvolvimento Web** (ADS - IFSP Bragança Paulista).

Site institucional sobre o **Quilombo Urbano Negra Visão** (Atibaia/SP), desenvolvido para a curricularização da extensão, com uma aplicação em JavaScript integrada: um **Jogo da Velha**.

- 🔗 **Site publicado (Netlify):** [PREENCHER: https://SEU-SITE.netlify.app]
- 💻 **Repositório (GitHub):** https://github.com/valentinechastan/negra-visao/

## Equipe

| Integrante | Responsabilidade |
|---|---|
| Guilherme Bueno dos Santos | Estrutura HTML e CSS do site |
| Valentine Louise de Chastan Bisanson Santos | Lógica do jogo (vitória, velha, placar) |
| Leonardo dos Santos Bizarri | Timer, localStorage e customização |
| Natalia Geni Felipe Spektor | JavaScript do site e integração |

## O que o projeto tem

### Parte I (a) – Site (HTML + CSS + JavaScript)

- Página inicial com cabeçalho, menu, seção principal, atividades, próximos eventos, redes sociais e rodapé.
- Menu com âncoras para cada seção e link **jogar**, que abre o jogo da velha.
- JavaScript do site (`script.js`):
  - botões do topo que rolam até a seção;
  - menu que destaca a seção visível;
  - janela **doe / apoie** (abre pelos botões; fecha com X, clique fora ou tecla ESC).

### Parte I (b) – Aplicação JavaScript: Jogo da Velha

Acessível pelo link **jogar** do menu (`jogo/index.html`).

- Dois jogadores (X e O), com sorteio de quem começa.
- Detecta vitória (linha, coluna e diagonais) e empate ("velha"), com animação nas casas.
- Cronômetro da partida (começa na primeira jogada).
- Placar de X, O e velhas, salvo no `localStorage` (continua mesmo se fechar a página).
- **Customizar:** escolha da cor do X, do O e das casas, com pré-visualização.
- **Limpar dados:** zera o placar e as cores salvas.

## Tecnologias

HTML5, CSS3 (e SCSS no jogo), JavaScript puro (sem frameworks), Font Awesome (ícones) e `localStorage`.

## Estrutura de pastas

```
.
├── index.html          # página inicial do site
├── style.css           # estilos do site
├── script.js           # JavaScript do site
├── imagens/            # imagens do site
└── jogo/               # aplicação JavaScript (jogo da velha)
    ├── index.html      # menu do jogo (Jogar / Customizar / Limpar dados)
    ├── package.json    # só usado para compilar o SCSS (opcional)
    └── src/
        ├── html/       # novo_jogo.html e customizar.html
        ├── css/        # estilos compilados
        ├── scss/       # estilos de origem (SCSS)
        ├── js/         # jogo.js (lógica) e tema.js (cores)
        └── images/     # fundo do jogo
```

## Como executar

Não precisa instalar nada: o projeto é HTML, CSS e JavaScript puros.

1. Baixe ou clone o repositório:
   ```bash
   git clone [PREENCHER: URL do repositório]
   ```
2. Abra o arquivo `index.html` (da raiz) no navegador (duplo clique), **ou** use a extensão *Live Server* do VS Code (botão direito em `index.html` → *Open with Live Server*).
3. Para jogar, clique em **jogar** no menu do site.

### (Opcional) Editar os estilos do jogo com SCSS

Os estilos do jogo são escritos em SCSS e compilados para CSS. Só é necessário se for alterar os `.scss`:

```bash
cd jogo
npm install
npm run sass
```

## Publicação

O site está publicado na Netlify a partir deste repositório, sem etapa de build:
publish directory = raiz do projeto (`.`) e build command vazio.
