// js/assembler.js
import {parseInstruction} from "./Parser.js";
import { symbolTable, addEntry, containsSymbol, getAddress } from "./SymbolTable.js";
import {getDest, getComp, getJump} from "./Code.js";



export function assemble(asmText) {
    // For now, just return placeholde
    
    
    
    let code = []; //array where code is stored from html form
    let currentLineIndex = 0;
    let lineCount = 0;
    let address = 16;
    let trimmed = "";
    
    //bind the html onclick to an event listen
    //const htmlAssemblerBtn = document.getElementById("assemblerBtn");
    //htmlAssemblerBtn.addEventListener('click', assembler);
    
    //let out = document.getElementById("binaryOutput");
    let entries = [];
    
    
    //**************************Main function***************************************************************/
    //function assembler(){
      //Initialize
      initialize()
      //first pass
      firstPass();
      //second pass
      secondPass();
    //}
    //**********************************************************************************************************/
    
    
    
    
    function initialize(){
      //const textArea = document.getElementById("textInput").value.trim();
      
      code = asmText.split(/\r?\n/); // Split into lines
      currentLineIndex = 0; // Reset index
      console.log("Lines loaded:", code);
      
    }
    
    
    
    
    
    function firstPass(){
    //Read program lines one by one
    let parsedInstruction = {};
    //Focus on labels only
    while (lineCount < code.length) {
      trimmed = code[lineCount].trim();
      if (checkComments(trimmed) == true){
        lineCount++;
        continue;
      }
      parsedInstruction = parseInstruction(code[lineCount])
      if(parsedInstruction["type"] == "LABEL"){
        //adds labels to the symbol table 
        addEntry(parsedInstruction["value"], lineCount);
        //console.log("add:", parsedInstruction["value"], parsedInstruction);
        lineCount++;
      }
      lineCount++;
    }
    console.log(symbolTable);
    
    }
    
    
    
    function secondPass(){
      //Got to beginning of the array
      currentLineIndex = 0;
      let parsedInstruction = {};
      
    
      while (currentLineIndex < code.length) {
        trimmed = code[currentLineIndex].trim();
        if (checkComments(trimmed) == true){
          currentLineIndex++;
          continue;
        }
        parsedInstruction = parseInstruction(trimmed)
    
        //if instruction is an Ainstruction
        if (parsedInstruction["type"] =="A-INSTRUCTION"){
          processAinstruction(parsedInstruction);
        }
        if(parsedInstruction["type"] == "C-INSTRUCTION"){
          processCinstruction(parsedInstruction);
          
        }
        //assemble values into one 16 bit string
        //write the string to the ouput file or browser
        currentLineIndex++;
        }
      }
    
    
    
    //Line -> Boolean
    //Returns true if line is empty space or is a comment
    function checkComments(line){
      //if line is empty or begins with "//"
      if (line == "" || line.startsWith("//")) {
        return true;
      }
      else{
        return false;
      }
    }
    
    
    //Responsible for processing A instructions
    function processAinstruction(AI){
      let binaryRepInstruction = "";
      console.log(AI['value']);
      //if instruction is number follows @ == number address
      if(!isNaN(AI["value"])){
        binaryRepInstruction = decimalToBinary16(AI["value"]);
        writer(binaryRepInstruction);
      } 
      else if(containsSymbol(AI["value"])){
        addEntry(AI["value"], String(address));
        address++; 
        //translet into its binary value
        binaryRepInstruction = decimalToBinary16(symbolTable[AI["value"]]);
        console.log(binaryRepInstruction,AI["value"],symbolTable[AI["value"]]);
        writer(binaryRepInstruction)
      }
      else{
        binaryRepInstruction = decimalToBinary16(symbolTable[AI["value"]]);
        console.log(binaryRepInstruction,AI["value"],symbolTable[AI["value"]] );
        writer(binaryRepInstruction)
      }
    }
    
    
    
    
    
    
    //Responsible for processing C instructions
    function processCinstruction(CI){
    
      let dest = getDest(CI["dest"]);
      let comp = getComp(CI["comp"]);
      let jmp = getJump(CI["jmp"]);
    
      console.log("111"+comp+dest+jmp); 
      writer("111"+comp+dest+jmp)
    }
    
    
    
    
    
    
    function decimalToBinary16(d){
      d = parseInt(d);
      const binary = d.toString(2);
      const paddedBinary = binary.padStart(16, '0');
      return paddedBinary;
    }
    
    
    function writer(result){
      //function outputs to browser or output to file
      const newEntry = result;
      entries.push(newEntry);
      //out.value = entries.join("\n");
      
    }

    return entries.join("\n"); 
    "// Compiled .hack code will appear here\n// Implement assembler logic next!";
  }
  