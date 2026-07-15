// ============================================================
// motor.js
// Responsabilidade deste módulo: REGRAS.
// ============================================================

// ============================================================
// CLASSES
// ============================================================

export class Vaga {
  constructor(id, empresa, cargo, requisitos, salario, modalidade) {
    this.id = id;
    this.empresa = empresa;
    this.cargo = cargo;
    this.requisitos = requisitos;
    this.salario = salario;
    this.modalidade = modalidade;
  }

  calcularCompatibilidade(candidato) {
    const habilidadesNormalizadas = candidato.habilidades.map((h) =>
      h.toLowerCase(),
    );

    const encontradas = this.requisitos.filter((r) =>
      habilidadesNormalizadas.includes(r.toLowerCase()),
    );

    const faltantes = this.requisitos.filter(
      (r) => !habilidadesNormalizadas.includes(r.toLowerCase()),
    );

    // protege contra requisitos vazios (0/0 = NaN)
    const percentual =
      this.requisitos.length === 0
        ? 0
        : Math.round((encontradas.length / this.requisitos.length) * 100);

    return {
      percentual: percentual,
      encontradas: encontradas,
      faltantes: faltantes,
    };
  }
}

// VagaFrontEnd herda de Vaga (RF07): vagas júnior não deveriam
// penalizar o candidato por não saber tecnologias avançadas
// (React, Node.js), então sobrescreve o cálculo de compatibilidade
// para ignorar esses requisitos quando o nível for "Júnior".
export class VagaFrontEnd extends Vaga {
  constructor(id, empresa, cargo, requisitos, salario, modalidade, nivel) {
    super(id, empresa, cargo, requisitos, salario, modalidade);
    this.nivel = nivel;
  }

  calcularCompatibilidade(candidato) {
    // comparação normalizada em minúsculas, para não depender de
    // "React" vir escrito exatamente assim no JSON
    const avancados = ["react", "node.js"];

    const requisitosConsiderados =
      this.nivel === "Júnior"
        ? this.requisitos.filter((r) => !avancados.includes(r.toLowerCase()))
        : this.requisitos;

    const habilidadesNormalizadas = candidato.habilidades.map((h) =>
      h.toLowerCase(),
    );

    const encontradas = requisitosConsiderados.filter((r) =>
      habilidadesNormalizadas.includes(r.toLowerCase()),
    );

    const faltantes = requisitosConsiderados.filter(
      (r) => !habilidadesNormalizadas.includes(r.toLowerCase()),
    );

    const percentual =
      requisitosConsiderados.length === 0
        ? 0
        : Math.round(
            (encontradas.length / requisitosConsiderados.length) * 100,
          );

    return {
      percentual: percentual,
      encontradas: encontradas,
      faltantes: faltantes,
    };
  }
}
