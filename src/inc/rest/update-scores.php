<?php
/**
 * REST API endpoint for scores
 *
 * @package Pool_Score
 */


add_action( 'rest_api_init', function () {

  register_rest_route( 'scores/v1', '/update-scores', array(
    'methods' => array( 'POST' ),
    'callback' => 'update_scores',
  ) );

});

function update_scores( WP_REST_Request $request ) {

  $players = $_POST['scores'];

  foreach ( $players as $player ) {
    if ( have_rows( 'player', 'scores_page' ) ) {

      while ( have_rows( 'player', 'scores_page' ) ) {
        the_row();

        // get current loop row index
        $index = get_row_index();

        $id = get_sub_field( 'player_id' );
        $name = get_sub_field( 'player_name' );
        $image = get_sub_field( 'player_picture' );

        $current_fp = get_sub_field( 'frame_points' );
        $current_mp = get_sub_field( 'match_points' );

        $new_fp = $current_fp + $player['fp'];
        $new_mp = $current_mp + $player['mp'];

        // if player id matches new score player id
        if ( $id == $player['id'] ) {

          $update = array(
            'player_id' => $id,
            'player_name' => $name,
            'player_picture' => $image,
            'frame_points' => $new_fp,
            'match_points' => $new_mp
          );

          // update row
          update_row( 'player', $index, $update, 'scores_page' );

          return $update;

        }

      }

    }
  }

  // update scores

  // recalculate percentages etc

  // return data to update score cards

}
