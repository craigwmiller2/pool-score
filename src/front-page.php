<?php
/**
 * The main template file for the front page of the website
 *
 * @package Pool_Score
 */

get_header();

echo '<div class="score-container"></div>';

if ( is_user_logged_in() ) {
  echo '<div class="new-match-container"></div>';
  echo '<button class="button button--new-match">New Match</button>';
} else {
  echo '<a href="' . wp_login_url() . '" title="Login" class="button">Login</a>';
}

get_footer();
