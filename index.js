import { TimeMachine } from "./TimeMachine.js";

const object = {
  name: 'Arnuel Gutierrez Menco'
}

const timeMachine = TimeMachine(function(payload) {
  
  for(let i = 0; i < 10000000000; i++){}
  return payload.name

}, object, 1000)


timeMachine
  .then(console.log)
  .catch(console.log)

