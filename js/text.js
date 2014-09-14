var convertedText = "";

var inEquation = false;
var inSub = false;
var inAbsolute = false;
var inSuper = false;
var inVector = false;
var inIntegral = false; var respect = false;
var inParentheses = false;
var inDivision = false; var numerator = "";

function isNumber(s) {
    return !(s.match(/^[a-zA-Z]/));
}

function isVariable(s) {

    if (s.length == 1 && s.match(/^[a-zA-Z]/))
        return true;

    switch (s) {
        case "ex": return true;
        case "why": return true;
        case "alpha": return true;
        case "beta": return true;
        case "gamma": return true;
        case "delta": return true;
        case "epsilon": return true;
        case "zeta": return true;
        case "eta": return true;
        case "theta": return true;
        case "iota": return true;
        case "kappa": return true;
        case "lambda": return true;
        case "mu": return true;
    }

    return false;
}

function convertVariable(s) {
    switch (s) {
        case "ex": return "x";
        case "why": return "y";
        case "alpha": return "\\alpha";
        case "beta": return "\\beta";
        case "gamma": return "\\gamma";
        case "delta": return "\\delta";
        case "epsilon": return "\\epsilon";
        case "zeta": return "\\zeta";
        case "eta": return "\\eta";
        case "theta": return "\\theta";
        case "iota": return "\\iota";
        case "kappa": return "\\kappa";
        case "lambda": return "\\lambda";
        case "mu": return "\\mu";
        case "nu": return "\\nu";
        //case "xi": return "\xi";
        case "omicron": return "\\omicron";
        case "pi": return "\\pi";
        case "rho": return "\\rho";
        case "sigma": return "\\sigma";
        case "tau": return "\\tau";
        //case "upsilon": return "\upsilon";
        case "phi": return "\\phi";
        case "chi": return "\\chi";
        case "psi": return "\\psi";
        case "omega": return "\\omega";
    }
    return s;
}

function isOperator(s) {
    switch (s) {
        case "equals": return true;
        case "+": return true;
        case "plus": return true;
        case "added": return true;
        case "-": return true;
        case "minus": return true;
        case "subtracted": return true;
        case "x": return true;
        case "times": return true;
        case "multiplied": return true;
        case "over": return true;
        case "divided": return true;
        case "factorial": return true;
        case "integral": return true;
        case "respect": if (inIntegral) return true;
        case "derivative": return true;
        case ".": return true;
        case "dot": return true;
        case "cross": return true;
        case "absolutevalue": return true;
        case "vector": return true;
        case "power": return true;
        case "sin": return true;
        case "sign": return true;
        case "sine": return true;
        case "cos": return true;
        case "cosine": return true;
        case "tan": return true;
        case "tangent": return true;
        case "sub": return true;
        case "super": return true;
        case "space": return true;
    }
    return false;
}

function convertOperator(s) {
    switch (s) {
        case "equals": return "=";
        case "+": return "+";
        case "plus": return "+";
        case "added": return "+";
        case "-": return "-";
        case "minus": return "-";
        case "subtracted": return "-";
        case "x": return "";                                    // TODO
        case "times": return "";                                // TODO
        case "multiplied": return "";                           // TODO
        case "over":    inDivision = true;
                        return "\\dfrac{"+numerator+"}{";
        case "divided": inDivision = true;
                        return "\\dfrac{"+numerator+"}{";
        case "factorial": return "!";
        case "integral": inIntegral = true; 
                         return "\\int ";
        case "respect": if (inIntegral) respect=true;
                        return "";
        case "derivative": return "";                           // TODO
        case ".": return "\\cdot ";                              // TODO
        case "dot": return "\\cdot ";
        case "cross": return "\\times ";
        case "absolutevalue":   inAbsolute = true;
                                return "\\left|";
        case "vector": inVector = true;
                       return "\\vec{";
        case "sin": return "\\sin ";
        case "sign": return "\\sin ";
        case "sine": return "\\sin ";
        case "cos": return "\\cos ";
        case "cosine": return "\\cos ";
        case "tan": return "\\tan ";
        case "tangent": return "\\tan ";
        case "sub": inSub = true;
                    return "_{";
        case "power": return convertOperator("super");
        case "super": inSuper = true;
                      return "^{";
        case "space": return "~";
    }
    return s;
}

function isCommand(s) {
    switch (s) {
        case "compile": return true;
        case "newline": return true;
        case "newpage": return true;
        case "newequation": return true;
        case "endequation": if (inEquation) return true;
                            else return false;
        case "andequation": if (inEquation) return true;
                            else return false;
        case "italics": return true;
        case "italicized": return true;
        case "bold": return true;
        case "bolded": return true;
        case "open": return true;
        case "opened": return true;
        case "close": return true;
        case "clothes": return true;
        case "closed": return true;
    }
    return false;
}

function convertCommand(s) {

    if (inEquation) {
        switch (s) {
            case "endequation": inEquation = false;
                                return "$";
            case "andequation": inEquation = false;
                                return "$";
        }
     
        if (inAbsolute) {
            switch(s) {
                case "close":   inAbsolute = false;
                                return "\\right|";
                case "clothes": inAbsolute = false;
                                return "\\right|";
                case "closed":  inAbsolute = false;
                                return "\\right|";
            }
        }
        
        if (!inParentheses) {
            switch(s) {
                case "open":    inParentheses = true;
                                return "(";
                case "opened":  inParentheses = true;
                                return "(";
            }
        }
        
        if (inParentheses) {
            switch(s) {
                case "close":   inParentheses = false;
                                return ")";
                case "clothes": inParentheses = false;
                                return ")";
                case "closed":  inParentheses = false;
                                return ")";
            }
        }
        
    }

    switch(s) {
        case "newline": return "\\newline";
        case "newpage": return "\\newpage";
        case "newequation": inEquation = true;
                            return "$";
        case "italics": return "\\textit";
        case "italicized": return "\\textit";
        case "bold": return "\\textbf";
        case "bolded": return "\\textbf";
    }
    
    return s;
    
}

function convert(s) {

    var extension = "";

    if (inVector) {
        extension = "}";
        inVector = false;
    }
    
    if (!inEquation) {
        extension=" ";
    }

    if (isNumber(s)) {
        if (inDivision) {        
            extension="} ";
            inDivision = false;
            
            console.log("Before: "+convertedText);
            
            convertedText=convertedText.substring(0,convertedText.length-9-2*numerator.length)+convertedText.substring(convertedText.length-9-numerator.length)+s+extension;
            
            console.log("After: "+convertedText);
            
            numerator = convertVariable(s);
            
            return "";
        }
            
        return s+extension;
    } else if (inEquation && isVariable(s.toLowerCase())) {
        
        numerator = convertVariable(s.toLowerCase());
        
        if (inSub || inSuper) {
            extension = "}";
            inSub = false;
            inSuper = false;
            return convertVariable(s.toLowerCase())+extension;
        } else if (respect) {
            extension+="~d"+convertVariable(s.toLowerCase());
            respect = false;
            return extension;
        } else if (inDivision) {
            extension="}";
            inDivision = false;
            
            console.log("Before: "+convertedText);
            
            convertedText=convertedText.substring(0,convertedText.length-9-2*numerator.length)+convertedText.substring(convertedText.length-9-numerator.length)+convertVariable(s)+"}";
            
            console.log("After: "+convertedText);
            
            numerator = convertVariable(s);
            
            return "";
        } else
            return convertVariable(s.toLowerCase())+extension;
        
    } else if (inEquation && isOperator(s.toLowerCase())) {
        return convertOperator(s.toLowerCase())+extension;
    } else if (isCommand(s.toLowerCase())) {
        return convertCommand(s.toLowerCase());
    } else if (!inEquation) {
        return s+extension;
    } else
        return "";
}

function isReserved(s) {
    switch(s) {
        case "line": return true;
        case "equation": return true;
        case "equations": return true;
        case "page": return true;
        case "italics": return true;
        case "italicized": return true;
        case "bold": return true;
        case "bolded": return true;
        case "value": return true;
        // UPDATE RESERVED WORDS                                            TODO
    }
    return false;
}

function resetInputTypes() {
    inEquation = false;
    inSub = false;
}

function convertText(text) {

    var words = [];
    
    //text = "new equation 3 times x equals y to the power of 2 end equation";
    var words = text.split(" ");
    
    for (var i=0; i< words.length; i++) {

        var currentWord = words[i];
        
        if (currentWord == "new" || currentWord == "end" || currentWord == "and" || currentWord == "&" || currentWord == "absolute") {
            if(i < words.length - 1 && isReserved(words[i+1])) {
                words[i] = words[i] + words[i+1];
            }
        }
    }

    for (var i=0; i< words.length; i++) {
        if(isReserved(words[i])){
            words.splice(i, 1);
            i--;
        }
    }

    resetInputTypes();

    for (var i = 0; i < words.length; i++) {
        convertedText+=convert(words[i]);
        //if (convert(words[i]) == "\\newline")
            //convertedText+="\n";
    }
    
    addToLatexEditor(convertedText, "converted");

    compileLaTeX();

}

function addToLatexEditor(text, type) {
  var editor = ace.edit("editor");
  editor.navigateFileEnd();

  if(type == "title"){
    if(text.length > 0)
      text = "\\title{"+text+"}";
    editor.insert(text+"\n");
  } else if (type == "author"){
    if(text.length > 0)
      text = "\\author{"+text+"}";
    editor.insert(text+"\n");
  } else if (type == "date"){
    if(text.length > 0)
      text = "\\date{"+text+"}";
    editor.insert(text+"\n");
  } else if (type == "end") {
      editor.insert(text);
  } else if (type == "init") {
      editor.insert(text+"\n");
  } else {
      editor.navigateLineStart();
      editor.insert(text+"\n");
  }

}
