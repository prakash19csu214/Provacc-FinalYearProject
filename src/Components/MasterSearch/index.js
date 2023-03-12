import React, { useState } from 'react';
import axios from 'axios';
import './index.css';

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
      <div className="d-flex justify-content-center">
        <h1 className="text-center my-5">Product Search</h1>
      </div>
      <div className="d-flex justify-content-center mb-5">
        <div className="search-container my-3">
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>
        <button className="btn btn-outline-success my-3 " style={{height: '45px'}} type="submit" onClick={handleSearchClick}>Search</button>
      </div>
      <div className="product-container">
        {products.map(product => (
          <div key={product.id} className="product-card mb-5">
            <a href={product.image} target="_blank" rel="noopener noreferrer">
              <img src={product.image} alt={product.name} />
            </a>
            <h2 className='my-5 mx-2'>{product.name}</h2>
            <p className='my-5 mx-2'>Rs.{product.price}</p>
            <p className='my-5 mx-2'>{product.source}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MasterSearch;
