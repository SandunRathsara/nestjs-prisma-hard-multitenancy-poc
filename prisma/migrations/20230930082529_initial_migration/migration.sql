-- CreateTable
CREATE TABLE "Inspection" (
    "id" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "policyNumber" TEXT NOT NULL,
    "policyHolder" TEXT NOT NULL,

    CONSTRAINT "Inspection_pkey" PRIMARY KEY ("id")
);
