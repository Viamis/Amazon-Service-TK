DROP INDEX IF EXISTS product_name;
CREATE INDEX product_name ON product_metadata (product_name);
ALTER TABLE product_metadata ADD PRIMARY KEY (id);

DROP INDEX IF EXISTS product_id_descriptions;
CREATE INDEX product_id_descriptions ON product_descriptions (product_id);
ALTER TABLE product_descriptions ADD CONSTRAINT fk_about FOREIGN KEY (product_id) REFERENCES product_metadata(id);

DROP INDEX IF EXISTS product_id_related;
CREATE INDEX product_id_related ON related_products (product_id);
ALTER TABLE related_products ADD CONSTRAINT fk_related FOREIGN KEY (product_id) REFERENCES product_metadata(id);
