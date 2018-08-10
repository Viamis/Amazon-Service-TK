CREATE INDEX product_name ON products (product_name);

CREATE INDEX product_id_about ON about_product (product_id);
ALTER TABLE about_product ADD CONSTRAINT fk_about FOREIGN KEY (product_id) REFERENCES products(id);

CREATE INDEX product_id_related ON related_products (product_id);
ALTER TABLE related_products ADD CONSTRAINT fk_related FOREIGN KEY (product_id) REFERENCES products(id);
