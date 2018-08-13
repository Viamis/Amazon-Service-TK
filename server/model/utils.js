const handleResults = (err, results, callback, startTime) => {
  // console.log('Query time:', new Date() - startTime);
  if (err) {
    console.error(err);
    callback(err);
  } else {
    callback(null, results);
  }
};

const generateAddProductString = (data, id) => {
  const placeholders = [];
  for (key in data) {
    placeholders.push('?');
  }
  let queryString = 'INSERT INTO products ';
  queryString += `(id,${Object.keys(data).join(',')}) `;
  queryString += `VALUES (${id},${placeholders.join(',')})`;
  return queryString;
};

const generateUpdateProductString = (productId, data) => {
  const assignments = [];
  for (key in data) {
    assignments.push(`${key}=?`);
  }
  let queryString = 'UPDATE products SET ';
  queryString += assignments.join(',');
  queryString += ` WHERE id=${productId}`;
  return queryString;
};

const translateDataForClient = (results) => {
  const related = results.variants.map(variant => ({
    price: { sale: variant.price },
    product_tier: variant.tier,
    thumbnail: `https://${variant.thumbnailUrl}`,
  }));
  return {
    related,
    data: {
      id: results.id,
      about_product: results.descriptions,
      brand: results.brand,
      is_prime: results.is_prime,
      name: results.product_name,
      price: { sale: results.product_price },
      product_options: {
        color: ['green', 'white', 'blue', 'black', 'silver', 'purple'],
        size: ['S', 'M', 'L', 'XL'],
      },
      product_tier: results.product_tier,
      questions: results.num_questions,
      reviews: results.review_totals,
      seller: results.seller_name,
      stockCount: results.stock_count,
      thumbnail: `https://${results.thumbnail_url}`,
    },
  };
};

module.exports = {
  handleResults,
  generateAddProductString,
  generateUpdateProductString,
  translateDataForClient,
};

// const execMultiple = (queryStrings, callback) => {
//   const next = () => {
//     const queryString = queryStrings.pop();
//     if (queryString) {
//       connection.query(queryString, (err, results) => {
//         handleResults(err, results, next);
//       });
//     } else {
//       callback();
//     }
//   };
//   next();
// };
