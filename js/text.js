var inEquation = false;
var inSub = false;
var inAbsolute = false;

function countSpaces(s) {

    var count = 0;

    for (var i = 0; i < s.length; i++) {
        if (s.charAt(i) == " ")
            count++;
    }

    return count;

}

function isNumber(s) {
    return !(s.match(/^[a-zA-Z]/))
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

    if (s == "ex" || s == "why")
        return true;

    return false;

}

function convertVariable(s) {


    if (s.length == 1 && s.match(/^[a-zA-Z]/))
        return s;

    switch (s) {
        case "ex": return "x";
        case "why": return "y";
        case "alpha": return "\alpha";
        case "beta": return "\beta";
        case "gamma": return "\gamma";
        case "delta": return "\delta";
        case "epsilon": return "\epsilon";
        case "zeta": return "\zeta";
        case "eta": return "\eta";
        case "theta": return "\theta";
        case "iota": return "\iota";
        case "kappa": return "\kappa";
        case "lambda": return "\lambda";
        case "mu": return "\mu";
        case "nu": return "\nu";
        //case "xi": return "\xi";
        case "omicron": return "\omicron";
        case "pi": return "\pi";
        case "rho": return "\rho";
        case "sigma": return "\sigma";
        case "tau": return "\tau";
        //case "upsilon": return "\upsilon";
        case "phi": return "\phi";
        case "chi": return "\chi";
        case "psi": return "\psi";
        case "omega": return "\omega";
    }

}

function isOperator(s) {
    switch (s) {
        case "equals": return true;
        case "plus": return true;
        case "added": return true;
        case "minus": return true;
        case "subtracted": return true;
        case "times": return true;
        case "multiplied": return true;
        case "over": return true;
        case "divided": return true;
        case "by": return true;
        case "power": return true;
        case "factorial": return true;
        case "integral": return true;
        case "derivative": return true;
    }
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
        case "x": return "";
        case "times": return "";
        case "multiplied": return "*";
        case "over": return "/";                                // TODO
        case "divided": return "/";                             // TODO
        case "by": return "/";                                  // TODO
        case "factorial": return "!";
        case "integral": return "\integral";
        case "derivative": return "";                           // TODO
        case "dot": return "\cdot";
        case "cross": return "\times";
        case "absolutevalue":   if (inEquation) return "\left|";
                                else return "$\left|";
        case "over": return "/";
        case "divided": return "/";
        case "by": return "/";
    }
}

function
isCommand(s) {
    switch (s) {
        case "compile": return true;
        case "newline": return true;
        case "newpage": return true;
        case "newequation": return true;
        case "endequation": return true;
        case "andequation": return true;
        case "endfile": return true;
        case "and": return true;
        case "italics": return true;
        case "italicized": return true;
        case "bold": return true;
        case "bolded": return true;
        case "sub": return true;
    }
}

function convertCommand(s) {

    if (inEquation) {
        switch (s) {
            case "endequation": inEquation = false;
                                return "$";
            case "andequation": inEquation = false;
                                return "$";
        }
    }

    if (inAbsolute) {
        switch(s) {
            case "end": inAbsolute = false;
                        if (inEquation) return "\right|";
                        else return "\right|$";
            case "and": inAbsolute = false;
                        if (inEquation) return "\right|";
                        else return "\right|$";
        }
    }

    switch(s) {
        case "newline": return "\\newline";
        case "newpage": return "\\newpage";
        case "newequation": inEquation = true;
                            return "$";
        case "italics": return "\textit";
        case "italicized": return "\textit";
        case "bold": return "\textbf";
        case "bolded": return "\textbf";
        case "sub": inSub = true;
                    return "_{";
    }
}

function convert(s) {

    var extension = "";

    if (inSub) {
        extension = "}";
        inSub = false;
    }

    if (!inEquation) {
        extension+=" ";
    }

    if (isNumber(s)) {
        return s+extension;
    } else if (inEquation && isVariable(s.toLowerCase())) {
        return convertVariable(s.toLowerCase())+extension;
    } else if (inEquation && isOperator(s.toLowerCase())) {
        return convertOperator(s.toLowerCase())+extension;
    } else if (isCommand(s.toLowerCase())) {
        return convertCommand(s.toLowerCase());
    } else {
        return s+extension;
    }

}

function isReserved(s) {
    
    if (s.indexOf("equation") > -1)
        return true;
    
    switch(s) {
        case "line": return true;
        case "equation": return true;
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

    var convertedText = "\\\documentclass{article}" +
        "\\begin{document}" +
        "\\title{(Title)}" +
        "\\\author{(Author)}" +
        "\\date{(Date)}" +
        "\\maketitle" +
        "\\tableofcontents" +
        "\\newpage" +
        "\\section{Parametrics and Polar Coordinates}" +
        "\\newline ";

    var spaces = countSpaces(text);

    for (var i = 0; i < spaces+1; i++) {

        var append = false;
<<<<<<< HEAD
        
        var tmp;
        
=======

>>>>>>> origin/master
        // keywords
        console.log("tmp: "+tmp);
        if (tmp == "new" || tmp == "end" || tmp == "and" || tmp == "absolute") {
            append = true;
        }

        tmp = "";
        if (text.indexOf(" ") < 0)
            tmp = text;
        else
            tmp = [text.substring(0,text.indexOf(" "))];
        
        if (isReserved(tmp))
            console.log("tmp: "+tmp+" reserved");
        
        if (append && isReserved(tmp)) {
            console.log("words[i-1]: "+words[i-1]);
            words[i-1] = words[i-1]+tmp;
            console.log("words[i-1]: "+words[i-1]);
        } else
            words = words.concat(tmp);
        text = text.substring(text.indexOf(" ")+1);
    }

    resetInputTypes();

    for (var i = 0; i < words.length; i++) {
        convertedText+=convert(words[i]);
    }
    
    convertedText+="\\end{document}";

    compileLaTeX(convertedText);
    
    //addToLatexEditor("\\end{document}", null)

}

function addToLatexEditor(text, type) {
  var editor = ace.edit("editor");
  editor.navigateFileEnd();

  if(type == "title"){
    if(text.length > 0)
      text = "\\title{"+text+"}";
  } else if (type == "author"){
    if(text.length > 0)
      text = "\\author{"+text+"}";
  } else if (type == "date"){
    if(text.length > 0)
      text = "\\date{"+text+"}";
  }
  editor.insert(text+"\n");

}
