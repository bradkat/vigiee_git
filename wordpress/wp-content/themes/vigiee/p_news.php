<?php

/* Template Name: news */
$field_prefix = 'f_news_';
if (isset($_GET['id'])) {
	# result
	$result = array(
		'status'	=> true,
		'data'		=> array(),
	);
	if (empty($_GET['id'])) {
		$result['status'] = false;
	} else {
		$article = get_post($_GET['id']);
		$detail = [
			'title'		=> get_field($field_prefix.'title', $article->ID),
			'date'		=> get_field($field_prefix.'date', $article->ID),
			#'date'		=> date('Y.m.d', strtotime($article->post_date)),
			'content'	=> get_field($field_prefix.'content', $article->ID)
		];
		$result['data']['detail'] = $detail;
	}
} else {
	# get cate
	$name = 'news';
	$cate = get_category_by_slug($name);
	$number = (isset($_GET['number']) && $_GET['number'] > 0) ? $_GET['number'] : -1;
	# get list
	$where = array(
		'category'			=> $cate->cat_ID,
		'orderby'			=> 'date',
		'order'				=> 'desc',
		'posts_per_page'	=> $number
	);
	$list = get_posts($where);
	# set param
	$param = array(
		'title',
		'date',
		'info',
		'thumb',
		'content'
	);
	$data = array();
	foreach ($list as $k=>$v) {
		$data[$k]['field'] = array();
		foreach ($param as $p) {
			$data[$k]['id'] = $v->ID;
			#$data[$k]['date'] = date('Y.m.d', strtotime($v->post_date));
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
}
# return json
header('Content-Type:application/json; charset=utf-8');
exit(json_encode($result, JSON_UNESCAPED_UNICODE));
