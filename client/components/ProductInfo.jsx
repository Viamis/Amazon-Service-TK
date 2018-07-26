import React from 'react';
import productData from './mockData.js';
import ItemOverview from './productInfoComponents/ItemOverview.jsx';
import ItemPricing from './productInfoComponents/ItemPricing.jsx';
import ItemOptions from './productInfoComponents/ItemOptions.jsx';
import ItemDescription from './productInfoComponents/ItemDescription.jsx';

class ProductInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      productId: 1,
      product: productData.data[0],
      relatedProducts: [],
    };
  }

  get() {
    fetch('http://127.0.0.1:3003/products/1')
      .then(response => response.json())
      .then(obj => console.log(obj))
      .catch(err => console.error(err));
  }

  render() {
    const { product } = this.state;
    const { brand, name, productTier } = product;
    const { reviews, stars, questions } = product;
    const { price, isPrime } = product;
    const { productOptions } = product;
    const { aboutProduct } = product;
    const { relatedProducts } = this.state;

    return (
      <div className="product-info">
        <ItemOverview
          title={{ brand, name, productTier }}
          reviews={{ reviews, stars, questions }} />
        <ItemPricing price={price} isPrime={isPrime} />
        <ItemOptions options={productOptions} related={relatedProducts} />
        <ItemDescription description={aboutProduct} />
      </div>
    );
  }
}

export default ProductInfo;
