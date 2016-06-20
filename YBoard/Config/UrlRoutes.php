<?php

// Routing rules for the router
// URL Regex => array(Controller name, Action name]
return [
    '#^/$#' => ['Index', 'index'],

    '#.*#' => ['Errors', 'notFound'], // Everything else should just return a 404
];