function countSpaces(s) {

    var count = 0;

    for (var i = 0; i < s.length; i++) {
        if (s.charAt(i) == " ")
            count++;
    }

    return count;

}

function convertText(text) {

    text = "x plus y equals three";

    var words = [];

    for (var i = 0; i < countSpaces(text); i++) {
        var tmp = [text.substring(0,text.indexOf(" "))]
        words = words.concat(tmp);
        text = text.substring(text.indexOf(" ")+1);
    }

    var convertedText;

    convertedText = "\\\documentclass{article}" +
        "\\begin{document}" +
        "\\title{MCLA Concise Review}" +
        "\\\author{Ram Vellanki, Manoaj Kandiakounder, Pranav Marupudi, Jintao Hang}" +
        "\\date{June 2014}" +
        "\\maketitle" +
        "\\tableofcontents" +
        "\\newpage" +
        "\\section{Parametrics and Polar Coordinates}" +
        "\\end{document}"
        ;

    compileLaTeX(convertedText);

}
