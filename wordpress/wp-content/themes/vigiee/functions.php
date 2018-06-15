<?php
/**
 * B.A.D general functions and definitions
 *
 * @link http://www.bad-corp.com/
 *
 * @package B.A.D
 * @subpackage vigiee
 * @since 1.0
 */

/**
 * smtp mail
 */
add_action('phpmailer_init', 'mail_smtp');

function mail_smtp( $phpmailer ) {
	$phpmailer->IsSMTP();
	// Enable SMTPAuth services
	$phpmailer->SMTPAuth	= true;
	$phpmailer->SMTPDebug	= 0;
	// SMTP send port [465=>ssl, 25=>'']
	$phpmailer->Port		= '465';
	$phpmailer->SMTPSecure	= 'ssl';
	// SMTP server address
	$phpmailer->Host		= 'sv6133.xserver.jp';
	// $phpmailer->Host		= 'smtp.qq.com';
	// email address
	$phpmailer->Username	= 'mail@vigiee-jp.com';
	// $phpmailer->Username	= '100075001@qq.com';
	// email password
	$phpmailer->Password	= 'comfort1101';
	// $phpmailer->Password	= 'gnfespqakeasbjcb';
	// email from
	$phpmailer->From		= 'mail@vigiee-jp.com';
	$phpmailer->FromName	= 'Vigieeサイト';
}

/**
 * send mail
 */
add_action( 'wp_ajax_send_mail', 'send_mail' );
add_action( 'wp_ajax_nopriv_send_mail', 'send_mail' );

function send_mail() {
	# get post
	$post = $_POST;
	$param = array('project', 'name', 'email', 'content');
	$data = array();
	foreach ($param as $v) {
		$data[$v] = $post[$v];
	}
	$data['content'] = str_replace("\r", "<br>", $data['content']);
	$data['content'] = str_replace("\n", "<br>", $data['content']);
	# page data
	$page = get_page(25);
	$to = get_field('addressee', $page);
	#$subject = get_option('blogname');
	$subject = 'FORM '.home_url();
	$subject = 'Vigieeサイトから問い合わせが入りました';
	$txt = "お問い合わせ項目: ".$data['project']."<br>お名前: ".$data['name']."<br>メールアドレス: ".$data['email']."<br>お問い合わせ内容: <br>".$data['content'];
	$headers = ['Content-Type: text/html; charset=UTF-8'];
	$mail = wp_mail($to, $subject, $txt, $headers);
	# result
	$result = array(
		'status'	=> $mail,
		'data'		=> array(),
	);
	# return json
	header('Content-Type:application/json; charset=utf-8');
	echo json_encode($result, JSON_UNESCAPED_UNICODE);
    wp_die();
}
