// ============================================================
// ui.js
// Responsabilidade deste módulo: TELA.
// ============================================================

import { classificarCompatibilidade, analisarVagas } from "./motor.js";

// ============================================================
// RF05 — Melhor vaga + recomendação de estudo
// ============================================================

export function renderizarVagas(vagas, candidato) {
  const container = document.getElementById("lista-resultados");
  container.replaceChildren();

  if (vagas.length === 0) {
    const mensagemVazia = document.createElement("p");
    mensagemVazia.classList.add("lista-resultados-estado-vazio");
    mensagemVazia.textContent = "Nada encontrado.";
    container.appendChild(mensagemVazia);
    return;
  }

  const resultado = analisarVagas(vagas, candidato);
  const melhor = resultado.melhor;

  container.appendChild(criarElementoDestaque(melhor));
  container.appendChild(criarElementoRecomendacao(melhor.faltantes));

  // TODO (feature/rf11-renderizacao-dom): renderizar a grade das outras vagas
}

// ------------------------------------------------------------
// Funções auxiliares (dependências necessárias pro destaque renderizar)
// ------------------------------------------------------------

function criarListaDeEtiquetas(itens, classeExtra = "") {
  const lista = document.createElement("ul");
  lista.classList.add("lista-etiquetas");

  itens.forEach((item) => {
    const li = document.createElement("li");
    li.classList.add("etiqueta");
    li.textContent = item;
    if (classeExtra) {
      li.classList.add(classeExtra);
    }
    lista.appendChild(li);
  });

  return lista;
}

function criarElementoGrafico(percentual, classeExtra = "") {
  const grafico = document.createElement("div");
  grafico.classList.add("grafico-compatibilidade");
  if (classeExtra) {
    grafico.classList.add(classeExtra);
  }

  grafico.style.setProperty("--percentual", percentual);
  grafico.setAttribute("role", "img");
  grafico.setAttribute("aria-label", `${percentual}% de compatibilidade`);

  const valor = document.createElement("span");
  valor.classList.add("grafico-compatibilidade-valor");
  valor.textContent = `${percentual}%`;
  grafico.appendChild(valor);

  return grafico;
}

function criarBlocoHabilidades(tituloTexto, itens, classeEtiqueta) {
  const bloco = document.createElement("div");
  bloco.classList.add("bloco-habilidades");

  const tituloBloco = document.createElement("p");
  tituloBloco.classList.add("bloco-habilidades-titulo");
  tituloBloco.textContent = tituloTexto;
  bloco.appendChild(tituloBloco);

  if (itens.length === 0) {
    const vazio = document.createElement("p");
    vazio.classList.add("bloco-habilidades-vazio");
    vazio.textContent = "Nenhuma.";
    bloco.appendChild(vazio);
  } else {
    bloco.appendChild(criarListaDeEtiquetas(itens, classeEtiqueta));
  }

  return bloco;
}

function criarElementoDestaque(item) {
  const vaga = item.vaga;
  const percentual = item.percentual;
  const encontradas = item.encontradas;
  const faltantes = item.faltantes;

  const article = document.createElement("article");
  article.classList.add("vaga-destaque");

  const selo = document.createElement("span");
  selo.classList.add("vaga-destaque-selo");
  const iconeTrofeu = document.createElement("i");
  iconeTrofeu.classList.add("fa-solid", "fa-trophy");
  iconeTrofeu.setAttribute("aria-hidden", "true");
  selo.appendChild(iconeTrofeu);
  selo.appendChild(document.createTextNode(" Melhor oportunidade"));
  article.appendChild(selo);

  const conteudo = document.createElement("div");
  conteudo.classList.add("vaga-destaque-conteudo");

  const info = document.createElement("div");
  info.classList.add("vaga-destaque-info");

  const empresa = document.createElement("h3");
  empresa.classList.add("vaga-destaque-empresa");
  empresa.textContent = vaga.empresa;
  info.appendChild(empresa);

  const cargo = document.createElement("p");
  cargo.classList.add("vaga-destaque-cargo");
  cargo.textContent = vaga.cargo;
  info.appendChild(cargo);

  info.appendChild(
    criarBlocoHabilidades(
      "Habilidades encontradas",
      encontradas,
      "etiqueta-encontrada",
    ),
  );
  info.appendChild(
    criarBlocoHabilidades(
      "Habilidades faltantes",
      faltantes,
      "etiqueta-faltante",
    ),
  );

  conteudo.appendChild(info);

  const colunaGrafico = document.createElement("div");
  colunaGrafico.classList.add("vaga-destaque-grafico-coluna");
  colunaGrafico.appendChild(
    criarElementoGrafico(percentual, "grafico-compatibilidade-grande"),
  );

  const legenda = document.createElement("p");
  legenda.classList.add("vaga-destaque-legenda");
  legenda.textContent = classificarCompatibilidade(percentual);
  colunaGrafico.appendChild(legenda);

  conteudo.appendChild(colunaGrafico);
  article.appendChild(conteudo);

  return article;
}

function criarElementoRecomendacao(faltantes) {
  const texto =
    faltantes.length === 0
      ? "Você já possui todas as habilidades exigidas pela vaga mais compatível."
      : "Para aumentar sua compatibilidade, priorize estudar:";

  const div = document.createElement("div");
  div.classList.add("recomendacao-estudo");

  const icone = document.createElement("i");
  icone.classList.add("recomendacao-estudo-icone", "fa-solid", "fa-book-open");
  icone.setAttribute("aria-hidden", "true");
  div.appendChild(icone);

  const conteudo = document.createElement("div");
  conteudo.classList.add("recomendacao-estudo-conteudo");

  const titulo = document.createElement("h3");
  titulo.classList.add("recomendacao-estudo-titulo");
  titulo.textContent = "Recomendação de estudo";
  conteudo.appendChild(titulo);

  const paragrafo = document.createElement("p");
  paragrafo.classList.add("recomendacao-estudo-texto");
  paragrafo.textContent = texto;
  conteudo.appendChild(paragrafo);

  const listaTags = criarListaDeEtiquetas(faltantes);
  listaTags.classList.add("recomendacao-estudo-tags");
  conteudo.appendChild(listaTags);

  div.appendChild(conteudo);

  return div;
}
