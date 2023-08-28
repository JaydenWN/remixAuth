-- CreateTable
CREATE TABLE "userAccount" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,

    CONSTRAINT "userAccount_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "userAccount_email_key" ON "userAccount"("email");

-- CreateIndex
CREATE UNIQUE INDEX "userAccount_username_key" ON "userAccount"("username");
