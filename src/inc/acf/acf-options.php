<?php
/**
 * Advanced Custom Fields PRO - Options Page
 *
 * @package Pool_Score
 */

if( function_exists('acf_add_options_page') ) {

  // Theme settings options section
  $parent = acf_add_options_page(array(
    'page_title' 	=> 'Scores',
    'menu_title'	=> 'Scores',
    'menu_slug' 	=> 'pool-scores',
    'capability'	=> 'edit_posts',
    'redirect'		=> false,
    'icon_url'		=> 'dashicons-image-filter',
    'position'    => 1
  ));

  // acf_add_options_sub_page(array(
  //   'page_title' 	=> 'Social Links',
  //   'menu_title'	=> 'Social Links',
  //   'menu_slug' 	=> 'social-links',
  //   'parent'      => $parent['menu_slug'],
  //   'capability'  => 'manage_options'
  // ));

}
