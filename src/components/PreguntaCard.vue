<script setup>
defineProps({pregunta:{type:Object,required:true}, seleccionada:{type:String,default:null}, numero:{type:Number,required:true}, total:{type:Number,required:true}, puntos:{type:Number,required:true}, tiempo:{type:Number,required:true}, reproduciendo:{type:Boolean,default:false}})
const emit = defineEmits(['responder','siguiente','reproducir'])
</script>
<template>
 <div class="quiz-card">
  <div class="quiz-meta"><span>Pregunta {{ numero }} de {{ total }}</span><strong>{{ puntos }} puntos</strong></div>
  <div class="progress"><div :style="{width: `${(numero-1)/total*100}%`}"></div></div>
  <div class="disc">♫</div>
  <p class="eyebrow">{{ pregunta.genero }}</p>
  <h2>{{ pregunta.pregunta }}</h2>
  <button class="listen" type="button" :disabled="seleccionada !== null" @click="emit('reproducir')">{{ reproduciendo ? '♫ Reproduciendo…' : '▶ Repetir fragmento' }}</button>
  <p class="hint">Tiempo para responder: {{ tiempo }} s</p>
  <div class="options">
   <button v-for="(respuesta,i) in pregunta.respuestas" :key="respuesta" :disabled="seleccionada !== null" :class="{correct: seleccionada !== null && respuesta === pregunta.correcta, wrong: seleccionada === respuesta && respuesta !== pregunta.correcta}" @click="emit('responder',respuesta)"><span>{{ String.fromCharCode(65+i) }}</span>{{ respuesta }}</button>
  </div>
  <div v-if="seleccionada !== null" class="feedback" aria-live="polite">
   <strong v-if="seleccionada === pregunta.correcta">✓ ¡Correcto! +10 puntos</strong>
   <strong v-else-if="seleccionada === '__tiempo__'">⌛ Se acabó el tiempo. +0 puntos</strong>
   <strong v-else>✕ Respuesta incorrecta. −5 puntos</strong>
   <p>Respuesta correcta: {{ pregunta.correcta }}</p>
   <button class="btn" @click="emit('siguiente')">{{ numero === total ? 'Ver resultados' : 'Siguiente pregunta →' }}</button>
  </div>
 </div>
</template>
