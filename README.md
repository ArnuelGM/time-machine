# TimeMachine

TimeMachine es una función de utilidad para ejecutar una función de retorno de llamada con argumentos especificados dentro de un límite de tiempo dado utilizando hilos de trabajador en Node.js.

## Uso

```JavaScript
import { TimeMachine } from "./TimeMachine.js";

// Objeto de ejemplo
const object = {
  name: 'Arnuel Gutierrez Menco'
}

function ejemploCallback(payload) {

  // Ejemplo de tarea que consume tiempo (bucle for para simular carga)
  for(let i = 0; i < 10000000000; i++){}
  
  // Retorna el nombre del objeto payload
  return payload.name

}

// Creación de una instancia de TimeMachine con una función de retorno de llamada, un objeto y un límite de tiempo
// Límite de tiempo de 1000 milisegundos (1 segundo)
TimeMachine(ejemploCallback, object, 1000) 
  .then(console.log) // Imprime el resultado si la promesa se resuelve correctamente
  .catch(console.log) // Captura y muestra cualquier error si la promesa es rechazada

```