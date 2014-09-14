function compileLaTeX() {

  var editor = ace.edit("editor");
  editor.navigateFileEnd();
  editor.selectAll();
  var latex_text = editor.getCopyText();
  
    $.ajax({
    url: 'http://ramvellanki.com/s2l/tex/createFile.php',
    type: 'POST',
    data: { latex: latex_text },
    success: function(data) {
      //compile to LaTeX using this API
      $('#pdf').empty();
      $('#pdf').append("<iframe src='http://latex.aslushnikov.com/compile?url=http://ramvellanki.com/s2l/tex/"+data+"' style='width:718px; height:700px;' frameborder='0'></iframe>")
      //embed PDF
    },
    error: function(error) {
      alert(error);
    }
  });

}
