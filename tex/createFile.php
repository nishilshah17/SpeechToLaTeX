$latex_code = $_POST['latex_code'];

$date = date_create();
$unix = date_timestamp_get($date);

$newfile = fopen($unix.".tex", "w") or die("Unable to open file!");
fwrite($newfile, $latex_code);
fclose($newfile);
