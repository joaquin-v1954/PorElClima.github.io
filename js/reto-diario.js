document.addEventListener("DOMContentLoaded", () => {
  const CATALOGO_RETOS = [
    {
      id: "transporte-1",
      categoria: "transporte",
      texto: "Camina o usa bicicleta en un trayecto corto de hoy en lugar de auto (~0.8 kg CO₂).",
      criterio: "Sugerido para reducir emisiones de movilidad diaria."
    },
    {
      id: "energia-1",
      categoria: "energia",
      texto: "Desconecta cargadores y equipos en modo espera antes de dormir (~0.3 kg CO₂).",
      criterio: "Sugerido para disminuir el consumo eléctrico silencioso en casa."
    },
    {
      id: "consumo-1",
      categoria: "consumo",
      texto: "Evita envases desechables hoy llevando tu propia botella o bolsa reutilizable (~0.2 kg CO₂).",
      criterio: "Sugerido para reducir residuos plásticos de un solo uso."
    },
    {
      id: "alimentacion-1",
      categoria: "alimentacion",
      texto: "Elige una comida principal sin carne roja el día de hoy (~1.5 kg CO₂).",
      criterio: "Sugerido porque la alimentación tiene alto impacto en la huella diaria."
    },
    {
      id: "energia-2",
      categoria: "energia",
      texto: "Aprovecha luz natural durante el día y apaga luces en habitaciones vacías (~0.25 kg CO₂).",
      criterio: "Sugerido como hábito rápido de eficiencia energética."
    }
  ];

  const CLAVE_ESTADO = "porelclima_reto_diario_v1";
  const hoyStr = new Date().toDateString();

  // Elementos del DOM
  const elRacha = document.getElementById("racha-texto");
  const elDesc = document.getElementById("reto-descripcion");
  const elExpl = document.getElementById("reto-explicacion");
  const elAcciones = document.getElementById("reto-acciones");
  const elCompletadoMsg = document.getElementById("reto-completado-msg");
  const btnCompletar = document.getElementById("btn-completar");
  const btnCambiar = document.getElementById("btn-cambiar");
  const btnReset = document.getElementById("btn-reset-prefs");
  const inputManual = document.getElementById("input-manual");
  const btnGuardarManual = document.getElementById("btn-guardar-manual");
  const btnVoz = document.getElementById("btn-voz");
  const elEstadoVoz = document.getElementById("estado-voz");

  if (!elDesc) return;

  // Cargar estado guardado o inicializar
  function cargarEstado() {
    const guardado = localStorage.getItem(CLAVE_ESTADO);
    if (guardado) {
      return JSON.parse(guardado);
    }
    return {
      racha: 0,
      ultimaFechaCompletada: null,
      rechazados: [],
      retoActualId: null,
      fechaRetoActual: null
    };
  }

  function guardarEstado(estado) {
    localStorage.setItem(CLAVE_ESTADO, JSON.stringify(estado));
  }

  // Verificar si la racha sigue activa (ayer u hoy)
  function validarRacha(estado) {
    if (!estado.ultimaFechaCompletada) return 0;
    const ultima = new Date(estado.ultimaFechaCompletada);
    const hoy = new Date(hoyStr);
    const diffDias = Math.round((hoy - ultima) / (1000 * 60 * 60 * 24));
    return diffDias <= 1 ? estado.racha : 0;
  }

  // Elegir un reto no rechazado
  function seleccionarReto(estado) {
    let disponibles = CATALOGO_RETOS.filter(r => !estado.rechazados.includes(r.id));
    if (disponibles.length === 0) {
      estado.rechazados = [];
      disponibles = CATALOGO_RETOS;
    }
    const elegido = disponibles[Math.floor(Math.random() * disponibles.length)];
    estado.retoActualId = elegido.id;
    estado.fechaRetoActual = hoyStr;
    guardarEstado(estado);
    return elegido;
  }

  let estado = cargarEstado();
  estado.racha = validarRacha(estado);

  function renderizar() {
    elRacha.textContent = `Racha actual: ${estado.racha} ${estado.racha === 1 ? "día" : "días"}`;

    const yaCompletadoHoy = estado.ultimaFechaCompletada === hoyStr;

    let reto = CATALOGO_RETOS.find(r => r.id === estado.retoActualId);
    if (!reto || estado.fechaRetoActual !== hoyStr) {
      reto = seleccionarReto(estado);
    }

    elDesc.textContent = reto.texto;
    elExpl.textContent = `¿Por qué ves esto? ${reto.criterio}`;

    if (yaCompletadoHoy) {
      elAcciones.hidden = true;
      elCompletadoMsg.hidden = false;
    } else {
      elAcciones.hidden = false;
      elCompletadoMsg.hidden = true;
    }
  }

  function marcarCompletado(textoPersonalizado = null) {
    if (estado.ultimaFechaCompletada !== hoyStr) {
      estado.racha += 1;
      estado.ultimaFechaCompletada = hoyStr;
      guardarEstado(estado);
    }
    if (textoPersonalizado) {
      elCompletadoMsg.innerHTML = `<strong>¡Acción registrada hoy!</strong> "${textoPersonalizado}". Vuelve mañana para mantener tu racha.`;
    }
    renderizar();
  }

  // Eventos de control del usuario
  btnCompletar.addEventListener("click", () => marcarCompletado());

  btnCambiar.addEventListener("click", () => {
    if (estado.retoActualId && !estado.rechazados.includes(estado.retoActualId)) {
      estado.rechazados.push(estado.retoActualId);
    }
    seleccionarReto(estado);
    renderizar();
  });

  btnGuardarManual.addEventListener("click", () => {
    const texto = inputManual.value.trim();
    if (!texto) {
      elEstadoVoz.textContent = "Escribe o dicta una acción antes de confirmar.";
      return;
    }
    marcarCompletado(texto);
    inputManual.value = "";
    elEstadoVoz.textContent = "";
  });

  btnReset.addEventListener("click", () => {
    if (confirm("¿Deseas restablecer tus retos rechazados y preferencias locales?")) {
      estado.rechazados = [];
      seleccionarReto(estado);
      renderizar();
    }
  });

  // Interfaz emergente: Dictado por voz (Web Speech API) con confirmación visual
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (SpeechRecognition) {
    const reconocimiento = new SpeechRecognition();
    reconocimiento.lang = "es-PE";
    reconocimiento.interimResults = false;

    btnVoz.addEventListener("click", () => {
      elEstadoVoz.textContent = "Escuchando... di tu acción ecológica.";
      reconocimiento.start();
    });

    reconocimiento.onresult = (event) => {
      const transcripcion = event.results[0][0].transcript;
      inputManual.value = transcripcion;
      elEstadoVoz.textContent = "Texto transcrito. Revísalo y presiona 'Confirmar y guardar'.";
    };

    reconocimiento.onerror = () => {
      elEstadoVoz.textContent = "No se pudo capturar el audio. Puedes escribir tu acción manualmente.";
    };
  } else {
    btnVoz.hidden = true;
  }

  renderizar();
});