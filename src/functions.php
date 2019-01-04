<?php
/**
 * Pool Score functions and definitions
 *
 * @link https://developer.wordpress.org/themes/basics/theme-functions/
 *
 * @package Pool_Score
 */

if ( ! function_exists( 'pool_score_setup' ) ) :
	/**
	 * Sets up theme defaults and registers support for various WordPress features.
	 *
	 * Note that this function is hooked into the after_setup_theme hook, which
	 * runs before the init hook. The init hook is too late for some features, such
	 * as indicating support for post thumbnails.
	 */
	function pool_score_setup() {

		// Add default posts and comments RSS feed links to head.
		add_theme_support( 'automatic-feed-links' );

		/*
		 * Let WordPress manage the document title.
		 * By adding theme support, we declare that this theme does not use a
		 * hard-coded <title> tag in the document head, and expect WordPress to
		 * provide it for us.
		 */
		add_theme_support( 'title-tag' );

		/*
		 * Enable support for Post Thumbnails on posts and pages.
		 *
		 * @link https://developer.wordpress.org/themes/functionality/featured-images-post-thumbnails/
		 */
		add_theme_support( 'post-thumbnails' );

		// Add image size for page template
		add_image_size( 'page-featured', 600, 450, true );

		// This theme uses wp_nav_menu() in one location.
		register_nav_menus( array(
			'menu-1' => esc_html__( 'Primary', 'pool-score' ),
		) );

		/*
		 * Switch default core markup for search form, comment form, and comments
		 * to output valid HTML5.
		 */
		add_theme_support( 'html5', array(
			'search-form',
			'comment-form',
			'comment-list',
			'gallery',
			'caption',
		) );

		// Add theme support for selective refresh for widgets.
		add_theme_support( 'customize-selective-refresh-widgets' );

	}
endif;
add_action( 'after_setup_theme', 'pool_score_setup' );

/**
 * Register widget area.
 *
 * @link https://developer.wordpress.org/themes/functionality/sidebars/#registering-a-sidebar
 */
function pool_score_widgets_init() {
	register_sidebar( array(
		'name'          => esc_html__( 'Sidebar', 'pool-score' ),
		'id'            => 'sidebar-1',
		'description'   => esc_html__( 'Add widgets here.', 'pool-score' ),
		'before_widget' => '<section id="%1$s" class="widget %2$s">',
		'after_widget'  => '</section>',
		'before_title'  => '<h2 class="widget-title">',
		'after_title'   => '</h2>',
	) );
}
add_action( 'widgets_init', 'pool_score_widgets_init' );

/**
 * Enqueue scripts and styles.
 */
function pool_score_scripts() {
	wp_enqueue_style( 'pool-score-style', get_stylesheet_uri() );

	// Main JS File
	wp_enqueue_script( 'main-js', get_template_directory_uri() . '/js/main.js' . '?' . filemtime(get_template_directory() . '/js/main.js'), array( 'jquery' ), '', true );
	wp_localize_script( 'main-js', 'JS_OBJ', array( 'siteurl' => site_url() ) );

	// Google Fonts
	wp_enqueue_style( 'font', 'https://fonts.googleapis.com/css?family=Montserrat:400,700' );

}
add_action( 'wp_enqueue_scripts', 'pool_score_scripts' );

/**
 * Custom Post Types.
 */
require get_template_directory() . '/inc/cpt.php';

/**
 * Advanced Custom Fields PRO - Setup.
 */
require get_template_directory() . '/inc/acf/acf-setup.php';

/**
 * Advanced Custom Fields PRO - Options Page.
 */
require get_template_directory() . '/inc/acf/acf-options.php';

/**
 * Advanced Custom Fields PRO - Google Maps API Key.
 */
require get_template_directory() . '/inc/acf/acf-google-maps.php';

/**
 * Breadcrumbs
 */
require get_template_directory() . '/inc/breadcrumbs.php';

/**
 * Require REST API endpoints
 */
require get_template_directory() . '/inc/rest/rest.php';

/**
 * Stop images being wrapped in <p> tags
 */
function filter_ptags_on_images($content){
	return preg_replace('/<p>\s*(<a .*>)?\s*(<img .* \/>)\s*(\/a>)?\s*<\/p>/iU', '\1\2\3', $content);
}
add_filter('the_content', 'filter_ptags_on_images');

/**
 * Redirect non-admins to the homepage after logging into the site.
 *
 * @since 	1.0
 */
function acme_login_redirect( $redirect_to, $request, $user  ) {
	return ( is_array( $user->roles ) && in_array( 'administrator', $user->roles ) ) ? admin_url() : site_url();
}
add_filter( 'login_redirect', 'acme_login_redirect', 10, 3 );
