<?php

function productRoutes(
    string $method,
    ?int $id,
    ProductController $controller
): void {

    if ($method === 'GET' && $id === null) {
        $controller->index();
        return;
    }

    if ($method === 'GET' && $id !== null) {
        $controller->show($id);
        return;
    }

    if ($method === 'POST' && $id === null) {
        $controller->store();
        return;
    }

    if ($method === 'PUT' && $id !== null) {
        $controller->update($id);
        return;
    }

    if ($method === 'DELETE' && $id !== null) {
        $controller->destroy($id);
        return;
    }

    http_response_code(404);

    echo json_encode([
        'success' => false,
        'message' => 'Product route not found'
    ]);
}