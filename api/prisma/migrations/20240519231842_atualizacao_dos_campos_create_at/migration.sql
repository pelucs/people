/*
  Warnings:

  - You are about to alter the column `createAt` on the `Cause` table. The data in that column could be lost. The data in that column will be cast from `String` to `DateTime`.
  - You are about to alter the column `createAt` on the `User` table. The data in that column could be lost. The data in that column will be cast from `String` to `DateTime`.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Cause" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "contact" TEXT NOT NULL,
    "createAt" DATETIME NOT NULL,
    "location" TEXT NOT NULL,
    CONSTRAINT "Cause_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Cause" ("contact", "createAt", "description", "email", "id", "location", "title", "userId") SELECT "contact", "createAt", "description", "email", "id", "location", "title", "userId" FROM "Cause";
DROP TABLE "Cause";
ALTER TABLE "new_Cause" RENAME TO "Cause";
CREATE TABLE "new_User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "createAt" DATETIME NOT NULL,
    "contact" TEXT,
    "address" TEXT
);
INSERT INTO "new_User" ("address", "contact", "createAt", "email", "id", "name", "password", "type") SELECT "address", "contact", "createAt", "email", "id", "name", "password", "type" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
PRAGMA foreign_key_check("Cause");
PRAGMA foreign_key_check("User");
PRAGMA foreign_keys=ON;
