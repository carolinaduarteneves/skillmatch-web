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
