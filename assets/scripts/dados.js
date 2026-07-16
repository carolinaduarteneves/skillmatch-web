// ============================================================
// dados.js
// Responsabilidade deste módulo: carregar vagas (fetch).
// ============================================================

import { Vaga, VagaFrontEnd } from "./motor.js";

// ============================================================
// RF13 — fetch das vagas
// ============================================================

export async function buscarVagas() {
  const response = await fetch("./assets/dados/vagas.json");

  if (!response.ok) {
    throw new Error("Falha ao carregar as vagas.");
  }

  const dadosBrutos = await response.json();

  const vagasInstanciadas = dadosBrutos.map((vaga) => {
    if (vaga.nivel) {
      return new VagaFrontEnd(
        vaga.id,
        vaga.empresa,
        vaga.cargo,
        vaga.requisitos,
        vaga.salario,
        vaga.modalidade,
        vaga.nivel,
      );
    }

    return new Vaga(
      vaga.id,
      vaga.empresa,
      vaga.cargo,
      vaga.requisitos,
      vaga.salario,
      vaga.modalidade,
    );
  });

  return vagasInstanciadas;
}

// ============================================================
// PARTE 2 — PERSISTÊNCIA DO PERFIL (localStorage, RF14)
// ============================================================

const CHAVE_PERFIL = "perfilCandidato";

export function salvarPerfil(candidato) {
  localStorage.setItem(CHAVE_PERFIL, JSON.stringify(candidato));
}

export function carregarPerfil() {
  const dados = localStorage.getItem(CHAVE_PERFIL);

  if (dados === null) {
    return null;
  }

  // try/catch protege contra dado corrompido: se o texto salvo não
  // for um JSON válido, JSON.parse quebraria a aplicação inteira
  try {
    return JSON.parse(dados);
  } catch (erro) {
    console.error("Perfil salvo inválido:", erro);
    localStorage.removeItem(CHAVE_PERFIL);
    return null;
  }
}

// ============================================================
// PARTE 3 — PERSISTÊNCIA DO TEMA (localStorage)
// ============================================================

const CHAVE_TEMA = "temaSkillMatch";

export function salvarTema(tema) {
  localStorage.setItem(CHAVE_TEMA, tema);
}

export function carregarTema() {
  return localStorage.getItem(CHAVE_TEMA);
}
