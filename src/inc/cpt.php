<?php
/**
 * Media Template
 *
 * @package Orknet_Starter_Theme
 */

function orknet_starter_theme_cpt() {

  // register_post_type( 'rooms',
  //   array(
  //     'labels' => array(
  //       'name' => __( 'Rooms' ),
  //       'singular_name' => __( 'Room' )
  //     ),
  //     'public' => true,
  //     'has_archive' => true,
  //     'supports' => array( 'thumbnail', 'title' ),
  //     'menu_icon' => 'dashicons-screenoptions',
  //     'menu_position' => 50,
  //     'show_in_rest' => true,
  //   )
  // );

}
add_action( 'init', 'orknet_starter_theme_cpt' );
