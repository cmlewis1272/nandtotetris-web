


//SymbolTable is one of
//interp. key value pairs consisting of Predfined label and variale entries
export const symbolTable = {
    R0: "0",
    R1: "1",
    R2: "2",
    R3: "3",
    R4: "4",
    R5: "5",
    R6: "6",
    R7: "7",
    R8: "8",
    R9: "9",
    R10: "10",
    R11: "11",
    R12: "12",
    R13: "13",
    R14: "14",
    R15: "15",
    SCREEN: "16384",
    KBD: "24576",
    SP: "0",
    ARG: "1",
    THIS: "3",
    THAT: "4",
}
    
    

export function addEntry(symbol, address){
    //adds entry to the symbol table
    symbolTable[symbol] = address;
}

export function containsSymbol(symbol){
    //does symbol exist tin the symbol table
    if (symbol in symbolTable){
        return false;
    }
    else{
        return true;
    }
    
}

export function getAddress(symbol){
    //returns the addrsss associate with sysmbol
    return symbolTable[symbol];
}

    

