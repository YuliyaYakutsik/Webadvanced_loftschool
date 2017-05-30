<?php

header('Content-Type: application/json');

$name = $_POST['name'];
$email = $_POST['email'];
$message = $_POST['text'];
$letter = "Сообщение от пользователя: $name, адрес электронной почты для обратной связи: $email. Сообщение: $message";

$result = mail('y-sunny@mail.ru', 'Заявка', $letter);
;

echo json_encode(array(
	'status' => $result
));	

?>