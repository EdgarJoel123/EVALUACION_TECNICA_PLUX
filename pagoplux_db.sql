/*
 Navicat Premium Dump SQL

 Source Server         : SixstarHotelsLocal
 Source Server Type    : PostgreSQL
 Source Server Version : 150007 (150007)
 Source Host           : localhost:5432
 Source Catalog        : postgres
 Source Schema         : pagoplux_db

 Target Server Type    : PostgreSQL
 Target Server Version : 150007 (150007)
 File Encoding         : 65001

 Date: 19/03/2025 11:54:30
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
  "fecha_pago" timestamptz(6)
)
;

-- ----------------------------
-- Records of papx_pagos
-- ----------------------------

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
INSERT INTO "pagoplux_db"."papx_users" VALUES (1, 'esanchez', 'MTIzNGpvZWw=', '2025-03-19 11:15:10-05');

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
SELECT setval('"pagoplux_db"."papx_pagos_seq"', 1, false);

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
