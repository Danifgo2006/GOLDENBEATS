<script setup>
import { ref, watch, onUnmounted, nextTick } from 'vue'
import { useJuegoStore } from '../stores/juego'
import PreguntaCard from '../components/PreguntaCard.vue'
import { Howl } from 'howler'
const juego = useJuegoStore()
const nombreInput = ref('')
const tiempo = ref(20)
const reproduciendo = ref(false)
const error = ref('')
let intervalo = null
let sonido = null
let audioTimeout = null
let inicioAudio = 0
let audioAcumulado = 0
let sesion = 0
function detener() {
 if (audioTimeout) clearTimeout(audioTimeout)
 audioTimeout = null
 if (sonido) { sonido.stop(); sonido.unload(); sonido = null }
 if (inicioAudio) { audioAcumulado += (performance.now() - inicioAudio)/1000; inicioAudio = 0 }
 reproduciendo.value = false
}
function limpiar() { sesion++; detener(); if(intervalo) clearInterval(intervalo); intervalo=null }
function reproducir() {
 if (!juego.actual || juego.seleccionada !== null) return
 detener()
 const turno = sesion
 const ruta = juego.actual.archivo
 sonido = new Howl({src:[ruta],html5:true,onloaderror:()=>{if(turno===sesion) error.value='No se ha podido cargar el audio.'},onplay:()=>{
  if (turno !== sesion) return
  const duracion = sonido?.duration() || 5
  const inicio = Math.random()*Math.max(0,duracion-5)
  if (inicio > 0) sonido.seek(inicio)
  inicioAudio=performance.now(); reproduciendo.value=true
  audioTimeout=setTimeout(()=>{if(turno===sesion) detener()},Math.min(5000,duracion*1000))
 },onend:()=>{if(turno===sesion) detener()}})
 sonido.play()
}
function preparar() {
 limpiar(); tiempo.value=20; error.value=''; audioAcumulado=0
 nextTick(()=>{ if(juego.estado==='jugando') reproducir() })
 intervalo=setInterval(()=>{if(juego.estado!=='jugando'||juego.seleccionada!==null)return; tiempo.value--; if(tiempo.value<=0) responder('__tiempo__')},1000)
}
function empezar() {if(!juego.comenzar(nombreInput.value)) {error.value='Escribe tu nombre para jugar.';return} preparar()}
function responder(valor) {
 if(juego.seleccionada!==null)return
 detener(); juego.registrarEscucha(audioAcumulado); audioAcumulado=0
 juego.responder(valor)
 if(intervalo)clearInterval(intervalo);intervalo=null
}
function siguiente() {limpiar();juego.siguiente();if(juego.estado==='jugando') preparar()}
watch(()=>juego.estado,estado=>{if(estado!=='jugando')limpiar()})
onUnmounted(limpiar)
</script>
<template>
 <main class="game-area">
  <section v-if="juego.estado==='sin-empezar'" class="welcome-card">
   <div class="disc">♫</div><h1>¡Bienvenido al concurso!</h1>
   <p>Escucha el fragmento de la canción y elige la respuesta correcta.</p>
   <ul class="rules"><li>10 preguntas elegidas al azar</li><li>20 segundos para responder cada una</li><li>+10 acierto · −5 error · 0 si se acaba el tiempo</li></ul>
   <label for="jugador">Tu nombre</label><input id="jugador" v-model="nombreInput" maxlength="30" placeholder="¿Cómo te llamas?" @keyup.enter="empezar"/>
   <p v-if="error" class="error">{{error}}</p><button class="btn" @click="empezar">¡Empezar juego!</button>
  </section>
  <template v-else-if="juego.estado==='jugando'">
   <p class="player">Jugando como <strong>{{juego.nombre}}</strong></p>
   <PreguntaCard :key="juego.indice" :pregunta="juego.actual" :numero="juego.indice+1" :total="juego.preguntasJuego.length" :puntos="juego.puntos" :seleccionada="juego.seleccionada" :tiempo="tiempo" :reproduciendo="reproduciendo" @responder="responder" @siguiente="siguiente" @reproducir="reproducir"/>
   <p v-if="error" class="error">{{error}}</p>
  </template>
  <section v-else class="welcome-card">
   <div class="disc">🏆</div><h1>¡Partida terminada!</h1><p>{{juego.nombre}}, {{juego.precision>=70?'¡excelente trabajo!':'sigue practicando, vas por buen camino.'}}</p>
   <p class="big-score">{{juego.puntos}} <small>puntos</small></p>
   <div class="result-grid"><div><strong>{{juego.aciertos}} / {{juego.preguntasJuego.length}}</strong><span>Aciertos</span></div><div><strong>{{juego.precision}}%</strong><span>Precisión</span></div></div>
   <p v-if="juego.posicion">Has quedado en la posición {{juego.posicion}} del ranking.</p><p v-else>No has entrado en el top 10. ¡Inténtalo otra vez!</p>
   <div class="actions"><button class="btn" @click="empezar">Volver a jugar</button><RouterLink class="btn secondary" to="/ranking">Ver ranking</RouterLink></div>
  </section>
 </main>
</template>
