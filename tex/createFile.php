<?php
  $latex_code = $_POST['latex'];
  echo $latex_code;
  $date = date_create();
  $unix = date_timestamp_get($date);

  $filename = $unix.".tex"
  $newfile = fopen($filename, "w") or die("Unable to open file!");
  fwrite($newfile, $latex_code);
  fclose($newfile);
?>
