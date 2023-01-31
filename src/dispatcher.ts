import { Process, Status } from "./entities/Process";

export class Dispatcher {
  public quantum

  constructor (quantum: number) {
    this.quantum = quantum
  }

  dispatch = (process: Process): void => {
    process.status = Status.Executing
    process.cpuTime = Math.max(process.cpuTime - this.quantum, 0)
    if (process.cpuTime === 0) {
      process.status = Status.Done
    } else {
      process.status = Status.Ready
    }
  }
}