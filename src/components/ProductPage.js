'use client'
import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import axios from 'axios';
import { api } from '@/hooks/Api';

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');
  const { addToCart } = useCart();

  useEffect(() => {
    // API'den ürünleri çekmek
    api.get('/products?search=') // API endpointini buraya yaz
      .then(response => {
        setProducts(response.data);
      })
      .catch(error => console.log(error));
  }, []);

  // Arama fonksiyonu
  const handleSearch = () => {
    api.get(`/products?search=${search}`) // Arama query'sini API'ye gönder
      .then(response => setProducts(response.data))
      .catch(error => console.log(error));
  };

  return (
    <div style={{ padding: '20px', backgroundColor: '#F1EFEC' }}>
      {/* Arama Çubuğu */}
      <div style={{ marginBottom: '20px', textAlign: 'center' }}>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Ürün Ara"
          style={{
            padding: '10px',
            width: '80%',
            border: '1px solid #123458',
            borderRadius: '5px',
            marginRight: '10px',
          }}
        />
        <button
          onClick={handleSearch}
          style={{
            padding: '10px 20px',
            backgroundColor: '#123458',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
          }}
        >
          Ara
        </button>
      </div>

      {/* Ürün Liste */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px' }}>
        {products.map((product) => (
          <div
            key={product.id}
            style={{
              backgroundColor: '#fff',
              borderRadius: '10px',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
              padding: '20px',
              textAlign: 'center',
              transition: 'transform 0.3s ease',
            }}
            onMouseEnter={(e) => (e.target.style.transform = 'scale(1.05)')}
            onMouseLeave={(e) => (e.target.style.transform = 'scale(1)')}
          >
            <img
              src={product?.imageUrl}
              alt={product.name}
              style={{
                width: '100%',
                height: 'auto',
                borderRadius: '8px',
                marginBottom: '10px',
              }}
            />
            <h3
              style={{
                fontSize: '18px',
                fontWeight: 'bold',
                color: '#123458',
                marginBottom: '10px',
              }}
            >
              {product.name}
            </h3>
            <p style={{ fontSize: '16px', color: '#D4C9BE', marginBottom: '10px' }}>
              {product.price}₺
            </p>
            <button
              onClick={() => addToCart(product)}
              style={{
                padding: '10px 20px',
                backgroundColor: '#123458',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
              }}
            >
              Sepete Ekle
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
