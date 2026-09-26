<?php

function apiRoutes(
    string $method,
    string $path,
    ProductController $productController
): void {

    /*
     * GET /api/products
     * POST /api/products
     */
    if ($path === '/api/products') {

        productRoutes(
            $method,
            null,
            $productController
        );

        return;
    }

    /*
     * GET /api/products/{id}
     * PUT /api/products/{id}
     * DELETE /api/products/{id}
     */
    if (preg_match(
        '#^/api/products/(\d+)$#',
        $path,
        $matches
    )) {

        $id = (int) $matches[1];

        productRoutes(
            $method,
            $id,
            $productController
        );

        return;
    }

    http_response_code(404);

    echo json_encode([
        'success' => false,
        'message' => 'API route not found'
    ]);
}