const faker = require('faker');
const fs = require('fs');

const {
  productCount,
  batchCount,
  tab,
  randomInt,
  generateName,
  generatePrice,
  generateThumbnail,
} = require('./utils.js');

const text = 'Lorem ipsum dolor amet aliqua 8-bit cillum lumbersexual la croix, squid austin cliche deserunt master cleanse +1. Sustainable sed in, blue bottle edison bulb sartorial crucifix cred neutra marfa. Mixtape godard messenger bag vegan, echo park gochujang next level unicorn polaroid. Raw denim hammock shoreditch do. Fixie cred gochujang, schlitz eiusmod tumblr meggings celiac XOXO messenger bag fingerstache tbh. Four dollar toast velit anim, ex cronut quis brooklyn hot chicken. Ramps dolore cornhole aliquip next level, shaman fingerstache. Lorem copper mug shaman 3 wolf moon. Photo booth butcher ipsum, cronut aliqua health goth exercitation. Unicorn nostrud scenester jean shorts. Distillery pinterest butcher farm-to-table, iceland synth brunch la croix. Blog sartorial DIY, eu qui migas lomo poutine. Marfa selvage artisan nulla gastropub, wayfarers readymade photo booth jean shorts air plant glossier. Vegan flexitarian next level twee quis officia chillwave, small batch franzen banh mi. Adipisicing shabby chic velit authentic, asymmetrical aesthetic prism. 90s in echo park, laborum air plant succulents listicle swag vinyl esse kickstarter aliquip. Dolore trust fund +1 nulla 3 wolf moon heirloom pop-up master cleanse asymmetrical poutine. Af humblebrag whatever tilde raclette, sint vaporware veniam four dollar toast. Cloud bread keffiyeh DIY, pug intelligentsia cold-pressed adaptogen disrupt direct trade est yr tumeric eiusmod poke. Adipisicing listicle chillwave, plaid ea dolore palo santo artisan taxidermy iPhone. Pickled pug consequat, bushwick sustainable shabby chic shaman nulla umami street art four dollar toast humblebrag biodiesel. Actually banh mi intelligentsia wolf whatever knausgaard tumeric ex, umami eiusmod poutine cupidatat iPhone art party glossier. Artisan occaecat small batch pariatur nostrud. Umami coloring book enim, post-ironic aliquip taxidermy neutra adipisicing mixtape cupidatat glossier. Aesthetic meh pour-over dolore enamel pin pickled.';
const sentences = text.split('.');

const generateDescriptions = () => {
  const descriptions = [];
  for (let i = 0; i < 3; i++) {
    const description = sentences[randomInt(0, sentences.length - 1)].trim();
    descriptions.push(`'${description}'`);
  }
  return `[${descriptions}]`;
};

const generateVariants = () => {
  const variants = [];
  const relatedCount = randomInt(0, 9);
  const intervalSize = Math.floor(productCount / relatedCount);
  for (let i = 0; i < relatedCount; i++) {
    const start = intervalSize * i + 1;
    const end = intervalSize * (i + 1) + 1;
    const variantId = randomInt(start, end);
    const variantPrice = `${generatePrice()}`;
    const variantThumbnail = generateThumbnail(variantId);
    const variantTier = faker.company.catchPhraseAdjective();
    variants.push(
      `{ id: ${variantId}, price: ${variantPrice}, thumbnailUrl: ${variantThumbnail}, tier: ${variantTier} }`,
    );
  }
  return `[${variants}]`;
};

const generateReviews = (rawScore) => {
  const reviews = [null, null, null, null, null].map((item, index) => {
    const weight = Math.abs(index / 5 - rawScore);
    return randomInt(0, weight * 1000);
  });
  return `[${reviews}]`;
};

const generateProduct = (id) => {
  const productId = tab(`${id}`);
  const brand = tab(faker.name.lastName());
  const descriptions = tab(generateDescriptions());
  const isPrime = tab(faker.random.boolean());
  const numQuestions = tab(randomInt(3, 50));
  const productPrice = tab(generatePrice());
  const productName = tab(generateName(id - 1, 7));
  const productTier = tab(faker.company.catchPhraseAdjective());
  const reviewTotals = tab(generateReviews(Math.random()));
  const sellerName = tab(faker.name.firstName());
  const stockCount = tab(randomInt(10, 200));
  const thumbnailUrl = tab(generateThumbnail(id));
  const variants = generateVariants();
  return `${productId
    + brand
    + descriptions
    + isPrime
    + numQuestions
    + productName
    + productPrice
    + productTier
    + reviewTotals
    + sellerName
    + stockCount
    + thumbnailUrl
    + variants}\n`;
};

const writeBatch = (start = 1, end, batchId = 1) => {
  const startTime = new Date();

  const stream = fs.createWriteStream(`${__dirname}/sampleData/denormalized_${batchId}.tsv`);
  for (let i = start; i < end; i++) {
    stream.write(`${generateProduct(i)}`);
  }
  stream.on('end', () => stream.end());

  console.log(new Date() - startTime);
};

const writeProducts = (productCount, batchSize) => {
  for (let i = 1; i < productCount; i += batchSize) {
    const start = i;
    const end = i + batchSize;
    const batchId = Math.floor(i / batchSize);
    writeBatch(start, end, batchId);
  }
};

writeProducts(productCount, productCount / batchCount);
