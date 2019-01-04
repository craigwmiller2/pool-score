<?php
/**
 * Media Template
 *
 * @package Pool_Score
 */

function pool_score_cpt() {

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
add_action( 'init', 'pool_score_cpt' );
