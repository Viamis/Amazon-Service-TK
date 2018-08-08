const zlib = require('zlib');
const fs = require('fs');

const { randomInt } = require('./helpers.js');

const magnitude = 7;
const relatedHeadings = 'id\tproduct_id\trelated_id\n';

let indexId = 1;

const generateRelated = (productId, productCount) => {
  let lines = '';
  const relatedCount = randomInt(0, 9);
  const intervalSize = Math.floor(productCount / relatedCount);
  for (let i = 0; i < relatedCount; i++) {
    const start = intervalSize * i + 1;
    const end = intervalSize * (i + 1) + 1;
    const relatedId = randomInt(start, end);
    lines += `${indexId++}\t${productId}\t${relatedId}\n`;
  }
  return lines;
}

const writeBatch = (start = 1, end, batchId = 1, productCount) => {
  // const startTime = new Date();

  const out = fs.createWriteStream(`${__dirname}/sampleData/related_${batchId}.tsv`);
  const stream = zlib.createGzip();
  stream.pipe(out);
  stream.write(relatedHeadings);
  for (let i = start; i < end; i++) {
    stream.write(`${generateRelated(i, productCount)}`);
  }
  stream.end();

  // console.log(new Date() - startTime);
};

const writeRelated = (productCount, batchSize = productCount / 10) => {
  for (let i = 1; i < productCount; i += batchSize) {
    const start = i;
    const end = i + batchSize;
    const batchId = Math.floor(i / batchSize);
    writeBatch(start, end, batchId, productCount);
  }
};

writeRelated(10 ** magnitude);
