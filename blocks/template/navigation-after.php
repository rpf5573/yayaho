<?php
defined('ABSPATH') || exit;

$wraper_after .= '<div class="ultp-next-prev-wrap" data-pages="' . $pageNum . '" data-pagenum="1" data-blockid="' . $attr['blockId'] . '" data-blockname="ultimate-post_' . $block_name . '" data-postid="' . $page_post_id . '">';
$wraper_after .= ultimate_post()->next_prev();
$wraper_after .= '</div>';