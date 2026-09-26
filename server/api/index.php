<?php

header('Content-Type: application/json');

/*
 * CORS
 */
header(
    'Access-Control-Allow-Origin: http://localhost:5173'
);

header(
    'Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS'
);

header(
    'Access-Control-Allow-Headers: Content-Type'
);

/*
 * Handle browser preflight request.
 */
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

/*
 * Load database.
 */
require_once __DIR__ . '/../config/database.php';

/*
 * Load model.
 */
require_once __DIR__ . '/../models/Product.php';

/*
 * Load controller.
 */
require_once __DIR__ . '/../controllers/ProductController.php';

/*
 * Load routes.
 */
require_once __DIR__ . '/../routes/productRoutes.php';
require_once __DIR__ . '/../routes/apiRoutes.php';

/*
 * Create database connection.
 */
$database = new Database();

$db = $database->getConnection();

/*
 * Create Product model.
 */
$product = new Product($db);

/*
 * Create Product controller.
 */
$productController = new ProductController($product);

/*
 * Get request information.
 */
$method = $_SERVER['REQUEST_METHOD'];

$path = parse_url(
    $_SERVER['REQUEST_URI'],
    PHP_URL_PATH
);

/*
 * Send request to router.
 */
apiRoutes(
    $method,
    $path,
    $productController
);