const tab = str => `${str}\t`;

const randomInt = (min, max) => (
  min + Math.floor(Math.random() * (max - min))
);

const ltrs = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'];

const generateName = (index, length) => {
  let result = '';
  for (let i = 0; i < length; i++) {
    result += ltrs[index % 10];
    index = Math.floor(index / 10);
  }
  return result;
};

const color = ['green', 'white', 'blue', 'black', 'silver', 'purple'];

const size = ['S', 'M', 'L', 'XL'];

const text = 'Lorem ipsum dolor amet aliqua 8-bit cillum lumbersexual la croix, squid austin cliche deserunt master cleanse +1. Sustainable sed in, blue bottle edison bulb sartorial crucifix cred neutra marfa. Mixtape godard messenger bag vegan, echo park gochujang next level unicorn polaroid. Raw denim hammock shoreditch do. Fixie cred gochujang, schlitz eiusmod tumblr meggings celiac XOXO messenger bag fingerstache tbh. Four dollar toast velit anim, ex cronut quis brooklyn hot chicken. Ramps dolore cornhole aliquip next level, shaman fingerstache. Lorem copper mug shaman 3 wolf moon. Photo booth butcher ipsum, cronut aliqua health goth exercitation. Unicorn nostrud scenester jean shorts. Distillery pinterest butcher farm-to-table, iceland synth brunch la croix. Blog sartorial DIY, eu qui migas lomo poutine. Marfa selvage artisan nulla gastropub, wayfarers readymade photo booth jean shorts air plant glossier. Vegan flexitarian next level twee quis officia chillwave, small batch franzen banh mi. Adipisicing shabby chic velit authentic, asymmetrical aesthetic prism. 90s in echo park, laborum air plant succulents listicle swag vinyl esse kickstarter aliquip. Dolore trust fund +1 nulla 3 wolf moon heirloom pop-up master cleanse asymmetrical poutine. Af humblebrag whatever tilde raclette, sint vaporware veniam four dollar toast. Cloud bread keffiyeh DIY, pug intelligentsia cold-pressed adaptogen disrupt direct trade est yr tumeric eiusmod poke. Adipisicing listicle chillwave, plaid ea dolore palo santo artisan taxidermy iPhone. Pickled pug consequat, bushwick sustainable shabby chic shaman nulla umami street art four dollar toast humblebrag biodiesel. Actually banh mi intelligentsia wolf whatever knausgaard tumeric ex, umami eiusmod poutine cupidatat iPhone art party glossier. Artisan occaecat small batch pariatur nostrud. Umami coloring book enim, post-ironic aliquip taxidermy neutra adipisicing mixtape cupidatat glossier. Aesthetic meh pour-over dolore enamel pin pickled.';

const sentences = text.split('.');

module.exports = { tab, randomInt, generateName, color, size, sentences };
