import React, { useState, useEffect, useRef } from 'react';
import { Html5Qrcode } from 'html5-qrcode';
import { useProducts } from '../hooks/useProducts';
import './ScanPage.css';

const ScanPage: React.FC = () => {
  const { addProduct } = useProducts();
  const [scanning, setScanning] = useState<boolean>(false);
  const [scannedCode, setScannedCode] = useState<string>('');
  const [showForm, setShowForm] = useState<boolean>(false);
  const [formData, setFormData] = useState({
    name: '',
    expirationDate: '',
    description: ''
  });
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);
  const scannerRef = useRef<Html5Qrcode | null>(null);
  const isScanning = useRef<boolean>(false);

  useEffect(() => {
    return () => {
      // Cleanup scanner on unmount
      if (scannerRef.current && isScanning.current) {
        scannerRef.current.stop().catch(console.error);
      }
    };
  }, []);

  const startScanning = async () => {
    try {
      const scanner = new Html5Qrcode('qr-reader');
      scannerRef.current = scanner;
      isScanning.current = true;
      setScanning(true);
      setMessage(null);

      await scanner.start(
        { facingMode: 'environment' },
        {
          fps: 10,
          qrbox: { width: 250, height: 250 }
        },
        (decodedText) => {
          setScannedCode(decodedText);
          setShowForm(true);
          stopScanning();
        },
        (errorMessage) => {
          // Suppress error messages during scanning
        }
      );
    } catch (error) {
      console.error('Error starting scanner:', error);
      setMessage({ type: 'error', text: 'Failed to start camera. Please check permissions.' });
      setScanning(false);
      isScanning.current = false;
    }
  };

  const stopScanning = async () => {
    if (scannerRef.current && isScanning.current) {
      try {
        await scannerRef.current.stop();
        isScanning.current = false;
        setScanning(false);
      } catch (error) {
        console.error('Error stopping scanner:', error);
      }
    }
  };

  const handleManualEntry = () => {
    setShowForm(true);
    setScannedCode('MANUAL-' + Date.now());
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.expirationDate || !formData.description) {
      setMessage({ type: 'error', text: 'Please fill in all fields' });
      return;
    }

    try {
      addProduct({
        name: formData.name,
        expirationDate: new Date(formData.expirationDate),
        description: formData.description,
        barcode: scannedCode
      });

      setMessage({ type: 'success', text: 'Product saved successfully!' });
      setFormData({ name: '', expirationDate: '', description: '' });
      setScannedCode('');
      setShowForm(false);
      
      // Clear success message after 3 seconds
      setTimeout(() => setMessage(null), 3000);
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to save product' });
    }
  };

  const handleCancel = () => {
    setShowForm(false);
    setScannedCode('');
    setFormData({ name: '', expirationDate: '', description: '' });
  };

  return (
    <div className="scan-page">
      <h1>Scan Product</h1>
      
      {message && (
        <div className={`message ${message.type}`}>
          {message.text}
        </div>
      )}

      {!showForm && (
        <div className="scan-controls">
          <div id="qr-reader" className="qr-reader"></div>
          
          <div className="button-group">
            {!scanning ? (
              <>
                <button onClick={startScanning} className="btn btn-primary">
                  Start Camera Scan
                </button>
                <button onClick={handleManualEntry} className="btn btn-secondary">
                  Manual Entry
                </button>
              </>
            ) : (
              <button onClick={stopScanning} className="btn btn-danger">
                Stop Scanning
              </button>
            )}
          </div>
        </div>
      )}

      {showForm && (
        <div className="product-form">
          <h2>Product Details</h2>
          <p className="barcode-info">Barcode: {scannedCode}</p>
          
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Product Name *</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Enter product name"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="expirationDate">Expiration Date *</label>
              <input
                type="date"
                id="expirationDate"
                name="expirationDate"
                value={formData.expirationDate}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="description">Description *</label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Enter product description"
                rows={4}
                required
              />
            </div>

            <div className="button-group">
              <button type="submit" className="btn btn-success">
                Save Product
              </button>
              <button type="button" onClick={handleCancel} className="btn btn-secondary">
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default ScanPage;
