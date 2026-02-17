-- CreateTable
CREATE TABLE "course" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "alternativeName" TEXT,

    CONSTRAINT "course_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "semester" (
    "id" TEXT NOT NULL,
    "number" INTEGER NOT NULL,
    "courseId" TEXT NOT NULL,

    CONSTRAINT "semester_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "subject" (
    "id" TEXT NOT NULL,
    "number" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "semesterId" TEXT NOT NULL,

    CONSTRAINT "subject_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "subject_prerequisite" (
    "dependentId" TEXT NOT NULL,
    "prerequisiteId" TEXT NOT NULL,

    CONSTRAINT "subject_prerequisite_pkey" PRIMARY KEY ("dependentId","prerequisiteId")
);

-- CreateTable
CREATE TABLE "subject_book" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "subjectId" TEXT NOT NULL,

    CONSTRAINT "subject_book_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "lesson" (
    "id" TEXT NOT NULL,
    "number" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "durationSeconds" INTEGER,
    "embedUrl" TEXT NOT NULL,
    "subjectId" TEXT NOT NULL,

    CONSTRAINT "lesson_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "course_slug_key" ON "course"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "semester_courseId_number_key" ON "semester"("courseId", "number");

-- CreateIndex
CREATE UNIQUE INDEX "subject_semesterId_number_key" ON "subject"("semesterId", "number");

-- CreateIndex
CREATE INDEX "subject_prerequisite_prerequisiteId_idx" ON "subject_prerequisite"("prerequisiteId");

-- CreateIndex
CREATE INDEX "subject_book_subjectId_idx" ON "subject_book"("subjectId");

-- CreateIndex
CREATE UNIQUE INDEX "lesson_subjectId_number_key" ON "lesson"("subjectId", "number");

-- AddForeignKey
ALTER TABLE "semester" ADD CONSTRAINT "semester_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "course"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "subject" ADD CONSTRAINT "subject_semesterId_fkey" FOREIGN KEY ("semesterId") REFERENCES "semester"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "subject_prerequisite" ADD CONSTRAINT "subject_prerequisite_dependentId_fkey" FOREIGN KEY ("dependentId") REFERENCES "subject"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "subject_prerequisite" ADD CONSTRAINT "subject_prerequisite_prerequisiteId_fkey" FOREIGN KEY ("prerequisiteId") REFERENCES "subject"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "subject_book" ADD CONSTRAINT "subject_book_subjectId_fkey" FOREIGN KEY ("subjectId") REFERENCES "subject"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "lesson" ADD CONSTRAINT "lesson_subjectId_fkey" FOREIGN KEY ("subjectId") REFERENCES "subject"("id") ON DELETE CASCADE ON UPDATE CASCADE;
