<?php

if($_SERVER['REQUEST_METHOD'] == 'POST')
{
  $path = '../new_flickr/storage.json';
  $file = file_get_contents($path);
  $json = json_decode($file, true);

  foreach($_POST as $key => $value)
  {
    $json[$key] = $value;
  }

  $fp = fopen($path, 'w');
  fwrite($fp, json_encode($json));
  fclose($fp);
}

?>
