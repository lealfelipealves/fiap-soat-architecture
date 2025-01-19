/*
  Warnings:

  - The values [RECEIVED,IN_PREPARATION,READY,FINALIZED] on the enum `OrderStatus` will be removed. If these variants are still used in the database, this will fail.
  - The values [SNACK,SIDE_DISH,DRINK,DESSERT] on the enum `ProductCategory` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "OrderStatus_new" AS ENUM ('Recebido', 'Preparação', 'Pronto', 'Finalizado');
ALTER TABLE "orders" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "orders" ALTER COLUMN "status" TYPE "OrderStatus_new" USING ("status"::text::"OrderStatus_new");
ALTER TYPE "OrderStatus" RENAME TO "OrderStatus_old";
ALTER TYPE "OrderStatus_new" RENAME TO "OrderStatus";
DROP TYPE "OrderStatus_old";
ALTER TABLE "orders" ALTER COLUMN "status" SET DEFAULT 'Recebido';
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "ProductCategory_new" AS ENUM ('Lanche', 'Acompanhamento', 'Bebida', 'Sobremesa');
ALTER TABLE "products" ALTER COLUMN "category" DROP DEFAULT;
ALTER TABLE "products" ALTER COLUMN "category" TYPE "ProductCategory_new" USING ("category"::text::"ProductCategory_new");
ALTER TYPE "ProductCategory" RENAME TO "ProductCategory_old";
ALTER TYPE "ProductCategory_new" RENAME TO "ProductCategory";
DROP TYPE "ProductCategory_old";
ALTER TABLE "products" ALTER COLUMN "category" SET DEFAULT 'Lanche';
COMMIT;

-- AlterTable
ALTER TABLE "orders" ALTER COLUMN "status" SET DEFAULT 'Recebido';

-- AlterTable
ALTER TABLE "products" ALTER COLUMN "category" SET DEFAULT 'Lanche';
