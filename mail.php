<?php
header("content-type:text/html;charset=utf-8");
ini_set("magic_quotes_runtime",0);
error_reporting(0);

$post = $_POST;
$param = array('project', 'name', 'email', 'content');
$data = array();
foreach ($param as $v) {
	$data[$v] = $post[$v];
}

$data['content'] = str_replace("\r", "<br>", $data['content']);
$data['content'] = str_replace("\n", "<br>", $data['content']);

$to = "mail@comfort-jp.com";
$subject = "FORM www.vigiee-jp.com";

$txt = "お問い合わせ項目: ".$data['project']."<br>お名前: ".$data['name']."<br>メールアドレス: ".$data['email']."<br>お問い合わせ内容: <br>".$data['content'];

$headers = "MIME-Version: 1.0" . "\r\n";
$headers.= "Content-type:text/html;charset=UTF-8" . "\r\n";
$headers.= 'From: <www.vigiee-jp.com>' . "\r\n";

//require 'phpmailer/src/PHPMailer.php';
//$mail = new \PHPMailer\PHPMailer\PHPMailer();
//$mail->isSMTP();
//$mail->SMTPAuth = true;
//$mail->Host = 'sv6133.xserver.jp';
//$mail->SMTPSecure = 'ssl';
//$mail->Port = 465;
//$mail->CharSet = 'UTF-8';
//$mail->Username = 'mail@comfort-jp.com';
//$mail->Password = 'comfort1101';
//$mail->From = 'mail@comfort-jp.com';
//$mail->isHTML(true);
//$mail->addAddress('mail@comfort-jp.com');
//$mail->Subject = $subject;
//$mail->Body = $txt;
//$result = $mail->send();
$result = mail($to, $subject, $txt, $headers);
//$result = true;

$return = array(
		'status'	=> $result,
		'data'		=> array(),
);
if (!$result) {
	$return['result'] = false;
	$return['msg'] = 'send failed';
}

exit(json_encode($return));