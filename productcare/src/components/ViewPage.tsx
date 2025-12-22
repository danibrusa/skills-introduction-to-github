import React, { useEffect } from 'react';
import { useProducts } from '../hooks/useProducts';
import { Product } from '../types/Product';
import './ViewPage.css';

const ViewPage: React.FC = () => {
  const { products, loading, deleteProduct, refreshProducts } = useProducts();

  useEffect(() => {
    refreshProducts();
  }, [refreshProducts]);

  const formatDate = (date: Date): string => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getDaysAgo = (date: Date): number => {
    const today = new Date();
    const expirationDate = new Date(date);
    const diffTime = today.getTime() - expirationDate.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const isExpired = (date: Date): boolean => {
    const today = new Date();
    const expirationDate = new Date(date);
    return expirationDate < today;
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      deleteProduct(id);
    }
  };

  // Sort products by expiration date descending
  const sortedProducts = [...products].sort((a, b) => 
    b.expirationDate.getTime() - a.expirationDate.getTime()
  );

  if (loading) {
    return (
      <div className="view-page">
        <h1>All Products</h1>
        <div className="loading">Loading products...</div>
      </div>
    );
  }

  return (
    <div className="view-page">
      <h1>All Products</h1>
      <p className="subtitle">
        All products stored in the system (sorted by expiration date, descending)
      </p>

      {sortedProducts.length === 0 ? (
        <div className="empty-state">
          <p>No products found.</p>
          <p className="hint">Scan or add products to see them here.</p>
        </div>
      ) : (
        <div className="products-list">
          {sortedProducts.map((product: Product) => (
            <div key={product.id} className="product-card">
              <div className="product-header">
                <h3>{product.name}</h3>
                <button
                  onClick={() => handleDelete(product.id)}
                  className="btn-delete"
                  title="Delete product"
                >
                  ×
                </button>
              </div>
              
              <div className="product-info">
                <div className="info-row">
                  <span className="label">Expiration Date:</span>
                  <span className={`value ${isExpired(product.expirationDate) ? 'expired' : ''}`}>
                    {formatDate(product.expirationDate)} 
                    {isExpired(product.expirationDate) && (
                      <span className="days-ago">
                        ({getDaysAgo(product.expirationDate)} days ago)
                      </span>
                    )}
                  </span>
                </div>
                
                <div className="info-row">
                  <span className="label">Barcode:</span>
                  <span className="value barcode">{product.barcode}</span>
                </div>
                
                <div className="info-row">
                  <span className="label">Scanned Date:</span>
                  <span className="value">{formatDate(product.scannedDate)}</span>
                </div>
                
                <div className="info-row description">
                  <span className="label">Description:</span>
                  <p className="value">{product.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {sortedProducts.length > 0 && (
        <div className="stats">
          <p>Total products: <strong>{sortedProducts.length}</strong></p>
        </div>
      )}
    </div>
  );
};

export default ViewPage;
