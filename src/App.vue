<script setup>
import { useJuegoStore } from './stores/juego'
const juego = useJuegoStore()
</script>
<template>
 <div class="app">
  <header class="topbar">
   <RouterLink class="logo" to="/">♫ GOLDENBEATS</RouterLink>
   <nav aria-label="Navegación principal">
    <RouterLink to="/">Inicio</RouterLink>
    <RouterLink to="/concurso">Jugar</RouterLink>
    <RouterLink to="/ranking">Ranking</RouterLink>
   </nav>
  </header>
  <RouterView />
  <footer>GOLDENBEATS · Concurso musical · Vue 3</footer>
 </div>
</template>
