import { Chapter, Course } from "@prisma/client";

export type CourseFormPropType = {
  course: coursewitchRelations;
};

type coursewitchRelations = Course & {
    chapters: Chapter[];
}
