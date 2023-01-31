import { Dispatcher } from './dispatcher';
import { BoundType, Priority, Process } from './entities/Process';
import { logProcessList } from './helpers';
import { RoundRobinScheduler, PriorityRoundRobinScheduler, Scheduler, SchedulerAlgorithm } from './scheduler';

const main = async (): Promise<void> => {
  const p1 = new Process({ pid: 111, name: 'Process 1', priority: Priority.High, boundType: BoundType.CPU, cpuTime: 300 });
  const p2 = new Process({ pid: 112, name: 'Process 2', priority: Priority.Low, boundType: BoundType.CPU, cpuTime: 200 });
  const p3 = new Process({ pid: 113, name: 'Process 3', priority: Priority.Low, boundType: BoundType.CPU, cpuTime: 100 });
  const p4 = new Process({ pid: 114, name: 'Process 4', priority: Priority.High, boundType: BoundType.CPU, cpuTime: 50 });
  const p5 = new Process({ pid: 115, name: 'Process 5', priority: Priority.High, boundType: BoundType.CPU, cpuTime: 200 });
  const p6 = new Process({ pid: 116, name: 'Process 6', priority: Priority.AboveNormal, boundType: BoundType.CPU, cpuTime: 300 });
  const p7 = new Process({ pid: 117, name: 'Process 7', priority: Priority.BelowNormal, boundType: BoundType.CPU, cpuTime: 100 });
  const p8 = new Process({ pid: 118, name: 'Process 8', priority: Priority.Normal, boundType: BoundType.CPU, cpuTime: 50 });
  const p9 = new Process({ pid: 119, name: 'Process 9', priority: Priority.High, boundType: BoundType.CPU, cpuTime: 150 });

  const readyList: Process[] = [p1, p2, p3, p4, p5, p6, p7, p8, p9]

  const roundRobin: SchedulerAlgorithm = new RoundRobinScheduler()
  const priorityRoundRobin: SchedulerAlgorithm = new PriorityRoundRobinScheduler()
  const scheduler: Scheduler = new Scheduler(priorityRoundRobin)
  const dispatcher: Dispatcher = new Dispatcher(10)

  while (readyList.length > 0) {
    const selectedProcess = scheduler.selectProcess(readyList)
    dispatcher.dispatch(selectedProcess)

    await new Promise(f => setTimeout(f, 1000));
    logProcessList(readyList)
  }

}

main()