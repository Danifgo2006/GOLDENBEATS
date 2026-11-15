<script setup>
import { useJuegoStore } from '../stores/juego'
const juego = useJuegoStore()
function fecha(iso) {return new Date(iso).toLocaleDateString('es-ES')}
</script>
<template>
 <main class="ranking-page"><div class="disc">🏆</div><h1>Tabla de clasificación</h1><p>Los diez mejores jugadores de GOLDENBEATS.</p>
  <div v-if="!juego.ranking.length" class="welcome-card"><h2>Aún no hay puntuaciones</h2><p>¡Sé el primero en aparecer en el ranking!</p><RouterLink class="btn" to="/concurso">Jugar ahora</RouterLink></div>
  <div v-else class="ranking-list"><article v-for="(jugador,i) in juego.ranking" :key="jugador.id" class="rank-row" :class="{highlight: jugador.id===juego.ultimoId}"><span class="rank-icon">{{i===0?'👑':i===1?'🥈':i===2?'🥉':i+1}}</span><div class="rank-info"><strong>{{jugador.nombre}}</strong><small>{{jugador.precision}}% precisión · {{fecha(jugador.fecha)}} · {{jugador.escucha}} s escuchados</small></div><strong class="rank-score">{{jugador.puntos}} <small>pts</small></strong></article></div>
  <div class="actions"><RouterLink class="btn secondary" to="/">Volver al inicio</RouterLink><RouterLink class="btn" to="/concurso">Jugar ahora</RouterLink></div>
 </main>
</template>
