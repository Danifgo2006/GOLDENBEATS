<template>
 <main>
  <section class="hero">
   <span class="eyebrow">♫ Adivina la canción</span>
   <h1>¿Cuánto sabes de música?</h1>
   <p>Pon a prueba tus conocimientos musicales. Escucha fragmentos de 5 segundos y adivina la respuesta correcta entre cuatro opciones.</p>
   <div class="actions"><RouterLink class="btn" to="/concurso">▶ Comenzar a jugar</RouterLink><RouterLink class="btn secondary" to="/ranking">🏆 Ver ranking</RouterLink></div>
   <div class="hero-icon">♫</div>
  </section>
  <section class="info-section"><h2>¿Cómo funciona?</h2><p>Un juego para demostrar que conoces tus canciones favoritas.</p>
   <div class="cards"><article class="card"><div class="symbol">♫</div><h3>Escucha</h3><p>Se reproduce un fragmento aleatorio de la canción.</p></article><article class="card"><div class="symbol">◉</div><h3>Adivina</h3><p>Elige la respuesta correcta entre cuatro opciones.</p></article><article class="card"><div class="symbol">🏆</div><h3>Compite</h3><p>Suma puntos y consigue un puesto en el top 10.</p></article></div>
  </section>
  <section class="stat-strip"><div><strong>10</strong><span>preguntas por partida</span></div><div><strong>100</strong><span>puntos máximos</span></div><div><strong>5 s</strong><span>de audio por pregunta</span></div></section>
  <section class="cta"><h2>¿Listo para el desafío?</h2><p>Demuestra que eres un experto musical.</p><RouterLink class="btn" to="/concurso">Empezar ahora</RouterLink></section>
 </main>
</template>
