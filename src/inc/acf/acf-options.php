<?php
/**
 * Advanced Custom Fields PRO - Options Page
 *
 * @package Orknet_Starter_Theme
 */

if( function_exists('acf_add_options_page') ) {

  // Theme settings options section
  $parent = acf_add_options_page(array(
    'page_title' 	=> 'Theme Settings',
    'menu_title'	=> 'Theme Settings',
    'menu_slug' 	=> 'theme-settings',
    'capability'	=> 'edit_posts',
    'redirect'		=> false,
    'icon_url'		=> 'dashicons-admin-settings',
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
