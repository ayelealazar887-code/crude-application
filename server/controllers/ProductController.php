<?php

class ProductController
{
    public function __construct(
        private Product $product
    ) {}

    /*
     * GET /api/products
     */
    public function index(): void
    {
        $products = $this->product->all();

        $this->json([
            'success' => true,
            'data' => $products
        ]);
    }

    /*
     * GET /api/products/{id}
     */
    public function show(int $id): void
    {
        $product = $this->product->findById($id);

        if (!$product) {
            $this->json([
                'success' => false,
                'message' => 'Product not found'
            ], 404);

            return;
        }

        $this->json([
            'success' => true,
            'data' => $product
        ]);
    }

    /*
     * POST /api/products
     */
    public function store(): void
    {
        $data = $this->getJsonBody();

        if (
            empty($data['name']) ||
            empty($data['category']) ||
            !isset($data['price']) ||
            !isset($data['stock'])
        ) {
            $this->json([
                'success' => false,
                'message' => 'Name, category, price and stock are required'
            ], 422);

            return;
        }

        $status = $data['status'] ?? 'Active';

        $id = $this->product->create(
            $data['name'],
            $data['category'],
            (float) $data['price'],
            (int) $data['stock'],
            $status
        );

        $this->json([
            'success' => true,
            'message' => 'Product created successfully',
            'data' => [
                'id' => $id
            ]
        ], 201);
    }

    /*
     * PUT /api/products/{id}
     */
    public function update(int $id): void
    {
        $product = $this->product->findById($id);

        if (!$product) {
            $this->json([
                'success' => false,
                'message' => 'Product not found'
            ], 404);

            return;
        }

        $data = $this->getJsonBody();

        if (
            empty($data['name']) ||
            empty($data['category']) ||
            !isset($data['price']) ||
            !isset($data['stock'])
        ) {
            $this->json([
                'success' => false,
                'message' => 'Name, category, price and stock are required'
            ], 422);

            return;
        }

        $status = $data['status'] ?? 'Active';

        $this->product->update(
            $id,
            $data['name'],
            $data['category'],
            (float) $data['price'],
            (int) $data['stock'],
            $status
        );

        $this->json([
            'success' => true,
            'message' => 'Product updated successfully'
        ]);
    }

    /*
     * DELETE /api/products/{id}
     */
    public function destroy(int $id): void
    {
        $product = $this->product->findById($id);

        if (!$product) {
            $this->json([
                'success' => false,
                'message' => 'Product not found'
            ], 404);

            return;
        }

        $this->product->delete($id);

        $this->json([
            'success' => true,
            'message' => 'Product deleted successfully'
        ]);
    }

    private function getJsonBody(): array
    {
        $input = file_get_contents('php://input');

        $data = json_decode($input, true);

        return is_array($data) ? $data : [];
    }

    private function json(
        array $data,
        int $status = 200
    ): void {
        http_response_code($status);

        echo json_encode($data);
    }
}