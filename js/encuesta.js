document.addEventListener('DOMContentLoaded', function () {
  const bancoCompleto = [
    {
      pregunta: '¿Cuál es el principal gas de efecto invernadero generado por actividades humanas como la quema de combustibles fósiles?',
      opciones: [
        'Dióxido de carbono (CO₂)',
        'Nitrógeno (N₂)',
        'Argón (Ar)'
      ],
      correcta: 0,
      explicacion: 'El CO₂ liberado por quemar carbón, petróleo y gas natural es el principal impulsor del calentamiento global.'
    },
    {
      pregunta: '¿Qué acción cotidiana ayuda directamente a reducir la huella de carbono personal?',
      opciones: [
        'Dejar luces y cargadores conectados sin uso',
        'Usar transporte público, bicicleta o caminar en trayectos cortos',
        'Quemar hojas secas o residuos en la vía pública'
      ],
      correcta: 1,
      explicacion: 'Caminar, usar bicicleta o moverse en transporte colectivo reduce el consumo de combustibles fósiles por trayecto.'
    },
    {
      pregunta: '¿Por qué es clave conservar bosques, manglares y humedales frente al cambio climático?',
      opciones: [
        'Porque absorben carbono y ayudan a regular el agua y las temperaturas locales',
        'Porque impiden por completo que llueva en todo el país',
        'Porque generan electricidad por sí solos sin redes eléctricas'
      ],
      correcta: 0,
      explicacion: 'Los ecosistemas naturales actúan como sumideros de carbono y protegen frente a sequías, deslizamientos e inundaciones.'
    },
    {
      pregunta: '¿Cuál es la diferencia entre "tiempo meteorológico" y "clima"?',
      opciones: [
        'Significan exactamente lo mismo en cualquier contexto',
        'El tiempo es el estado diario de la atmósfera y el clima es el promedio a largo plazo',
        'El clima solo varía en zonas polares y el tiempo solo en ciudades'
      ],
      correcta: 1,
      explicacion: 'Un día fresco o lluvioso no niega el calentamiento global, que se observa en promedios de décadas.'
    },
    {
      pregunta: 'En políticas y acciones climáticas, ¿a qué se refiere la "adaptación"?',
      opciones: [
        'Ajustar infraestructuras, recursos y hábitos para reducir daños ante impactos climáticos',
        'Dejar de registrar temperaturas para evitar alertas',
        'Reemplazar áreas verdes por pavimento'
      ],
      correcta: 0,
      explicacion: 'La adaptación reduce la vulnerabilidad de las personas y comunidades (por ejemplo, gestionando mejor el agua o drenajes).'
    },
    {
      pregunta: '¿Qué significa la "mitigación" del cambio climático?',
      opciones: [
        'Reducir o evitar las emisiones de gases de efecto invernadero que llegan a la atmósfera',
        'Aumentar el uso de combustibles fósiles en invierno',
        'Construir muros más altos sin cambiar las emisiones'
      ],
      correcta: 0,
      explicacion: 'La mitigación ataca la causa del problema reduciendo emisiones, por ejemplo mediante energías limpias y eficiencia energética.'
    },
    {
      pregunta: '¿Cuál de estas fuentes de energía se considera renovable y de bajas emisiones?',
      opciones: [
        'Energía solar y eólica',
        'Carbón mineral',
        'Diésel y gasolina'
      ],
      correcta: 0,
      explicacion: 'La energía solar y la eólica aprovechan recursos naturales inagotables sin emitir CO₂ durante su generación.'
    },
    {
      pregunta: '¿Qué impacto tiene el desperdicio de alimentos en el cambio climático?',
      opciones: [
        'Ninguno, porque la comida se descompone sin generar gases',
        'Genera emisiones en su producción, transporte y al descomponerse como metano en vertederos',
        'Ayuda a enfriar los rellenos sanitarios'
      ],
      correcta: 1,
      explicacion: 'Al tirar comida se desperdician recursos usados al producirla y se libera metano (CH₄), un gas con alto potencial de calentamiento.'
    },
    {
      pregunta: '¿Qué fenómeno ocurre en los océanos al absorber gran parte del exceso de CO₂ atmosférico?',
      opciones: [
        'Acidificación de los océanos, afectando corales y vida marina',
        'El agua del mar se vuelve dulce',
        'Desaparecen por completo las mareas'
      ],
      correcta: 0,
      explicacion: 'El exceso de CO₂ disuelto altera el pH del agua marina y debilita los esqueletos de corales, moluscos y otros organismos.'
    },
    {
      pregunta: '¿Cuál es el objetivo principal del Acuerdo de París sobre el cambio climático?',
      opciones: [
        'Limitar el aumento de la temperatura media mundial muy por debajo de 2 °C, esforzándose por no superar 1,5 °C',
        'Prohibir el uso de paneles solares en zonas urbanas',
        'Eliminar los parques nacionales para ampliar carreteras'
      ],
      correcta: 0,
      explicacion: 'El Acuerdo de París busca frenar el calentamiento global reduciendo emisiones y fortaleciendo la resiliencia climática de los países.'
    },
    {
      pregunta: '¿Qué es la "huella de carbono" de una persona o actividad?',
      opciones: [
        'La cantidad total de gases de efecto invernadero emitidos directa o indirectamente por sus acciones',
        'La marca física que dejan los zapatos en tierra húmeda',
        'El consumo mensual de agua potable medido en litros'
      ],
      correcta: 0,
      explicacion: 'Se mide generalmente en kilogramos o toneladas de CO₂ equivalente (CO₂e) para evaluar el impacto climático.'
    },
    {
      pregunta: '¿Cuál de estas prácticas de consumo ayuda a disminuir emisiones en el hogar?',
      opciones: [
        'Aplicar las 3R (reducir, reutilizar y reciclar) y reparar objetos antes de desecharlos',
        'Comprar productos de un solo uso todos los días',
        'Mantener el aire acondicionado al máximo con las ventanas abiertas'
      ],
      correcta: 0,
      explicacion: 'Reducir el consumo innecesario y alargar la vida útil de los objetos disminuye la energía usada en fabricar productos nuevos.'
    }
  ];

  const CANTIDAD_POR_RONDA = 6;

  const formEncuesta = document.querySelector('#form-encuesta');
  const contadorPregunta = document.querySelector('#contador-pregunta');
  const puntajeActualEl = document.querySelector('#puntaje-actual');
  const textoPregunta = document.querySelector('#texto-pregunta');
  const opcionesContenedor = document.querySelector('#opciones-pregunta');
  const retroalimentacionEl = document.querySelector('#retroalimentacion');
  const btnResponder = document.querySelector('#btn-responder');
  const btnSiguiente = document.querySelector('#btn-siguiente-pregunta');
  const resumenEncuesta = document.querySelector('#resumen-encuesta');
  const metricaPuntaje = document.querySelector('#metrica-puntaje');
  const mensajeNivel = document.querySelector('#mensaje-nivel');
  const btnReiniciar = document.querySelector('#btn-reiniciar-encuesta');

  if (!formEncuesta || bancoCompleto.length === 0) return;

  let preguntasRonda = [];
  let indiceActual = 0;
  let puntos = 0;
  let respondida = false;

  function prepararNuevaRonda() {
    const copia = [...bancoCompleto];
    for (let i = copia.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [copia[i], copia[j]] = [copia[j], copia[i]];
    }
    preguntasRonda = copia.slice(0, Math.min(CANTIDAD_POR_RONDA, copia.length));
    indiceActual = 0;
    puntos = 0;
    renderizarPregunta();
  }

  function renderizarPregunta() {
    const item = preguntasRonda[indiceActual];
    respondida = false;

    contadorPregunta.textContent = `Pregunta ${indiceActual + 1} de ${preguntasRonda.length}`;
    puntajeActualEl.textContent = `Puntos: ${puntos}`;
    textoPregunta.textContent = item.pregunta;

    retroalimentacionEl.textContent = '';
    retroalimentacionEl.className = 'retroalimentacion hidden';

    btnResponder.classList.remove('hidden');
    btnSiguiente.classList.add('hidden');
    resumenEncuesta.classList.add('hidden');
    formEncuesta.classList.remove('hidden');

    opcionesContenedor.innerHTML = '';

    item.opciones.forEach((textoOpcion, idx) => {
      const idOpcion = `preg-${indiceActual}-op-${idx}`;

      const label = document.createElement('label');
      label.className = 'opcion-item';
      label.setAttribute('for', idOpcion);

      const radio = document.createElement('input');
      radio.type = 'radio';
      radio.name = 'respuesta-actual';
      radio.id = idOpcion;
      radio.value = String(idx);

      const span = document.createElement('span');
      span.textContent = textoOpcion;

      label.appendChild(radio);
      label.appendChild(span);
      opcionesContenedor.appendChild(label);
    });
  }

  function mostrarResumenFinal() {
    formEncuesta.classList.add('hidden');
    resumenEncuesta.classList.remove('hidden');

    metricaPuntaje.textContent = `${puntos} / ${preguntasRonda.length} respuestas correctas`;

    const porcentaje = (puntos / preguntasRonda.length) * 100;
    if (porcentaje >= 80) {
      mensajeNivel.textContent = 'Muy buen dominio. Tienes claros los conceptos clave y acciones frente al cambio climático.';
    } else if (porcentaje >= 50) {
      mensajeNivel.textContent = 'Buen avance. Conoces varias bases importantes y puedes seguir reforzando otros puntos.';
    } else {
      mensajeNivel.textContent = 'Buen comienzo. Revisa las explicaciones y vuelve a intentarlo con nuevas preguntas.';
    }
  }

  formEncuesta.addEventListener('submit', function (evento) {
    evento.preventDefault();
    if (respondida) return;

    const seleccionada = formEncuesta.querySelector('input[name="respuesta-actual"]:checked');
    if (!seleccionada) {
      retroalimentacionEl.textContent = 'Selecciona una opción antes de comprobar tu respuesta.';
      retroalimentacionEl.className = 'retroalimentacion incorrecta';
      return;
    }

    const elegidaIdx = Number(seleccionada.value);
    const item = preguntasRonda[indiceActual];
    respondida = true;

    formEncuesta.querySelectorAll('input[name="respuesta-actual"]').forEach((input) => {
      input.disabled = true;
    });

    retroalimentacionEl.classList.remove('hidden');

    if (elegidaIdx === item.correcta) {
      puntos++;
      puntajeActualEl.textContent = `Puntos: ${puntos}`;
      retroalimentacionEl.classList.add('correcta');
      retroalimentacionEl.innerHTML = `<strong>Correcto.</strong> ${item.explicacion}`;
    } else {
      retroalimentacionEl.classList.add('incorrecta');
      retroalimentacionEl.innerHTML = `<strong>Respuesta correcta:</strong> ${item.opciones[item.correcta]}.<br>${item.explicacion}`;
    }

    btnResponder.classList.add('hidden');
    btnSiguiente.textContent = indiceActual < preguntasRonda.length - 1
      ? 'Siguiente pregunta'
      : 'Ver resultado final';
    btnSiguiente.classList.remove('hidden');
  });

  btnSiguiente.addEventListener('click', function () {
    if (indiceActual < preguntasRonda.length - 1) {
      indiceActual++;
      renderizarPregunta();
    } else {
      mostrarResumenFinal();
    }
  });

  btnReiniciar.addEventListener('click', prepararNuevaRonda);

  prepararNuevaRonda();
});
