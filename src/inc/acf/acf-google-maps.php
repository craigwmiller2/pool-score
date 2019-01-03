<?php
/**
 * Advanced Custom Fields PRO - Google Maps API Key
 *
 * @package Orknet_Starter_Theme
 */

function google_maps_api_key(){
	return 'AIzaSyDlCXM_gNU0JhFNfNFILBmuyTtQimiF_dc';
}

function my_acf_init() {

	acf_update_setting( 'google_api_key', google_maps_api_key() );
}

add_action('acf/init', 'my_acf_init');
