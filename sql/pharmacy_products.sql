-- pharmacy.products definition

CREATE TABLE `products` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `product_type_id` tinyint NOT NULL,
  `bottle_stock` int DEFAULT '0',
  `bottle_volume` int DEFAULT '0',
  `total_quantity` double NOT NULL,
  `price_per_unit` double NOT NULL,
  `product_unit_id` tinyint NOT NULL,
  `product_category_id` int unsigned DEFAULT NULL,
  `product_img_path` varchar(100) DEFAULT NULL,
  `price_capital` double NOT NULL,
  PRIMARY KEY (`id`),
  KEY `product_type_id` (`product_type_id`),
  KEY `product_unit_id` (`product_unit_id`),
  KEY `product_category_id` (`product_category_id`),
  CONSTRAINT `products_ibfk_1` FOREIGN KEY (`product_type_id`) REFERENCES `product_types` (`id`),
  CONSTRAINT `products_ibfk_2` FOREIGN KEY (`product_unit_id`) REFERENCES `product_units` (`id`),
  CONSTRAINT `products_ibfk_3` FOREIGN KEY (`product_category_id`) REFERENCES `product_categories` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;