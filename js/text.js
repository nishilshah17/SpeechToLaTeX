function convertText(text) {

    var convertedText;

    convertedText = "\\documentclass{article}" +
        "\\begin{document}" +
        "\\title{MCLA Concise Review}" +
        "\\author{Ram Vellanki, Manoaj Kandiakounder, Pranav Marupudi, Jintao Hang}" +
        "\\date{June 2014}" +
        "\maketitle" +
        "\\tableofcontents" +
        "%MC CHAPTER 1.................................................... $"+
        "\\newpage" +
        "\\section{Parametrics and Polar Coordinates}" +
        "\\end{document}"
        ;

    compileLaTeX(convertedText);

}
