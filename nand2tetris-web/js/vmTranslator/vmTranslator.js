// js/vmTranslator/vmTranslator.js

let labelCounter = 0;

export function translateVM(vmCode) {
  const lines = vmCode.split(/\r?\n/).map(line => line.trim()).filter(line => line && !line.startsWith('//'));
  const output = [];

  for (const line of lines) {
    const [command, arg1, arg2] = line.split(' ');
    output.push(...translateCommand(command, arg1, arg2));
  }

  return output.join('\n');
}

function translateCommand(cmd, arg1, arg2) {
  switch (cmd) {
    case 'add': return ['@SP', 'AM=M-1', 'D=M', 'A=A-1', 'M=M+D'];
    case 'sub': return ['@SP', 'AM=M-1', 'D=M', 'A=A-1', 'M=M-D'];
    case 'neg': return ['@SP', 'A=M-1', 'M=-M'];
    case 'eq':  return compareTemplate('JEQ');
    case 'gt':  return compareTemplate('JGT');
    case 'lt':  return compareTemplate('JLT');
    case 'and': return ['@SP', 'AM=M-1', 'D=M', 'A=A-1', 'M=M&D'];
    case 'or':  return ['@SP', 'AM=M-1', 'D=M', 'A=A-1', 'M=M|D'];
    case 'not': return ['@SP', 'A=M-1', 'M=!M'];
    case 'push':
      if (arg1 === 'constant') {
        return [`@${arg2}`, 'D=A', '@SP', 'A=M', 'M=D', '@SP', 'M=M+1'];
      }
      // Other memory segments will go here later
      break;
    case 'pop':
      // We’ll implement this soon
      break;
    default:
      return [`// Unknown command: ${cmd}`];
  }

  return [`// Unsupported: ${cmd} ${arg1} ${arg2}`];
}

function compareTemplate(jumpType) {
  const labelTrue = `LABEL_TRUE_${labelCounter}`;
  const labelEnd = `LABEL_END_${labelCounter}`;
  labelCounter++;

  return [
    '@SP', 'AM=M-1', 'D=M', 'A=A-1', 'D=M-D',
    `@${labelTrue}`, `D;${jumpType}`,
    '@SP', 'A=M-1', 'M=0',
    `@${labelEnd}`, '0;JMP',
    `(${labelTrue})`, '@SP', 'A=M-1', 'M=-1',
    `(${labelEnd})`
  ];
}

  