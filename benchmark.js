const siege = require('siege');
const {
  generateWeightedId,
  generateWeightedName,
  generateProductInfo,
} = require('./loadTestData.js');

let sieger = siege().on(3003);

// GET product by id
// for (let i = 0; i < 100000; i++) {
//   sieger = sieger.for(1).times.get(`/products/${generateWeightedId()}`);
// }

// GET product by name
for (let i = 0; i < 100000; i++) {
  sieger = sieger.for(1).times.get(`/products/${generateWeightedName()}`);
}

// PATCH product data
for (let i = 0; i < 1000; i++) {
  const data = generateProductInfo();
  sieger = sieger.for(1).times.post(`/products/${data.id}`, data.body);
}

sieger.attack();
