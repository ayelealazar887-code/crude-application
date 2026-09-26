<?php

$path = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);

if (
    $path === '/api/products' ||
    preg_match('#^/api/products/\d+$#', $path)
) {
    require __DIR__ . '/api/index.php';
    return;
}

return false;