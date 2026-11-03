
document.addEventListener("DOMContentLoaded", () => {

  // FILTROS DE EXPLORAR EVENTOS
  const filtros = document.getElementById("filtros");

  if (filtros) {
    filtros.addEventListener("submit", (e) => {
      e.preventDefault();

      const genero = document.getElementById("genero").value;
      const precio = Number(document.getElementById("precio").value || Infinity);
      let count = 0;

      document.querySelectorAll(".evento").forEach((el) => {
        const coincide =
          (!genero || el.dataset.genero === genero) &&
          Number(el.dataset.precio) <= precio;

        el.classList.toggle("d-none", !coincide);

        if (coincide) count++;
      });

      document.getElementById("sin-resultados")
        .classList.toggle("d-none", count !== 0);
    });

    filtros.addEventListener("reset", () => {
      setTimeout(() => {
        document.querySelectorAll(".evento").forEach(el =>
          el.classList.remove("d-none")
        );

        document.getElementById("sin-resultados")
          .classList.add("d-none");
      }, 0);
    });
  }

  // RECOMENDACIONES DE FESTIVALES
  const quiz = document.getElementById("quiz");

  if (quiz) {
    quiz.addEventListener("submit", (e) => {
      e.preventDefault();

      const gusto = document.getElementById("gusto").value;
      const fecha = document.getElementById("disponibilidad").value;
      const presupuesto = Number(
        document.getElementById("presupuesto").value
      );

      document.getElementById("recomendacion").textContent =
        `Te recomendamos buscar eventos de ${gusto}, disponibles: ${fecha}, con presupuesto de hasta $${presupuesto.toLocaleString("es-MX")} MXN. Verifica fechas y precios en sitios oficiales.`;
    });
  }

  // CALCULADORA DE PRESUPUESTO
  const gastos = [...document.querySelectorAll(".gasto")];
  const form = document.getElementById("presupuesto-form");

  if (gastos.length && form) {
    let presupuesto = 0;

    const money = n =>
      n.toLocaleString("es-MX", {
        style: "currency",
        currency: "MXN"
      });

    const calcular = () => {
      const gastado = gastos.reduce(
        (s, x) => s + (Number(x.value) || 0), 0
      );

      document.getElementById("total-presupuesto").textContent =
        money(presupuesto);

      document.getElementById("total-gastado").textContent =
        money(gastado);

      document.getElementById("restante").textContent =
        money(presupuesto - gastado);

      document.getElementById("suma-gastos").textContent =
        money(gastado);

      document.getElementById("aviso-presupuesto").textContent =
        presupuesto && gastado > presupuesto
          ? "¡Atención! Tus gastos superan el presupuesto."
          : "Tus gastos están dentro del presupuesto registrado.";
    };

    gastos.forEach(x =>
      x.addEventListener("input", calcular)
    );

    form.addEventListener("submit", (e) => {
      e.preventDefault();

      presupuesto = Number(
        document.getElementById("presupuesto-total").value
      ) || 0;

      calcular();
    });

    calcular();
  }

});
