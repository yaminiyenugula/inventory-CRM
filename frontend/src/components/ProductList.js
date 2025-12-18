import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './ProductList.css';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [lowStock, setLowStock] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
    fetchLowStock();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/products');
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const fetchLowStock = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/products/low-stock');
      setLowStock(response.data);
    } catch (error) {
      console.error('Error fetching low stock:', error);
    }
  };

  const deleteProduct = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/products/${id}`);
      fetchProducts();
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  const updateStock = async (id, qty) => {
    try {
      await axios.patch(`http://localhost:8080/api/products/${id}/stock/${qty}`);
      fetchProducts();
      fetchLowStock();
    } catch (error) {
      console.error('Error updating stock:', error);
    }
  };

  return (
    <div className="product-list">
      <h2>Product List</h2>
      <Link to="/add-product">Add Product</Link>
      {lowStock.length > 0 && (
        <div className="low-stock-warning">
          <h3>Low Stock Warning</h3>
          <ul>
            {lowStock.map(product => (
              <li key={product.id}>{product.name} - Quantity: {product.quantity}</li>
            ))}
          </ul>
        </div>
      )}
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Category</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map(product => (
            <tr key={product.id}>
              <td>{product.name}</td>
              <td>{product.description}</td>
              <td>${product.price}</td>
              <td>{product.quantity}</td>
              <td>{product.category}</td>
              <td>
                <button onClick={() => updateStock(product.id, product.quantity + 1)}>Increase Stock</button>
                <button onClick={() => deleteProduct(product.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductList;
