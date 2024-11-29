-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Product" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "price" REAL NOT NULL,
    "description" TEXT NOT NULL,
    "categorieId" TEXT NOT NULL,
    "userId" TEXT,
    "cartId" TEXT,
    CONSTRAINT "Product_categorieId_fkey" FOREIGN KEY ("categorieId") REFERENCES "Categories" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Product_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Product_cartId_fkey" FOREIGN KEY ("cartId") REFERENCES "Cart" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Product" ("cartId", "categorieId", "description", "id", "name", "price", "userId") SELECT "cartId", "categorieId", "description", "id", "name", "price", "userId" FROM "Product";
DROP TABLE "Product";
ALTER TABLE "new_Product" RENAME TO "Product";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
