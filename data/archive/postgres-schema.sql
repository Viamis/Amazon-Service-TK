DROP TABLE IF EXISTS product_metadata;
DROP TABLE IF EXISTS product_descriptions;
DROP TABLE IF EXISTS related_products;

CREATE TABLE product_metadata (
  id SERIAL,
  brand_name VARCHAR(100) NOT NULL,
  is_prime BOOLEAN NOT NULL,
  num_questions INTEGER NOT NULL,
  product_name VARCHAR(200) NOT NULL,
  product_price DECIMAL NOT NULL,
  product_tier VARCHAR(50) NOT NULL,
  reviews_1_star INTEGER DEFAULT 0,
  reviews_2_star INTEGER DEFAULT 0,
  reviews_3_star INTEGER DEFAULT 0,
  reviews_4_star INTEGER DEFAULT 0,
  reviews_5_star INTEGER DEFAULT 0,
  seller_name VARCHAR(50) NOT NULL,
  stock_count INTEGER NOT NULL,
  thumbnail_url VARCHAR(100) NOT NULL
);

CREATE TABLE product_descriptions (
  id SERIAL NOT NULL,
  description TEXT NOT NULL,
  product_id INTEGER NOT NULL
);

CREATE TABLE related_products (
  id SERIAL NOT NULL,
  product_id INTEGER NOT NULL,
  related_id INTEGER NOT NULL
);

    COPY product_metadata FROM '/Users/benc/Desktop/ben-details/data/generation/sampleData/products_0.tsv' DELIMITER E'\t';
    COPY product_descriptions FROM '/Users/benc/Desktop/ben-details/data/generation/sampleData/descriptions_0.tsv' DELIMITER E'\t';
    COPY related_products FROM '/Users/benc/Desktop/ben-details/data/generation/sampleData/related_0.tsv' DELIMITER E'\t';
    
    COPY product_metadata FROM '/Users/benc/Desktop/ben-details/data/generation/sampleData/products_1.tsv' DELIMITER E'\t';
    COPY product_descriptions FROM '/Users/benc/Desktop/ben-details/data/generation/sampleData/descriptions_1.tsv' DELIMITER E'\t';
    COPY related_products FROM '/Users/benc/Desktop/ben-details/data/generation/sampleData/related_1.tsv' DELIMITER E'\t';
    
    COPY product_metadata FROM '/Users/benc/Desktop/ben-details/data/generation/sampleData/products_2.tsv' DELIMITER E'\t';
    COPY product_descriptions FROM '/Users/benc/Desktop/ben-details/data/generation/sampleData/descriptions_2.tsv' DELIMITER E'\t';
    COPY related_products FROM '/Users/benc/Desktop/ben-details/data/generation/sampleData/related_2.tsv' DELIMITER E'\t';
    
    COPY product_metadata FROM '/Users/benc/Desktop/ben-details/data/generation/sampleData/products_3.tsv' DELIMITER E'\t';
    COPY product_descriptions FROM '/Users/benc/Desktop/ben-details/data/generation/sampleData/descriptions_3.tsv' DELIMITER E'\t';
    COPY related_products FROM '/Users/benc/Desktop/ben-details/data/generation/sampleData/related_3.tsv' DELIMITER E'\t';
    
    COPY product_metadata FROM '/Users/benc/Desktop/ben-details/data/generation/sampleData/products_4.tsv' DELIMITER E'\t';
    COPY product_descriptions FROM '/Users/benc/Desktop/ben-details/data/generation/sampleData/descriptions_4.tsv' DELIMITER E'\t';
    COPY related_products FROM '/Users/benc/Desktop/ben-details/data/generation/sampleData/related_4.tsv' DELIMITER E'\t';
    
    COPY product_metadata FROM '/Users/benc/Desktop/ben-details/data/generation/sampleData/products_5.tsv' DELIMITER E'\t';
    COPY product_descriptions FROM '/Users/benc/Desktop/ben-details/data/generation/sampleData/descriptions_5.tsv' DELIMITER E'\t';
    COPY related_products FROM '/Users/benc/Desktop/ben-details/data/generation/sampleData/related_5.tsv' DELIMITER E'\t';
    
    COPY product_metadata FROM '/Users/benc/Desktop/ben-details/data/generation/sampleData/products_6.tsv' DELIMITER E'\t';
    COPY product_descriptions FROM '/Users/benc/Desktop/ben-details/data/generation/sampleData/descriptions_6.tsv' DELIMITER E'\t';
    COPY related_products FROM '/Users/benc/Desktop/ben-details/data/generation/sampleData/related_6.tsv' DELIMITER E'\t';
    
    COPY product_metadata FROM '/Users/benc/Desktop/ben-details/data/generation/sampleData/products_7.tsv' DELIMITER E'\t';
    COPY product_descriptions FROM '/Users/benc/Desktop/ben-details/data/generation/sampleData/descriptions_7.tsv' DELIMITER E'\t';
    COPY related_products FROM '/Users/benc/Desktop/ben-details/data/generation/sampleData/related_7.tsv' DELIMITER E'\t';
    
    COPY product_metadata FROM '/Users/benc/Desktop/ben-details/data/generation/sampleData/products_8.tsv' DELIMITER E'\t';
    COPY product_descriptions FROM '/Users/benc/Desktop/ben-details/data/generation/sampleData/descriptions_8.tsv' DELIMITER E'\t';
    COPY related_products FROM '/Users/benc/Desktop/ben-details/data/generation/sampleData/related_8.tsv' DELIMITER E'\t';
    
    COPY product_metadata FROM '/Users/benc/Desktop/ben-details/data/generation/sampleData/products_9.tsv' DELIMITER E'\t';
    COPY product_descriptions FROM '/Users/benc/Desktop/ben-details/data/generation/sampleData/descriptions_9.tsv' DELIMITER E'\t';
    COPY related_products FROM '/Users/benc/Desktop/ben-details/data/generation/sampleData/related_9.tsv' DELIMITER E'\t';
    SELECT setval('product_metadata_id_seq', COALESCE((SELECT MAX(id)+1 FROM product_metadata), 1), false);