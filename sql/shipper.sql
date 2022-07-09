-- pharmacy.shipper definition

CREATE TABLE `shipper` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `desc` varchar(100) NOT NULL,
  `price` double NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO pharmacy.shipper
(id, name, `desc`, price)
VALUES(1, 'TIKI', 'two working days', 10000.0);
INSERT INTO pharmacy.shipper
(id, name, `desc`, price)
VALUES(2, 'JNE', 'two working days', 9000.0);
INSERT INTO pharmacy.shipper
(id, name, `desc`, price)
VALUES(3, 'J&T', 'two working days', 8000.0);
INSERT INTO pharmacy.shipper
(id, name, `desc`, price)
VALUES(4, 'SiCepat', 'two working days', 7000.0);
INSERT INTO pharmacy.shipper
(id, name, `desc`, price)
VALUES(5, 'GoSend', 'two hours', 18000.0);
INSERT INTO pharmacy.shipper
(id, name, `desc`, price)
VALUES(6, 'GrabExpress', 'two hours', 18000.0);
