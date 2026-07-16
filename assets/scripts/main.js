// ============================================================
// main.js
// Responsabilidade deste módulo: ORQUESTRAR o fluxo da aplicação.
// ============================================================

import {
  buscarVagas,
  salvarPerfil,
  carregarPerfil,
  salvarTema,
  carregarTema,
} from "./dados.js";
import { criarContadorDeAnalises } from "./motor.js";
import {
  configurarFormulario,
  renderizarVagas,
  exibirStatus,
  aplicarTema,
  configurarBotaoTema,
} from "./ui.js";

const contarAnalise = criarContadorDeAnalises();

let vagasCarregadas = [];

// ------------------------------------------------------------
// Função principal: prepara a aplicação assim que a página carrega
// ------------------------------------------------------------

async function iniciar() {
  const temaSalvo = carregarTema();
  const temaInicial = temaSalvo === "escuro" ? "escuro" : "claro";

  aplicarTema(temaInicial);
  configurarBotaoTema((novoTema) => {
    salvarTema(novoTema);
  });

  // configurarFormulario precisa ser chamado sempre, independente
  // do resultado do fetch abaixo: é o preventDefault() dentro dele
  // que impede o navegador de fazer um submit nativo (recarregando
  // a página com os campos como query string na URL)
  configurarFormulario((candidato) => {
    if (vagasCarregadas.length === 0) {
      exibirStatus(
        "Não foi possível carregar as vagas. Tente novamente mais tarde.",
      );
      return;
    }

    salvarPerfil(candidato);
    renderizarVagas(vagasCarregadas, candidato);
    // console.log intencional: evidencia que o closure de
    // criarContadorDeAnalises mantém estado entre chamadas (RF08)
    console.log(`Análise nº ${contarAnalise()}`);
  });

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

  const perfilSalvo = carregarPerfil();

  if (perfilSalvo) {
    renderizarVagas(vagasCarregadas, perfilSalvo);
    console.log(`Análise nº ${contarAnalise()}`);
  }
}

iniciar();