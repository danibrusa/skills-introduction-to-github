import { Product } from '../types/Product';

const STORAGE_KEY = 'productcare_products';

export class LocalStorageService {
  // Get all products from localStorage
  static getProducts(): Product[] {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      if (!data) return [];
      
      const products = JSON.parse(data);
      // Convert date strings back to Date objects
      return products.map((product: any) => ({
        ...product,
        expirationDate: new Date(product.expirationDate),
        scannedDate: new Date(product.scannedDate)
      }));
    } catch (error) {
      console.error('Error loading products:', error);
      return [];
    }
  }

  // Save a new product to localStorage
  static saveProduct(product: Product): void {
    try {
      const products = this.getProducts();
      products.push(product);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
    } catch (error) {
      console.error('Error saving product:', error);
      throw error;
    }
  }

  // Get filtered products (expiration date < current date - 10 days)
  static getArchivedProducts(): Product[] {
    const products = this.getProducts();
    const tenDaysAgo = new Date();
    tenDaysAgo.setDate(tenDaysAgo.getDate() - 10);

    return products
      .filter(product => product.expirationDate < tenDaysAgo)
      .sort((a, b) => b.expirationDate.getTime() - a.expirationDate.getTime());
  }

  // Delete a product by ID
  static deleteProduct(id: string): void {
    try {
      const products = this.getProducts();
      const updatedProducts = products.filter(product => product.id !== id);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedProducts));
    } catch (error) {
      console.error('Error deleting product:', error);
      throw error;
    }
  }

  // Clear all products
  static clearProducts(): void {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (error) {
      console.error('Error clearing products:', error);
      throw error;
    }
  }
}
