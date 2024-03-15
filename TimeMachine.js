import { Worker, isMainThread, parentPort, workerData } from 'node:worker_threads'

export function TimeMachine(callback, args, time) {
  return new Promise((resolve, reject) => {
    let timer = null
    const worker = new Worker(import.meta.url.replace('file://', ''), {
      workerData: {
        task: `(${callback.toString()})(workerData.payload)`,
        payload: args
      }
    })
    function clearTimer() {
      clearTimeout(timer)
      timer = null
      console.log('Timer cleared.');
    }
    function startTimeCounter() {
      console.time('Duration')
      timer = setTimeout(() => {
        terminateWorker(new Error('Time exeded.'))
      }, time)
    }
    function terminateWorker(error, data) {
      worker.terminate().then(() => {
        console.timeEnd('Duration')
        clearTimer()
        if (error) {
          reject(error)
        }
        else {
          resolve(data)
        }
      })
      worker.on('exit', (data) => {
        if (timer) clearTimer()
      })
      worker.on('error', (error) => {
        if (timer) clearTimer()
      })
    }
    worker.on('online', startTimeCounter)
    worker.on('message', (data) => {
      terminateWorker(null, data)
    })
  })
}

if(!isMainThread) {
  try {
    const response = eval(workerData.task)
    parentPort.postMessage(response)
  }
  catch(error) {
    console.log('workerError: ', error)
  }
}