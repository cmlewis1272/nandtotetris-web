// js/main.js

import { assemble } from './assembler/assembler.js';
import { translateVM } from './vmTranslator/vmTranslator.js';

// Assembler Elements
const input = document.getElementById('inputCode');
const output = document.getElementById('outputCode');
const fileInput = document.getElementById('fileInput');
const assembleBtn = document.getElementById('assembleBtn');
const downloadBtn = document.getElementById('downloadBtn');
const clearBtn = document.getElementById('clearBtn');

// VM Translator Elements
const vmInput = document.getElementById('vmInput');
const vmOutput = document.getElementById('vmOutput');
const vmFileInput = document.getElementById('vmFileInput');
const translateBtn = document.getElementById('translateBtn');
const sendToAssemblerBtn = document.getElementById('sendToAssemblerBtn');

// ======================= ASSEMBLER HANDLERS ========================

assembleBtn.addEventListener('click', () => {
if (input.value.trim() === '') {
        alert("Please paste text into the textarea.");
        return;
 }
  const asmCode = input.value;
  const hackCode = assemble(asmCode);
  output.value = hackCode;
  downloadBtn.disabled = false;
});

fileInput.addEventListener('change', (e) => {
  const reader = new FileReader();
  reader.onload = () => {
    input.value = reader.result;
  };
  reader.readAsText(e.target.files[0]);
});

downloadBtn.addEventListener('click', () => {
  const blob = new Blob([output.value], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.download = 'output.hack';
  link.href = url;
  link.click();
});

clearBtn.addEventListener('click', () => {
  input.value = '';
  output.value = '';
  downloadBtn.disabled = true;
});

// ======================= VM TRANSLATOR HANDLERS ====================

translateBtn.addEventListener('click', () => {
  const vmCode = vmInput.value;
  const asmCode = translateVM(vmCode);
  vmOutput.value = asmCode;
  sendToAssemblerBtn.disabled = false;
});

vmFileInput.addEventListener('change', (e) => {
  const reader = new FileReader();
  reader.onload = () => {
    vmInput.value = reader.result;
  };
  reader.readAsText(e.target.files[0]);
});

sendToAssemblerBtn.addEventListener('click', () => {
  const asmCode = vmOutput.value;
  input.value = asmCode;
});
