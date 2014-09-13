
var inEquation = false;

function countSpaces(s) {

    var count = 0;

    for (var i = 0; i < s.length; i++) {
        if (s.charAt(i) == " ")
            count++;
    }

    return count;

}

function isNumber(s) {
    return !(s.match(/^[a-zA-Z]/));
}

function isVariable(s) {

    if (s.length == 1 && s.match(/^[a-zA-Z]/))
        return true;

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
        case "factorial": return true;
    }
}

function convertOperator(s) {
    switch (s) {
        case "equals": return "=";
        case "plus": return "+";
        case "added": return "+";
        case "minus": return "-";
        case "subtracted": return "-";
        case "times": return "*";
        case "Times": return "*";
        case "multiplied": return "*";
        case "over": return "/";
        case "divided": return "/";
        case "by": return "/";
    }
}

function isCommand(s) {
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
    }
}

function convertCommand(s) {
    switch(s) {
        case "newline": return "\\newline";
        case "newpage": return "\\newpage";
        case "newequation": inEquation = true;
                            return "$";
        case "endequation": inEquation = false;
                            return "$";
        case "andequation": inEquation = false;
                            return "$";
    }
}

function convert(s) {

    if (isNumber(s)) {
        return s+" ";
    } else if (isVariable(s)) {
        return convertVariable(s)+" ";
    } else if (inEquation && isOperator(s)) {
        return convertOperator(s)+" ";
    } else if (isCommand(s)) {
        return convertCommand(s);
    } else {
        return s+" ";
    }

}

function convertText(text) {

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

        var append = false;

        if (tmp == "new" || tmp == "end" || tmp == "and")
            append = true;

        var tmp = "";
        if (text.indexOf(" ") < 0)
            tmp = text;
        else
            tmp = [text.substring(0,text.indexOf(" "))];
        if (append)
            words[i-1] = words[i-1]+tmp;
        else
            words = words.concat(tmp);
        text = text.substring(text.indexOf(" ")+1);
    }

    inEquation = false;

    for (var i = 0; i < words.length; i++) {
        convertedText+=convert(words[i]);
    }

    convertedText+="\\end{document}";

    compileLaTeX(convertedText);

}
