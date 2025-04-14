
    // export function advance() {
    //     if (currentLineIndex < lines.length) {
    //         const line = lines[currentLineIndex];
    //         if (lines[currentLineIndex] != ""){
    //             console.log("Reading line:", line);
    //             document.getElementById("output").textContent = line;
    //             currentLineIndex++;
    //             return this.parseInstruction(line);  // Allows external function calls to receive the next line
    //         }
    //         else{
    //             currentLineIndex++;
    //         }
            
    //     } else {
    //         console.log("No more lines to read.");
    //         return null; // Indicate that all lines have been read
    //     }
    // }

    // Example: You can call this function anywhere in your JS code
    export function processLinesAutomatically() {
        let line;
        while ((line = this.advance()) !== null) {
            //console.log("Processing:", line);
            //console.log("Type", this.InstructionType())
            // Add logic to process each line as needed
            console.log("Parsed as ", this.parseInstruction(line))
        }
    }



    

    export function parseInstruction(instruction) {
            const instructionRegex = /^(?:@([A-Za-z0-9_.$]+)|\(([A-Za-z0-9_.$]+)\)|(?:([A-Za-z]+)=)?([A-Za-z0-9+\-!&|]+)(?:;([A-Za-z]+))?)$/;

            const match = instruction.match(instructionRegex);
            
            if (!match) {
                return { error: "Invalid instruction format" };
            }
        
            // Handle A-instruction
            if (match[1]) {
                return { type: "A-INSTRUCTION", value: match[1] };
            }
        
            // Handle Label Declaration
            if (match[2]) {
                return { type: "LABEL", value: match[2] };
            }
        
            // Handle C-instruction
            return {
                type: "C-INSTRUCTION",
                dest: match[3] || null,
                comp: match[4],
                jmp: match[5] || null
            };
        }
        
        // Test cases
        /*console.log(parseInstruction("@100"));       // { type: "A-INSTRUCTION", value: "100" }
        console.log(parseInstruction("@variable"));  // { type: "A-INSTRUCTION", value: "variable" }
        console.log(parseInstruction("(LOOP)"));     // { type: "LABEL", value: "LOOP" }
        console.log(parseInstruction("D=A"));        // { type: "C-INSTRUCTION", dest: "D", comp: "A", jmp: null }
        console.log(parseInstruction("A+1;JMP"));    // { type: "C-INSTRUCTION", dest: null, comp: "A+1", jmp: "JMP" }
        console.log(parseInstruction("D=M+1;JEQ"));  // { type: "C-INSTRUCTION", dest: "D", comp: "M+1", jmp: "JEQ" }
        console.log(parseInstruction("M=0"));        // { type: "C-INSTRUCTION", dest: "M", comp: "0", jmp: null }
        console.log(parseInstruction("0;JMP"));      // { type: "C-INSTRUCTION", dest: null, comp: "0", jmp: "JMP" }
        console.log(parseInstruction("(END)"));      // { type: "LABEL", value: "END" }
        console.log(parseInstruction("INVALID"));    // { error: "Invalid instruction format" }*/
        


    
    




    


