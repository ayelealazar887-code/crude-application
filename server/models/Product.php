<?php

class Product
{
    public function __construct(
        private PDO $db
    ) {}

    public function all(): array
    {
        $stmt = $this->db->query(
            "SELECT *
             FROM products
             ORDER BY id DESC"
        );

        return $stmt->fetchAll();
    }

    public function findById(int $id): ?array
    {
        $stmt = $this->db->prepare(
            "SELECT *
             FROM products
             WHERE id = :id
             LIMIT 1"
        );

        $stmt->execute([
            'id' => $id
        ]);

        $product = $stmt->fetch();

        return $product ?: null;
    }

    public function create(
        string $name,
        string $category,
        float $price,
        int $stock,
        string $status
    ): int {
        $stmt = $this->db->prepare(
            "INSERT INTO products
                (name, category, price, stock, status)
             VALUES
                (:name, :category, :price, :stock, :status)"
        );

        $stmt->execute([
            'name' => $name,
            'category' => $category,
            'price' => $price,
            'stock' => $stock,
            'status' => $status
        ]);

        return (int) $this->db->lastInsertId();
    }

    public function update(
        int $id,
        string $name,
        string $category,
        float $price,
        int $stock,
        string $status
    ): bool {
        $stmt = $this->db->prepare(
            "UPDATE products
             SET
                name = :name,
                category = :category,
                price = :price,
                stock = :stock,
                status = :status
             WHERE id = :id"
        );

        return $stmt->execute([
            'id' => $id,
            'name' => $name,
            'category' => $category,
            'price' => $price,
            'stock' => $stock,
            'status' => $status
        ]);
    }

    public function delete(int $id): bool
    {
        $stmt = $this->db->prepare(
            "DELETE FROM products
             WHERE id = :id"
        );

        return $stmt->execute([
            'id' => $id
        ]);
    }
}