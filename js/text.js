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
    return (s.length == 1 && s.match(/^[a-zA-Z]/));   
}

function convertOperator(s) {
    switch (s) {
        case "equals": return "=";
        case "plus": return "+";
        case "added": return "+";
        case "minus": return "-";
        case "subtracted": return "-";
        case "times": return "*";
        case "multiplied": return "*";
        case "over": return "/";
        case "divided": return "/";
        case "by": return "/";    
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
        case "dived": return true;
        case "by": return true;
    }
}

function isCommand(s) {
    switch (s) {
        case "compile": return true;
        case "new": return true;
        case "line": return true;
        case "end": return true;
        case "and": return true;
        case "italics": return true;
        case "italicized": return true;
        case "bold": return true;
        case "bolded": return true;
    }
}

function convert(s) {
 
    if (isNumber(s)) {
        return s+" ";
    } else if (isVariable(s)) {
        return s+" ";
    } else if (isOperator(s)) {
        return convertOperator(s)+" ";
    } else if (isCommand(s)) {
        
        if (s.equals("line"))
            return "\\newline";
        if (s.equals("page"))
            return "\\newpage";
        
    } else {
        return s;
    }
    
}

function convertText(text) {

    //text = "x plus y equals 3";
    
    var words = [];
    
    var convertedText = "\\\documentclass{article}" +
        "\\begin{document}" +
        "\\title{MCLA Concise Review}" +
        "\\\author{Ram Vellanki, Manoaj Kandiakounder, Pranav Marupudi, Jintao Hang}" +
        "\\date{June 2014}" +
        "\\maketitle" +
        "\\tableofcontents" +
        "\\newpage" +
        "\\section{Parametrics and Polar Coordinates}" +
        "\\newline ";
    
    var spaces = countSpaces(text);
    
    for (var i = 0; i < spaces+1; i++) {
        var tmp = "";
        if (text.indexOf(" ") < 0)
            tmp = text;
        else
            tmp = [text.substring(0,text.indexOf(" "))];
        console.log("tmp: "+tmp);
        words = words.concat(tmp);
        text = text.substring(text.indexOf(" ")+1);
        console.log("text: "+text);
    }
    
    console.log(words);
    
    for (var i = 0; i < words.length; i++) {
        convertedText+=convert(words[i]);
    }
    
    convertedText+="\\end{document}";
        
        /*"\\\documentclass{article}" +
        "\\begin{document}" +
        "\\title{MCLA Concise Review}" +
        "\\\author{Ram Vellanki, Manoaj Kandiakounder, Pranav Marupudi, Jintao Hang}" +
        "\\date{June 2014}" +
        "\\maketitle" +
        "\\tableofcontents" +
        "\\newpage" +
        "\\section{Parametrics and Polar Coordinates}" +
        "\\end{document}"
        ;*/

    compileLaTeX(convertedText);

}
