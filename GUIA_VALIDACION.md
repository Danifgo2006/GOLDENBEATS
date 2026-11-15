# Guía de validación — GOLDENBEATS

## Explica el recorrido
1. `main.js` crea Vue, instala Pinia y Vue Router y monta `App.vue`.
2. `App.vue` muestra la barra de navegación y `RouterView`.
3. `LandingView.vue` muestra las normas.
4. `ConcursoView.vue` recoge el nombre, gestiona el audio con Howler y el temporizador.
5. `PreguntaCard.vue` recibe la pregunta por `props` y comunica respuestas con `emit`.
6. `juego.js` es la store Pinia compartida: escoge diez preguntas, baraja opciones, calcula puntos y guarda ranking.
7. `RankingView.vue` muestra el top 10 guardado en localStorage.

## Conceptos fundamentales
- `ref(0)`: valor reactivo; en script se cambia con `.value`.
- `computed`: valor derivado reactivo; `actual` obtiene `preguntasJuego[indice]`.
- `v-if`/`v-else`: mostrar condicionalmente; `v-for`: repetir opciones; `:key`: identidad estable.
- `@click`: evento de clic; `:pregunta`: pasar prop; `emit('responder', valor)`: avisar al padre.
- `defineStore`: store de Pinia, comparte estado entre vistas.
- `RouterLink`: navegación; `RouterView`: zona donde se renderiza la ruta.
- `===`: igualdad estricta; `+=`: suma y asignación; `push`: añade; `slice`: copia segmento; `sort`: ordena.
- `localStorage`: persiste datos en el navegador; `JSON.stringify` y `JSON.parse` convierten objetos a texto y viceversa.
- `Howl`: reproduce archivos; `seek`: salta a un punto; `stop` y `unload`: paran y liberan recursos.
- `setInterval`: cuenta segundos; `clearInterval`: evita temporizadores duplicados.

## Ejercicios de profesor
1. Cambia los puntos por acierto de 10 a 15. ¿En qué archivo y línea de lógica?
2. Cambia la penalización de −5 a −3.
3. Cambia el tiempo de respuesta de 20 a 15 segundos.
4. Explica por qué `indice` empieza en 0 pero mostramos `indice + 1`.
5. ¿Qué pasa si olvidas `:key` en un `v-for`?
6. ¿Por qué mezclamos con Fisher–Yates en vez de ordenar por título?
7. ¿Cómo evitas que el jugador responda dos veces?
8. ¿Por qué el ranking sigue después de recargar la página?
9. ¿Qué diferencia hay entre `props` y `emit`?
10. ¿Por qué Pinia es útil si Ranking y Concurso son vistas diferentes?

## Antes de la entrega
Comprueba npm install, npm run dev, 10 preguntas, reproducción de audio, aciertos/errores/tiempo agotado, resultado, ranking, móvil y npm run build.

**Pendiente real:** conseguir 12 canciones distintas adicionales (solo había ocho audios en el material suministrado).
