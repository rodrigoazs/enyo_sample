<?php

$file = file_get_contents('http://ws.audioscrobbler.com/2.0/?method=user.getinfo&user=RodrigoKamper&api_key=2b35547bd5675d8ecb2b911ee9901f59&format=json');

$json = json_decode($file);

print_r($json);

 ?>
