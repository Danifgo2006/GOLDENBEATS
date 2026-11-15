# GOLDENBEATS — Actividad 3: Concurso musical (DAW / DWEC)

## Ejecutar
1. Abrir esta carpeta en VS Code (donde está `package.json`).
2. `npm install`
3. `npm run dev`
4. Abrir la URL de Vite.

## Arquitectura
- `src/App.vue`: cabecera y `<RouterView>`.
- `src/router/index.js`: rutas Inicio, Concurso y Ranking.
- `src/views/`: las tres páginas.
- `src/components/PreguntaCard.vue`: componente hijo que recibe props y emite eventos.
- `src/stores/juego.js`: Pinia, estado compartido, puntuación, mezcla, ranking persistente.
- `src/data/preguntas.js`: banco de preguntas.
- `public/audio/`: MP3 suministrados con el proyecto.

## IMPORTANTE — LÍMITE DEL MATERIAL DISPONIBLE
El enunciado exige **20 canciones distintas**, pero el ZIP original contiene solo **8 MP3**. Para poder probar el sorteo de 10 preguntas, se incluyen **20 preguntas** que reutilizan esas 8 grabaciones. **Esto NO cumple todavía el requisito de 20 canciones diferentes**. Antes de presentar el proyecto como totalmente ajustado al enunciado, añade 12 archivos de audio con permiso de uso y cambia/añade las preguntas correspondientes. No se han inventado archivos musicales.

## Funcionalidades
- SPA Vue 3, rutas, navbar, componentes padre/hijo, eventos, Pinia y Howler.js.
- 10 preguntas aleatorias de 20 entradas; respuestas mezcladas con Fisher–Yates.
- Fragmento automático de audio de hasta 5 s desde un punto aleatorio del archivo, con repetición manual.
- Tiempo de respuesta de 20 s (decisión de implementación: el enunciado no fija duración de respuesta).
- Acierto +10, error −5, sin responder 0.
- Resultados: puntos, aciertos, precisión, posición.
- Ranking top 10 en localStorage con fecha, precisión, desempate por tiempo de escucha.

## Entrega
El documento `P1-Puntuable.docx` no especifica Moodle, GitHub ni formato de entrega. Confírmalo con el profesor. No incluyas `node_modules` en el ZIP.
