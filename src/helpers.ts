import { Process } from "./entities/Process";

export const logProcessList = (list: Process[]): void => {
  let text = 'Process List: [\n'
  list.forEach((p: Process) => {
    text += `\t{ pid: ${p.pid}, name: ${p.name}, priority: ${p.priority}, boundType: ${p.boundType}, cpuTime: ${p.cpuTime}, status: ${p.status} }\n`
  })
  text += ']'
  console.log(text)
}