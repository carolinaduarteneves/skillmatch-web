// ============================================================
// main.js
// Responsabilidade deste módulo: ORQUESTRAR o fluxo da aplicação.
// ============================================================

import { buscarVagas } from "./dados.js";
import { exibirStatus } from "./ui.js";

let vagasCarregadas = [];

async function iniciar() {
  exibirStatus("Carregando vagas…");

  try {
    vagasCarregadas = await buscarVagas();
    exibirStatus("");
  } catch (erro) {
    exibirStatus(
      "Não foi possível carregar as vagas. Tente novamente mais tarde.",
    );
    console.error(erro);
    return;
  }

  console.log("Vagas carregadas:", vagasCarregadas);
}

iniciar();
