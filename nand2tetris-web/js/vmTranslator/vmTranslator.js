// js/vmTranslator/vmTranslator.js

const SEGMENT_BASES = {
  local: 'LCL',
  argument: 'ARG',
  this: 'THIS',
  that: 'THAT',
};

export function translateVM(vmCode) {
  const lines = vmCode.split(/\r?\n/).map(line => line.trim()).filter(line => line && !line.startsWith('//'));
  const output = [];

  for (const line of lines) {
    const tokens = line.split(' ');
    const [command, arg1, arg2] = tokens;
    output.push(`// ${line}`);
    output.push(...translateCommand(command, arg1, arg2));
  }

  return output.join('\n');
}

function translateCommand(cmd, arg1, arg2) {
  switch (cmd) {
    case 'add': return ['@SP', 'AM=M-1', 'D=M', 'A=A-1', 'M=M+D'];
    case 'sub': return ['@SP', 'AM=M-1', 'D=M', 'A=A-1', 'M=M-D'];
    case 'neg': return ['@SP', 'A=M-1', 'M=-M'];
    case 'eq': return compareTemplate('JEQ');
    case 'gt': return compareTemplate('JGT');
    case 'lt': return compareTemplate('JLT');
    case 'and': return ['@SP', 'AM=M-1', 'D=M', 'A=A-1', 'M=M&D'];
    case 'or': return ['@SP', 'AM=M-1', 'D=M', 'A=A-1', 'M=M|D'];
    case 'not': return ['@SP', 'A=M-1', 'M=!M'];

    case 'push':
      return pushCommand(arg1, arg2);
    case 'pop':
      return popCommand(arg1, arg2);

    case 'label': return labelCommand(arg1);
    case 'goto': return gotoCommand(arg1);
    case 'if-goto': return ifGotoCommand(arg1);
    case 'function': return functionCommand(arg1, arg2);


    default:
      return [`// Unknown command: ${cmd}`];
  }
}

function pushCommand(segment, index) {
  switch (segment) {
    case 'constant':
      return [`@${index}`, 'D=A', '@SP', 'A=M', 'M=D', '@SP', 'M=M+1'];
    case 'local':
    case 'argument':
    case 'this':
    case 'that':
      return [
        `@${index}`, 'D=A',
        `@${SEGMENT_BASES[segment]}`, 'A=M+D', 'D=M',
        '@SP', 'A=M', 'M=D',
        '@SP', 'M=M+1'
      ];
    case 'temp':
      return [
        `@${5 + Number(index)}`, 'D=M',
        '@SP', 'A=M', 'M=D',
        '@SP', 'M=M+1'
      ];
    case 'pointer':
      return [
        `@${3 + Number(index)}`, 'D=M',
        '@SP', 'A=M', 'M=D',
        '@SP', 'M=M+1'
      ];
    case 'static':
      return [
        `@Static.${index}`, 'D=M',
        '@SP', 'A=M', 'M=D',
        '@SP', 'M=M+1'
      ];
    default:
      return [`// Unsupported push segment: ${segment}`];
  }
}

function popCommand(segment, index) {
  switch (segment) {
    case 'local':
    case 'argument':
    case 'this':
    case 'that':
      return [
        `@${index}`, 'D=A',
        `@${SEGMENT_BASES[segment]}`, 'D=M+D',
        '@R13', 'M=D',
        '@SP', 'AM=M-1', 'D=M',
        '@R13', 'A=M', 'M=D'
      ];
    case 'temp':
      return [
        '@SP', 'AM=M-1', 'D=M',
        `@${5 + Number(index)}`, 'M=D'
      ];
    case 'pointer':
      return [
        '@SP', 'AM=M-1', 'D=M',
        `@${3 + Number(index)}`, 'M=D'
      ];
    case 'static':
      return [
        '@SP', 'AM=M-1', 'D=M',
        `@Static.${index}`, 'M=D'
      ];

    case 'function': return functionCommand(arg1, arg2);

    default:
      return [`// Unsupported pop segment: ${segment}`];
  }
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

function functionCommand(functionName, numLocals) {
  const count = Number(numLocals);
  const output = [`(${functionName})`];

  for (let i = 0; i < count; i++) {
    output.push(...pushCommand('constant', '0'));
  }

  return output;
}


function labelCommand(label) {
  return [`(${label})`];
}

function gotoCommand(label) {
  return [`@${label}`, '0;JMP'];
}

function ifGotoCommand(label) {
  return [
    '@SP', 'AM=M-1', 'D=M',
    `@${label}`, 'D;JNE'
  ];
}

