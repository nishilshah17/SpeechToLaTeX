function compileLaTeX(latex_code) {

  //make call to php file
  alert(latex_code);

  $.ajax({
    url: 'http://ramvellanki.com/s2l/tex/createFile.php',
    type: 'POST',
    data: { latex: 'fjdsafdsa' },
    success: function(data) {
      $('#pdf').append("<iframe src='http://latex.aslushnikov.com/compile?url=http://ramvellanki.com/s2l/tex/"+data+"' style='width:718px; height:700px;' frameborder='0'></iframe>")
    },
    error: function(error) {
      alert(error);
    }
  });

}
