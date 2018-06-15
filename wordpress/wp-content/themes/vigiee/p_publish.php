<?php

/* Template Name: publish */
# get cate
$name = 'publish';
$cate = get_category_by_slug($name);
# get list
$where = array(
	'category'			=> $cate->cat_ID,
	'orderby'			=> 'date',
	'order'				=> 'desc',
	'posts_per_page'	=> -1
);
$list = get_posts($where);
# set param
$field_prefix = 'f_publish_';
$param = array(
	'info',
	'img',
);
$data = array();
foreach ($list as $k=>$v) {
	$data[$k]['field'] = array();
	foreach ($param as $p) {
		$data[$k]['field'][$p] = !get_field($field_prefix.$p, $v) ? '' : get_field($field_prefix.$p, $v);
	}
}
# page data
# to array
#$list = json_decode(json_encode($list, JSON_UNESCAPED_UNICODE), true);
# result
$result = array(
	'status'	=> true,
	'data'		=> array(
		'list'	=> $data,
	),
);
# return json
header('Content-Type:application/json; charset=utf-8');
exit(json_encode($result, JSON_UNESCAPED_UNICODE));
