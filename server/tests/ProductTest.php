<?php

use PHPUnit\Framework\TestCase;

require_once __DIR__ . '/../config/database.php';
require_once __DIR__ . '/../models/Product.php';

class ProductTest extends TestCase
{
    private PDO $db;
    private Product $product;

    protected function setUp(): void
    {
        $database = new Database();

        $this->db = $database->getConnection();

        $this->product = new Product($this->db);
    }

    public function testGetAllProducts(): void
    {
        $products = $this->product->all();

        $this->assertIsArray($products);
    }

    public function testFindProductById(): void
    {
        $product = $this->product->findById(1);

        $this->assertIsArray($product);
        $this->assertEquals(1, $product['id']);
    }
}