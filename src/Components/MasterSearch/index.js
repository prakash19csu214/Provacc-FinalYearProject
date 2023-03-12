import React, { useState } from 'react';
import axios from 'axios';
import './index.css'

const MasterSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [products, setProducts] = useState([]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchClick = () => {
    axios.get(`http://localhost:5000/search?query=${searchTerm}`)
      .then(response => {
        setProducts(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  };

  return (
    <div>
      <h1>Product Search</h1>
      <div className="search-container">
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <button onClick={handleSearchClick}>Search</button>
      </div>
      <div className="product-container">
        {products.map(product => (
          <div key={product.id} className="product-card">
            <a href={product.image} target="_blank" rel="noopener noreferrer">
              <img src={product.image} alt={product.name} />
            </a>
            <h2>{product.name}</h2>
            <p>${product.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MasterSearch;
