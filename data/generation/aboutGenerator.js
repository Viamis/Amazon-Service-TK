const fs = require('fs');

const {
  productCount, batchCount, tab, randomInt,
} = require('./utils.js');

const text = 'Lorem ipsum dolor amet aliqua 8-bit cillum lumbersexual la croix, squid austin cliche deserunt master cleanse +1. Sustainable sed in, blue bottle edison bulb sartorial crucifix cred neutra marfa. Mixtape godard messenger bag vegan, echo park gochujang next level unicorn polaroid. Raw denim hammock shoreditch do. Fixie cred gochujang, schlitz eiusmod tumblr meggings celiac XOXO messenger bag fingerstache tbh. Four dollar toast velit anim, ex cronut quis brooklyn hot chicken. Ramps dolore cornhole aliquip next level, shaman fingerstache. Lorem copper mug shaman 3 wolf moon. Photo booth butcher ipsum, cronut aliqua health goth exercitation. Unicorn nostrud scenester jean shorts. Distillery pinterest butcher farm-to-table, iceland synth brunch la croix. Blog sartorial DIY, eu qui migas lomo poutine. Marfa selvage artisan nulla gastropub, wayfarers readymade photo booth jean shorts air plant glossier. Vegan flexitarian next level twee quis officia chillwave, small batch franzen banh mi. Adipisicing shabby chic velit authentic, asymmetrical aesthetic prism. 90s in echo park, laborum air plant succulents listicle swag vinyl esse kickstarter aliquip. Dolore trust fund +1 nulla 3 wolf moon heirloom pop-up master cleanse asymmetrical poutine. Af humblebrag whatever tilde raclette, sint vaporware veniam four dollar toast. Cloud bread keffiyeh DIY, pug intelligentsia cold-pressed adaptogen disrupt direct trade est yr tumeric eiusmod poke. Adipisicing listicle chillwave, plaid ea dolore palo santo artisan taxidermy iPhone. Pickled pug consequat, bushwick sustainable shabby chic shaman nulla umami street art four dollar toast humblebrag biodiesel. Actually banh mi intelligentsia wolf whatever knausgaard tumeric ex, umami eiusmod poutine cupidatat iPhone art party glossier. Artisan occaecat small batch pariatur nostrud. Umami coloring book enim, post-ironic aliquip taxidermy neutra adipisicing mixtape cupidatat glossier. Aesthetic meh pour-over dolore enamel pin pickled.';
const sentences = text.split('.');

const generateAbout = (productId, productCount) => {
  let lines = '';
  for (let i = 0; i < 3; i++) {
    const sentence = sentences[randomInt(0, sentences.length)].trim();
    lines += `${tab(productId)}${sentence}\n`;
  }
  return lines;
};

const writeBatch = (start = 1, end, batchId = 1, productCount) => {
  const startTime = new Date();

  const stream = fs.createWriteStream(`${__dirname}/sampleData/about_${batchId}.tsv`);
  for (let i = start; i < end; i++) {
    stream.write(`${generateAbout(i, productCount)}`);
  }
  stream.on('end', () => stream.end());

  console.log(new Date() - startTime);
};

const writeAbout = (productCount, batchSize) => {
  for (let i = 1; i < productCount; i += batchSize) {
    const start = i;
    const end = i + batchSize;
    const batchId = Math.floor(i / batchSize);
    writeBatch(start, end, batchId, productCount);
  }
};

writeAbout(productCount, productCount / batchCount);
