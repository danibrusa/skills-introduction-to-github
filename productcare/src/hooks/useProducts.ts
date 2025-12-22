import { useState, useEffect, useCallback } from 'react';
import { Product } from '../types/Product';
import { LocalStorageService } from '../services/LocalStorageService';

export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [archivedProducts, setArchivedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Load products from localStorage
  const loadProducts = useCallback(() => {
    setLoading(true);
    try {
      const allProducts = LocalStorageService.getProducts();
      const archived = LocalStorageService.getArchivedProducts();
      setProducts(allProducts);
      setArchivedProducts(archived);
    } catch (error) {
      console.error('Error loading products:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  // Add a new product
  const addProduct = useCallback((product: Omit<Product, 'id' | 'scannedDate'>) => {
    try {
      const newProduct: Product = {
        ...product,
        id: Date.now().toString() + Math.random().toString(36).substring(2, 11),
        scannedDate: new Date()
      };
      LocalStorageService.saveProduct(newProduct);
      loadProducts();
      return newProduct;
    } catch (error) {
      console.error('Error adding product:', error);
      throw error;
    }
  }, [loadProducts]);

  // Delete a product
  const deleteProduct = useCallback((id: string) => {
    try {
      LocalStorageService.deleteProduct(id);
      loadProducts();
    } catch (error) {
      console.error('Error deleting product:', error);
      throw error;
    }
  }, [loadProducts]);

  // Clear all products
  const clearAllProducts = useCallback(() => {
    try {
      LocalStorageService.clearProducts();
      loadProducts();
    } catch (error) {
      console.error('Error clearing products:', error);
      throw error;
    }
  }, [loadProducts]);

  // Load products on mount
  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  return {
    products,
    archivedProducts,
    loading,
    addProduct,
    deleteProduct,
    clearAllProducts,
    refreshProducts: loadProducts
  };
};
