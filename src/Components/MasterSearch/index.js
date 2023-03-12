import React from "react";

class App extends React.Component {
  state = {
    searchInput: "",
    products: [],
  };

  handleSearchInputChange = (event) => {
    this.setState({ searchInput: event.target.value });
  };

  handleSearch = async () => {
    const { searchInput } = this.state;
    const response = await fetch(
        `http://localhost:5000/search?query=${searchInput}`
    );
    const products = await response.json();
    this.setState({ products });
  };

  render() {
    const { products } = this.state;
    return (
      <div>
        <div>
          <input type="text" onChange={this.handleSearchInputChange} />
          <button onClick={this.handleSearch}>Search</button>
        </div>
        <div>
          {products.map((product) => (
            <div
              key={product.id}
              style={{ border: "1px solid black", margin: "10px", padding: "10px", display: "flex", flexDirection: "column", alignItems: "center", width: "300px" }}
              onClick={() => { window.location.href = product.image; }}
            >
              <img src={product.image} alt={product.name} style={{ width: "100px", height: "100px" }} />
              <h3>{product.name}</h3>
              <p>Price: ${product.price}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default App;
