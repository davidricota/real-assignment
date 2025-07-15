<?php

/**
 * Plugin Name: Real Assignment
 * Description: Plugin with three custom blocks: Proprietary Tools, Legacy, and Comprehensive Benefits.
 * Version: 1.0.0
 * Author: Deiv.dev
 */

if (! defined('ABSPATH')) {
    exit;
} // Exit if accessed directly.

// Register the three custom blocks on init.
add_action('init', function () {
    register_block_type(__DIR__ . '/build/proprietary-tools');
    register_block_type(__DIR__ . '/build/legacy');
    register_block_type(__DIR__ . '/build/comprehensive-benefits');
});
