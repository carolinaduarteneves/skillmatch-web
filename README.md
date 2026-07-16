# SkillMatch Web

Aplicação web que compara o perfil de um candidato com vagas de tecnologia, calcula o percentual de compatibilidade entre eles e recomenda o que estudar para aumentar as chances de conseguir a vaga.

🔗 **Deploy (GitHub Pages):** Em breve
🎥 **Vídeo de apresentação:** Em breve
📋 **Quadro Kanban (Trello):** Em breve

---

## 📌 O problema que o SkillMatch resolve

Candidatos a vagas de tecnologia costumam ter dificuldade para entender **quão compatíveis** são com uma vaga e **quais habilidades ainda precisam desenvolver**.

Com base nas informações fornecidas pelo candidato, a aplicação:

- compara suas habilidades com os requisitos de cada vaga;
- calcula o percentual de compatibilidade;
- classifica o resultado como alta, média ou baixa compatibilidade;
- destaca a vaga mais compatível;
- mostra as habilidades encontradas e faltantes;
- recomenda quais habilidades devem ser estudadas primeiro.

**Contexto:** este projeto representa a evolução do SkillMatch JS, transformando o motor de análise em uma aplicação web responsiva, acessível e modular. Além da lógica de comparação entre candidato e vagas, o sistema utiliza interface gráfica, persistência de dados e carregamento dinâmico das informações.

---

## 🛠️ Tecnologias Utilizadas

| Área | Tecnologias e técnicas |
|---|---|
| HTML | HTML5 semântico, acessibilidade (`aria-*`, skip link, landmarks) |
| CSS | Flexbox, Mobile First, variáveis CSS, media queries, `clamp()`, `conic-gradient`, pseudo-elementos (`::before`) e transições |
| JavaScript | Classes, herança, callbacks, closures, `map`, `filter`, `reduce`, módulos ES (`import`/`export`) |
| Persistência | `localStorage` |
| Comunicação | `fetch` para carregar o arquivo `vagas.json` |
| Organização | Git, GitHub e Trello |

---

## 🧩 Arquitetura do JavaScript

O código foi dividido em quatro módulos:

```text
main.js   → orquestra o fluxo da aplicação
   │
   ├── dados.js  → carrega as vagas e gerencia o localStorage
   ├── motor.js  → contém as classes e regras de negócio
   └── ui.js     → valida o formulário e renderiza os resultados
```

### Fluxo resumido

```text
1. main.js configura o tema e o formulário.
2. dados.js carrega o arquivo vagas.json com fetch.
3. Cada objeto do JSON é transformado em uma instância de Vaga ou VagaFrontEnd.
4. main.js verifica se existe um perfil salvo no localStorage.
5. ui.js valida os dados enviados pelo formulário.
6. motor.js calcula a compatibilidade de cada vaga.
7. ui.js renderiza o perfil, a melhor vaga, as demais vagas e a recomendação.
```

---

## 🧱 Herança e sobrescrita de método

A classe `VagaFrontEnd` herda da classe `Vaga`:

```js
class VagaFrontEnd extends Vaga
```

Essa herança possui um propósito dentro da regra de negócio. Em vagas de nível júnior, conhecimentos avançados como React e Node.js não devem reduzir a compatibilidade do candidato.

Por isso, `VagaFrontEnd` sobrescreve o método `calcularCompatibilidade()` e ignora essas tecnologias quando o nível da vaga é `"Júnior"`.

---

## 🧠 Decisões de código

### `const` e `let`

O projeto prioriza o uso de `const`. A palavra-chave `let` foi utilizada apenas quando a variável precisa receber outro valor depois de sua criação.

#### `let vagasCarregadas = []`

Essa variável fica no escopo do módulo `main.js` porque precisa ser acessada tanto pela função `iniciar()` quanto pelo callback do formulário.

Ela começa como um array vazio e recebe as vagas somente depois que o `fetch` termina:

```js
let vagasCarregadas = [];
```

Como ocorre uma reatribuição, ela não pode ser declarada com `const`.

#### `let total = 0`

Essa variável fica dentro da função `criarContadorDeAnalises()`:

```js
let total = 0;
```

Ela é preservada por uma closure e incrementada a cada análise. Por esse motivo, também precisa ser declarada com `let`.

Nos demais casos, foi utilizado `const` para evitar reatribuições acidentais.

### CSS sem `!important`

O projeto não utiliza `!important`.

Os estilos foram organizados para evitar conflitos por meio de:

- classes específicas;
- variáveis CSS;
- ordem adequada das regras;
- media queries no final do arquivo;
- sobrescrita natural pela cascata do CSS.

Essa escolha deixa os estilos mais previsíveis e fáceis de manter.

### `min-width: 0` nos itens flex

Alguns itens flex utilizam:

```css
min-width: 0;
```

Por padrão, elementos flex podem se recusar a encolher abaixo do tamanho de seu conteúdo. Em telas pequenas, isso pode provocar rolagem horizontal.

O uso de `min-width: 0` permite que textos, cards e imagens se ajustem corretamente ao espaço disponível.

### Tema claro e escuro

As cores do projeto foram centralizadas em variáveis CSS:

```css
:root {
  --cor-texto: #1e1b2e;
  --cor-fundo: #ffffff;
  --cor-primaria: #6d28d9;
}
```

O tema escuro sobrescreve somente os valores dessas variáveis:

```css
[data-tema="escuro"] {
  --cor-texto: #f1eefc;
  --cor-fundo: #14111f;
}
```

O JavaScript altera o atributo `data-tema` do elemento `<html>` e salva a preferência no `localStorage`.

---

## 🚀 Como Executar

Este projeto utiliza módulos ES (`import`/`export`) e `fetch`. Por isso, ele não funciona abrindo o arquivo diretamente pelo protocolo `file://`.

### Opção 1 — GitHub Pages (recomendado)

Acesse a versão publicada:

🔗 **Deploy:** *(link)*

### Opção 2 — Live Server

1. Clone o repositório

   ```bash
   git clone LINK_DO_REPOSITORIO
   ```

2. Abra o projeto no VS Code.

3. Instale a extensão **Live Server**.

4. Clique em **Open with Live Server**.

---

## 📁 Estrutura de pastas

```text
skillmatch-web/
├── index.html
├── README.md
└── assets/
    ├── styles/
    │   └── index.style.css       # estilos e responsividade mobile-first
    ├── scripts/
    │   ├── main.js               # ponto de entrada e orquestração
    │   ├── motor.js              # classes e regras de negócio
    │   ├── ui.js                 # formulário, validação e renderização
    │   └── dados.js              # fetch e localStorage
    ├── dados/
    │   └── vagas.json            # catálogo de vagas
    └── img/
        ├── logo.png              # logotipo
        └── SkillMatch Web.png    # ilustração principal
```

---

## ✅ Funcionalidades implementadas

- [x] Preenchimento do perfil do candidato
- [x] Validação dos campos do formulário
- [x] Catálogo de vagas carregado por `fetch`
- [x] Transformação dos dados em instâncias de classes
- [x] Cálculo do percentual de compatibilidade
- [x] Identificação das habilidades encontradas
- [x] Identificação das habilidades faltantes
- [x] Classificação em alta, média ou baixa compatibilidade
- [x] Destaque da vaga mais compatível
- [x] Recomendação personalizada de estudo
- [x] Herança entre `Vaga` e `VagaFrontEnd`
- [x] Sobrescrita do método `calcularCompatibilidade`
- [x] Callback no envio do formulário
- [x] Closure para contar as análises da sessão
- [x] Renderização dinâmica com `createElement`, `classList` e `appendChild`
- [x] Tratamento dos estados de carregamento, vazio e erro
- [x] Persistência do perfil no `localStorage`
- [x] Tema claro e escuro persistido no `localStorage`
- [x] Organização em módulos ES
- [x] HTML semântico
- [x] Acessibilidade
- [x] SEO on-page
- [x] Layout responsivo mobile-first com Flexbox

---

## 📚 Conceitos aplicados

Durante o desenvolvimento foram utilizados:

- programação orientada a objetos;
- classes;
- herança;
- sobrescrita de métodos;
- closures;
- callbacks;
- Promises;
- `async`/`await`;
- Fetch API;
- LocalStorage;
- manipulação do DOM;
- eventos;
- expressões regulares;
- módulos ES;
- Flexbox;
- mobile-first;
- acessibilidade;
- SEO.

---

## 🔭 Melhorias futuras

- utilizar `experienciaMeses` como critério de desempate;
- adicionar testes automatizados para as funções de `motor.js`;

---

## 👤 Autoria

Projeto desenvolvido por **Carolina Duarte Neves** como parte do Módulo 01 do curso de Desenvolvimento de Software.