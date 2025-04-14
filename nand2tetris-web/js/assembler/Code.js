




export function getDest(d){


    if (d == null){
        return "000"
    }
    else if (d == "M"){
        return "001"
    }
    else if (d == "D"){
        return "010"
    }
    else if (d == "DM"){
        return "011"
    }
    else if (d == "A"){
        return "100"
    }
    else if (d == "AM"){
        return "101"
    }
    else if (d == "AD"){
        return "110"
    }
    else if (d == "ADM"){
        return "111"
    }
}




//CInstruction -> String
//Produce binary rep  of CInstruction

export function getComp(c){
    if (c == "0"){
        return "0101010"
    }
    else if (c == "1"){
        return "0111111"
    }
    else if (c == "-1"){
        return "0111010"
    }
    else if (c == "D"){
        return "0001100"
    }
    else if (c == "A"){
        return "0110000"
    }
    else if (c == "M"){
        return "1110000"
    }
    else if (c == "!D"){
        return "0001101"
    }
    else if (c == "!A"){
        return "0110001"
    }
    else if (c == "!M"){
        return "1110001"
    }
    else if (c == "-D"){
        return "0001111"
    }
    else if (c == "-A"){
        return "0110011"
    }
    else if (c == "-M"){
        return "1110011"
    }
    else if (c == "D+1"){
        return "0011111"
    }
    else if (c == "A+1"){
        return "0110111"
    }
    else if (c == "M+1"){
        return "1110111"
    }
    else if (c == "D-1"){
        return "0001110"
    }
    else if (c == "A-1"){
        return "0110010"
    }
    else if (c == "M-1"){
        return "1110010"
    }
    else if (c == "D+A"){
        return "0000010"
    }
    else if (c == "D+M"){
        return "1000010"
    }
    else if (c == "D-A"){
        return "0010011"
    }
    else if (c == "D-M"){
        return "1010011"
    }
    else if (c == "A-D"){
        return "0000111"
    }
    else if (c == "M-D"){
        return "1000111"
    }
    else if (c == "D&A"){
        return "0000000"
    }
    else if (c == "D&M"){
        return "1000000"
    }
    else if (c == "D|A" ){
        return "0010101"
    }
    else if (c == "D|M"){
        return "1010101"
    }
}





export function getJump(j){
    if (j == null){
        return "000"
    }
    else if (j == "JGT"){
        return "001"
    }
    else if (j == "JEQ"){
        return "010"
    }
    else if (j == "JGE"){
        return "011"
    }
    else if (j == "JLT"){
        return "100"
    }
    else if (j == "JNE"){
        return "101"
    }
    else if (j == "JLE"){
        return "110"
    }
    else if (j == "JMP"){
        return "111"
    }
    

}
