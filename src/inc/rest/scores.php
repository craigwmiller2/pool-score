<?php
/**
 * REST API endpoint for scores
 *
 * @package Pool_Score
 */

add_action( 'rest_api_init', function () {
  register_rest_route( 'scores/v1', '/scores', array(
    'methods' => 'GET',
    'callback' => 'getScores',
  ) );
} );

function getScores() {

  if ( have_rows( 'player', 'option' ) ) {

    $players = array();

    while ( have_rows( 'player', 'option' ) ) {
      the_row();

      $player_data = array();

      $player_data['player_details']['name'] = get_sub_field( 'player_name' );
      $player_data['player_details']['image'] = get_sub_field( 'player_picture' )['sizes']['thumbnail'];

      $player_data['score']['fp'] = get_sub_field( 'frame_points' ) ? intval( get_sub_field( 'frame_points' ) ) : 0;
      $player_data['score']['mp'] = get_sub_field( 'match_points' ) ? intval( get_sub_field( 'match_points' ) ) : 0;

      $players[] = $player_data;

    }

    // sort array into order of match point wins (ascending)
    usort($players, function ($a, $b) {
      return $a['score']['mp'] - $b['score']['mp'];
    });

    // reverse the array to output 1st place first (match point wins descending)
    $players = array_reverse( $players );

    $fp_total = getTotal( $players, 'fp' );
    $mp_total = getTotal( $players, 'mp' );

    for ($i=0; $i < count($players); $i++) {

      $players[$i]['score']['fp_pct'] = number_format( (float) ($players[$i]['score']['fp'] / $fp_total  * 100), 2, '.', '');
      $players[$i]['score']['mp_pct'] = number_format( (float) ($players[$i]['score']['mp'] / $mp_total  * 100), 2, '.', '');

    }

  } else {

    $players = array(
      'error_code' => 404,
      'error_message' => 'No players found'
    );

  }

  return $players;

}

// $players data, $point type 'fp' or 'mp'
function getTotal( $data, $point ) {

  $total = 0;

  for ($i=0; $i < count($data); $i++) {

    $total += $data[$i]['score'][$point];

  }

  return $total;

}
