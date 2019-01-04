<?php
/**
 * The header for the theme
 *
 * @link https://developer.wordpress.org/themes/basics/template-files/#template-partials
 *
 * @package Pool_Score
 */

?>
<!doctype html>
<html <?php language_attributes(); ?>>
<head>
	<meta charset="<?php bloginfo( 'charset' ); ?>">
	<meta name="viewport" content="width=device-width, initial-scale=1">

	<?php wp_head(); ?>
</head>

<body <?php body_class(); ?>>
<div id="page" class="site">
	<header class="site-header">
		<a class="site-logo" href="<?php echo site_url(); ?>">
			<img src="<?php echo get_template_directory_uri() . '/media/logos/pool-scores-logo.svg'; ?>" alt="Pool Scores Logo">
		</a>
	</header>
