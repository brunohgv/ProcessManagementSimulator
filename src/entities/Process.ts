export enum Priority {
  Low = 1,
  BelowNormal = 2,
  Normal = 3,
  AboveNormal = 4,
  High = 5,
}

export enum BoundType {
  IO = 'IO',
  CPU = 'CPU',
}

export enum Status {
  Ready = 'Ready',
  Executing = 'Executing',
  Blocked = 'Blocked',
  Done = 'Done',
}

export interface ProcessContructor {
  pid: number
  name: string
  priority: Priority
  boundType: BoundType
  cpuTime: number
}

export class Process {
  public pid: number
  public name: string
  public priority: Priority
  public boundType: BoundType
  public cpuTime: number
  public status: Status

  constructor ({pid, name, priority, boundType, cpuTime}: ProcessContructor) {
    this.pid = pid
    this.name = name
    this.priority = priority
    this.boundType = boundType
    this.cpuTime = cpuTime
    this.status = Status.Ready
  }
}
