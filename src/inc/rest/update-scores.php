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

  $updated_scores = array();

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

        $new_fp = $current_fp + $player['score']['fp'];
        $new_mp = $current_mp + $player['score']['mp'];

        // if player id matches new score player id
        if ( $id == $player['id'] ) {

          $update = array(
            'player_id' => $id,
            'player_name' => $name,
            'player_picture' => $image,
            'frame_points' => $new_fp,
            'match_points' => $new_mp
          );

          $updated_scores[] = $update;

          // update row
          update_row( 'player', $index, $update, 'scores_page' );

          unset( $update );

        }

      }

    }
  }

  $fp_total = getTheTotal( $updated_scores, 'frame_points' );
  $mp_total = getTheTotal( $updated_scores, 'match_points' );

  for ($i=0; $i < count($updated_scores); $i++) {

    $updated_scores[$i]['fp_pct'] = number_format( (float) ($updated_scores[$i]['frame_points'] / $fp_total  * 100), 2, '.', '');
    $updated_scores[$i]['mp_pct'] = number_format( (float) ($updated_scores[$i]['match_points'] / $mp_total  * 100), 2, '.', '');

  }

  return $updated_scores;

}

function getTheTotal( $data, $point ) {

  $total = 0;

  for ($i=0; $i < count($data); $i++) {

    $total += $data[$i][$point];

  }

  return $total;

}
