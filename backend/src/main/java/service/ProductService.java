package com.example.inventorymanagement.service;

import com.example.inventorymanagement.entity.Product;
import com.example.inventorymanagement.repository.ProductRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

/**
 * Service class for managing product operations.
 * Handles business logic for inventory management.
 */
@Service
@Transactional
public class ProductService {

    private final ProductRepository productRepository;

    public ProductService(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    /**
     * Retrieves all products from the inventory.
     *
     * @return List of all products
     */
    @Transactional(readOnly = true)
    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    /**
     * Retrieves a product by ID.
     *
     * @param id Product ID
     * @return Optional containing the product if found
     */
    @Transactional(readOnly = true)
    public Optional<Product> getProductById(Long id) {
        return productRepository.findById(id);
    }

    /**
     * Saves a product to the repository.
     *
     * @param product Product to save
     * @return Saved product
     */
    public Product saveProduct(Product product) {
        return productRepository.save(product);
    }

    /**
     * Deletes a product by ID.
     *
     * @param id Product ID to delete
     */
    public void deleteProduct(Long id) {
        productRepository.deleteById(id);
    }

    /**
     * Retrieves products by category.
     *
     * @param category Product category
     * @return List of products in the category
     */
    @Transactional(readOnly = true)
    public List<Product> getProductsByCategory(String category) {
        return productRepository.findByCategory(category);
    }

    /**
     * Retrieves products with low stock levels.
     *
     * @return List of low stock products
     */
    @Transactional(readOnly = true)
    public List<Product> getLowStockProducts() {
        return productRepository.findLowStockProducts();
    }

    /**
     * Updates the stock quantity of a product.
     *
     * @param id Product ID
     * @param quantity New quantity
     * @return Updated product
     * @throws EntityNotFoundException if product not found
     */
    public Product updateStock(Long id, Integer quantity) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Product not found with id: " + id));
        product.setQuantity(quantity);
        return productRepository.save(product);
    }
}
