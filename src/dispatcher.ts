import { Process, Status } from "./entities/Process";
import { logProcess } from "./helpers";

export class Dispatcher {
  public quantum

  constructor (quantum: number) {
    this.quantum = quantum
  }

  dispatch = (process: Process): void => {
    console.log('Dispatching process:')
    logProcess(process)

    process.status = Status.Executing
    process.cpuTime = Math.max(process.cpuTime - this.quantum, 0)

    console.log('Process Dispatched:')
    logProcess(process)

    if (process.cpuTime === 0) {
      process.status = Status.Done
    } else {
      process.status = Status.Ready
    }
  }
}