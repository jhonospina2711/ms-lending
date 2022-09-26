-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "documentTypeId" INTEGER NOT NULL,
    "document" VARCHAR(30) NOT NULL,
    "name" VARCHAR(200) NOT NULL,
    "last_name" VARCHAR(200) NOT NULL,
    "email" TEXT NOT NULL,
    "cel_phone" TEXT NOT NULL,
    "birth_date" DATE,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "documentType" (
    "id" SERIAL NOT NULL,
    "type" CHAR(4) NOT NULL,
    "name" VARCHAR(200) NOT NULL,

    CONSTRAINT "documentType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Target" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(30) NOT NULL,
    "min_cant" INTEGER,
    "max_cant" INTEGER,
    "min_amount_total" MONEY,
    "max_amount_total" MONEY,
    "rate" DOUBLE PRECISION NOT NULL,
    "max" MONEY,

    CONSTRAINT "Target_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Loan" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "amount" MONEY,
    "term" INTEGER,
    "date" TIMESTAMPTZ(3) NOT NULL,
    "installment" MONEY,
    "target_id" INTEGER NOT NULL,

    CONSTRAINT "Loan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Payment" (
    "id" SERIAL NOT NULL,
    "loan_id" INTEGER NOT NULL,
    "amount" MONEY,
    "debt" MONEY,
    "date" TIMESTAMPTZ(3) NOT NULL,

    CONSTRAINT "Payment_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_cel_phone_key" ON "User"("cel_phone");

-- CreateIndex
CREATE UNIQUE INDEX "documentType_type_key" ON "documentType"("type");

-- CreateIndex
CREATE UNIQUE INDEX "Target_name_key" ON "Target"("name");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_documentTypeId_fkey" FOREIGN KEY ("documentTypeId") REFERENCES "documentType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Loan" ADD CONSTRAINT "Loan_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Loan" ADD CONSTRAINT "Loan_target_id_fkey" FOREIGN KEY ("target_id") REFERENCES "Target"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_loan_id_fkey" FOREIGN KEY ("loan_id") REFERENCES "Loan"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
