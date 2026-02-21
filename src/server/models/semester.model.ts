import "server-only";

import { SubjectModel } from "@/server/models/subject.model";

export interface SemesterModel {
  id: string;
  number: number;
  subjects: SubjectModel[];
}
