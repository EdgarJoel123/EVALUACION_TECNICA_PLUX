/*
 Navicat Premium Dump SQL

 Source Server         : SixstarHotelsLocal
 Source Server Type    : PostgreSQL
 Source Server Version : 150007 (150007)
 Source Host           : localhost:5432
 Source Catalog        : pagoplux_db
 Source Schema         : pagoplux_db

 Target Server Type    : PostgreSQL
 Target Server Version : 150007 (150007)
 File Encoding         : 65001

 Date: 24/03/2025 10:22:48
*/


-- ----------------------------
-- Sequence structure for papx_pagos_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "pagoplux_db"."papx_pagos_seq";
CREATE SEQUENCE "pagoplux_db"."papx_pagos_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 9223372036854775807
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for papx_users_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "pagoplux_db"."papx_users_seq";
CREATE SEQUENCE "pagoplux_db"."papx_users_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 9223372036854775807
START 1
CACHE 1;

-- ----------------------------
-- Table structure for papx_pagos
-- ----------------------------
DROP TABLE IF EXISTS "pagoplux_db"."papx_pagos";
CREATE TABLE "pagoplux_db"."papx_pagos" (
  "id_pagos" int8 NOT NULL DEFAULT nextval('"pagoplux_db".papx_pagos_seq'::regclass),
  "user_id" int8,
  "monto" numeric(10,2),
  "descripcion" varchar(255) COLLATE "pg_catalog"."default",
  "fecha_pago" timestamptz(6),
  "monto_cero" numeric(10,2),
  "monto_12" numeric(10,2),
  "whatsapp" varchar(20) COLLATE "pg_catalog"."default",
  "ci" varchar(15) COLLATE "pg_catalog"."default",
  "direccion" varchar(255) COLLATE "pg_catalog"."default",
  "nombre_pago" varchar(255) COLLATE "pg_catalog"."default",
  "email_pago" varchar(255) COLLATE "pg_catalog"."default",
  "telefono" varchar(20) COLLATE "pg_catalog"."default",
  "parent_id" varchar(255) COLLATE "pg_catalog"."default"
)
;

-- ----------------------------
-- Records of papx_pagos
-- ----------------------------
INSERT INTO "pagoplux_db"."papx_pagos" VALUES (1, 1, 150.75, 'Pago de prueba por Postman', '2025-03-19 12:31:36.688236-05', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO "pagoplux_db"."papx_pagos" VALUES (2, 1, 150.75, 'Pago de prueba por Postman', '2025-03-19 13:34:39.665136-05', 2.00, 3.00, '+593993778542', '1710010002', 'Vencedores y Acacias', 'Nombre Cliente', 'email_cliente@correo.com', '0999777888', NULL);
INSERT INTO "pagoplux_db"."papx_pagos" VALUES (3, 1, 150.75, 'Pago de prueba por Postman', '2025-03-19 13:46:23.915917-05', 2.00, 3.00, '+593989353272', '1710010002', 'Vencedores y Acacias', 'Nombre Cliente', 'email_cliente@correo.com', '0999777888', NULL);
INSERT INTO "pagoplux_db"."papx_pagos" VALUES (4, 1, 150.75, 'Pago de prueba por Postman', '2025-03-19 14:17:51.300583-05', 2.00, 3.00, '+593989353272', '1710010002', 'Vencedores y Acacias', 'Nombre Cliente', 'email_cliente@correo.com', '0999777888', 'd53ed1cf-18db-42db-9d40-f6087966d8a0');
INSERT INTO "pagoplux_db"."papx_pagos" VALUES (5, 1, 150.75, 'Pago de prueba por Postman', '2025-03-23 12:03:12.805473-05', 2.00, 3.00, '+593989353272', '1710010002', 'Vencedores y Acacias', 'Nombre Cliente', 'email_cliente@correo.com', '0999777888', NULL);
INSERT INTO "pagoplux_db"."papx_pagos" VALUES (6, 1, 150.75, 'Pago de prueba por Postman', '2025-03-23 14:13:05.573882-05', 2.00, 3.00, '+593989353272', '1710010002', 'Vencedores y Acacias', 'Nombre Cliente', 'email_cliente@correo.com', '0999777888', NULL);
INSERT INTO "pagoplux_db"."papx_pagos" VALUES (7, 1, 150.75, 'Pago de prueba por Postman', '2025-03-23 14:15:17.242177-05', 2.00, 3.00, '+593989353272', '1710010002', 'Vencedores y Acacias', 'Nombre Cliente', 'email_cliente@correo.com', '0999777888', NULL);
INSERT INTO "pagoplux_db"."papx_pagos" VALUES (8, 1, 1500.00, 'Compra de iPhone 15 Pro Max', '2025-03-23 14:46:51.696775-05', 5.00, 1500.00, '+593989353272', '1850201169', 'Ambato', 'Nombre Tarjetahabiente', 'correocliente@gmail.com', '0989353272', 'dc336635-491a-4643-a33c-215ed6b660a7');
INSERT INTO "pagoplux_db"."papx_pagos" VALUES (9, 1, 1500.00, 'Compra de iPhone 15 Pro Max', '2025-03-23 15:04:43.40518-05', 5.00, 1500.00, '+593989353272', '1850201169', 'Ambato', 'Nombre Tarjetahabiente', 'correocliente@gmail.com', '0989353272', 'c6ce0982-382e-464b-b867-37d3dd246b80');
INSERT INTO "pagoplux_db"."papx_pagos" VALUES (10, 1, 1500.00, 'Compra de iPhone 15 Pro Max', '2025-03-23 16:03:36.824935-05', 5.00, 1500.00, '+593989353272', '1850201169', 'Ambato', 'Nombre Tarjetahabiente', 'correocliente@gmail.com', '0989353272', '493ed351-b4a7-4166-af1d-8f225e115415');

-- ----------------------------
-- Table structure for papx_users
-- ----------------------------
DROP TABLE IF EXISTS "pagoplux_db"."papx_users";
CREATE TABLE "pagoplux_db"."papx_users" (
  "id_user" int8 NOT NULL DEFAULT nextval('"pagoplux_db".papx_users_seq'::regclass),
  "username" varchar(100) COLLATE "pg_catalog"."default",
  "password" text COLLATE "pg_catalog"."default",
  "created_at" timestamptz(6)
)
;

-- ----------------------------
-- Records of papx_users
-- ----------------------------
INSERT INTO "pagoplux_db"."papx_users" VALUES (1, 'esanchez', '$2a$10$TQwkrpBPK7TDJw6yJJAnw.6V8.0A78ru5btSrBvtIhuADYEQ2M8ea', '2025-03-19 11:15:10-05');

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
SELECT setval('"pagoplux_db"."papx_pagos_seq"', 10, true);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
SELECT setval('"pagoplux_db"."papx_users_seq"', 1, true);

-- ----------------------------
-- Primary Key structure for table papx_pagos
-- ----------------------------
ALTER TABLE "pagoplux_db"."papx_pagos" ADD CONSTRAINT "papx_pagos_pkey" PRIMARY KEY ("id_pagos");

-- ----------------------------
-- Primary Key structure for table papx_users
-- ----------------------------
ALTER TABLE "pagoplux_db"."papx_users" ADD CONSTRAINT "papx_users_pkey" PRIMARY KEY ("id_user");

-- ----------------------------
-- Foreign Keys structure for table papx_pagos
-- ----------------------------
ALTER TABLE "pagoplux_db"."papx_pagos" ADD CONSTRAINT "pagoplux_db_user_fkey" FOREIGN KEY ("user_id") REFERENCES "pagoplux_db"."papx_users" ("id_user") ON DELETE RESTRICT ON UPDATE RESTRICT;
