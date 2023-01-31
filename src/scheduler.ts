import { Process, Status } from "./entities/Process";

export interface SchedulerAlgorithm {
  selectProcess: (processes: Process[]) => Process;
}

export class Scheduler {
  private algorithm: SchedulerAlgorithm

  constructor(algorithm: SchedulerAlgorithm) {
    this.algorithm = algorithm
  }

  selectProcess = (processes: Process[]): Process => {
    return this.algorithm.selectProcess(processes)
  };
}

export class RoundRobinScheduler implements SchedulerAlgorithm {
  selectProcess = (processes: Process[]): Process => {
    if (processes.length === 0) throw new Error('Process list is empty')
    let firstElement: Process
    do {
      firstElement = processes.shift() as Process
      if (firstElement.status !== Status.Done) {
        processes.push(firstElement)
      }
      if (processes.length === 0) break
    } while(firstElement.status !== Status.Ready)
    return firstElement
  }
}

export class PriorityRoundRobinScheduler implements SchedulerAlgorithm {
  selectProcess = (processes: Process[]): Process => {
    if (processes.length === 0) throw new Error('Process list is empty')
    processes.sort((a, b) => a.priority - b.priority)
    const firstElement: Process = processes.shift() as Process
    if (firstElement.status !== Status.Done) {
      processes.push(firstElement)
    }
    return firstElement
  }
}