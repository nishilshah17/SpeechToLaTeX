function compileLaTeX(latex_code) {

  //make call to php file
  echo(latex_code);

  $.ajax({
    url: 'http://ramvellanki.com/s2l/tex/createFile.php',
    type: 'POST',
    data: { latex: latex_code },
    success: function(data) {
      alert(data);
    },
    error: function(error) {
      alert(error);
    }
  });

  //embed pdf
  document.getElementById('pdf').innnerHTML = '<iframe src="http://latex.aslushnikov.com/compile?url=https://raw.githubusercontent.com/aslushnikov/latex-online/master/sample/sample.tex" style="width:718px; height:700px;" frameborder="0"></iframe>';
}
