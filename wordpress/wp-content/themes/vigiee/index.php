<?php
/**
 * The main template file
 *
 * @link 
 *
 * @package B.A.D
 * @subpackage vigiee
 * @since 1.0
 * @version 1.0
 */
$url = home_url();
$url = str_replace('/wordpress', '', $url);
header('Location: '.$url);


