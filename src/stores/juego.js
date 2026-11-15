import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { preguntas } from '../data/preguntas'
const KEY = 'goldenbeats-ranking-v2'
const mezclar = lista => [...lista].sort(() => Math.random() - .5)
// Fisher–Yates: mezcla uniforme, sin alterar los datos originales
function barajar(lista) {
 const copia = [...lista]
 for (let i = copia.length - 1; i > 0; i--) {
  const j = Math.floor(Math.random() * (i + 1))
  ;[copia[i], copia[j]] = [copia[j], copia[i]]
 }
 return copia
}
function leerRanking() {
 try {
  const datos = JSON.parse(localStorage.getItem(KEY) || '[]')
  return Array.isArray(datos) ? datos : []
 } catch { return [] }
}
export const useJuegoStore = defineStore('juego', () => {
 const nombre = ref('')
 const preguntasJuego = ref([])
 const indice = ref(0)
 const puntos = ref(0)
 const aciertos = ref(0)
 const seleccionada = ref(null)
 const estado = ref('sin-empezar')
 const escuchaTotal = ref(0)
 const ranking = ref(leerRanking())
 const ultimoId = ref(null)
 const actual = computed(() => preguntasJuego.value[indice.value] || null)
 const precision = computed(() => preguntasJuego.value.length ? Math.round(aciertos.value / preguntasJuego.value.length * 100) : 0)
 const posicion = computed(() => ranking.value.findIndex(x => x.id === ultimoId.value) + 1)
 function comenzar(nuevoNombre) {
  const limpio = nuevoNombre.trim().slice(0, 30)
  if (!limpio) return false
  nombre.value = limpio
  preguntasJuego.value = barajar(preguntas).slice(0, 10).map(p => ({...p, respuestas: barajar(p.respuestas)}))
  indice.value = 0; puntos.value = 0; aciertos.value = 0
  seleccionada.value = null; estado.value = 'jugando'; escuchaTotal.value = 0; ultimoId.value = null
  return true
 }
 function registrarEscucha(segundos) { escuchaTotal.value += segundos }
 function responder(valor) {
  if (estado.value !== 'jugando' || seleccionada.value !== null) return
  seleccionada.value = valor
  if (valor === actual.value.correcta) { puntos.value += 10; aciertos.value++ }
  else if (valor !== '__tiempo__') puntos.value -= 5
 }
 function siguiente() {
  if (estado.value !== 'jugando' || seleccionada.value === null) return
  if (indice.value + 1 < preguntasJuego.value.length) { indice.value++; seleccionada.value = null }
  else terminar()
 }
 function terminar() {
  estado.value = 'finalizado'
  const registro = {id: crypto.randomUUID?.() || String(Date.now()), nombre: nombre.value, puntos: puntos.value,
   precision: precision.value, aciertos: aciertos.value, escucha: Number(escuchaTotal.value.toFixed(2)), fecha: new Date().toISOString()}
  ultimoId.value = registro.id
  ranking.value = [...ranking.value, registro].sort((a,b) => b.puntos-a.puntos || a.escucha-b.escucha || new Date(a.fecha)-new Date(b.fecha)).slice(0,10)
  try { localStorage.setItem(KEY, JSON.stringify(ranking.value)) } catch { /* modo privado */ }
 }
 return {nombre,preguntasJuego,indice,puntos,aciertos,seleccionada,estado,actual,precision,posicion,ranking,ultimoId,escuchaTotal,comenzar,registrarEscucha,responder,siguiente}
})
