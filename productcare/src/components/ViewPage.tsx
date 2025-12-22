import React, { useEffect } from 'react';
import { useProducts } from '../hooks/useProducts';
import { Product } from '../types/Product';
import './ViewPage.css';

const ViewPage: React.FC = () => {
  const { archivedProducts, loading, deleteProduct, refreshProducts } = useProducts();

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

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      deleteProduct(id);
    }
  };

  if (loading) {
    return (
      <div className="view-page">
        <h1>Archived Products</h1>
        <div className="loading">Loading products...</div>
      </div>
    );
  }

  return (
    <div className="view-page">
      <h1>Archived Products</h1>
      <p className="subtitle">
        Products with expiration date older than 10 days (sorted by expiration date, descending)
      </p>

      {archivedProducts.length === 0 ? (
        <div className="empty-state">
          <p>No archived products found.</p>
          <p className="hint">Products that expired more than 10 days ago will appear here.</p>
        </div>
      ) : (
        <div className="products-list">
          {archivedProducts.map((product: Product) => (
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
                  <span className="value expired">
                    {formatDate(product.expirationDate)} 
                    <span className="days-ago">
                      ({getDaysAgo(product.expirationDate)} days ago)
                    </span>
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

      {archivedProducts.length > 0 && (
        <div className="stats">
          <p>Total archived products: <strong>{archivedProducts.length}</strong></p>
        </div>
      )}
    </div>
  );
};

export default ViewPage;
