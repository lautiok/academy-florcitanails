import { Chapter, Course, DocumentUrl, UserProgress } from "@prisma/client";
import { Lock } from "lucide-react";
import { ProgressCourse } from "./progressCourse";
import { DocumentsUrl } from "./documentsUrl";

export function InfoCourse({
  infoCourse,
  chapterCourseId,
  userProgress,
  PurchaseCourse,
  videoUrl,
}: {
  infoCourse: Course & {
  chapters: (Chapter & {
    documentUrl: {
      id: string;
      title: string;
      documentUrl: string;
      chapterId: string;
      createdAt: Date;
      updatedAt: Date;
    }[];
  })[];
};
  chapterCourseId: string;
  userProgress: UserProgress[];
  PurchaseCourse: boolean;
  videoUrl: string | undefined | null;
}) {

  return (
    <div className="w-full relative">
      {!PurchaseCourse && (
        <div className="absolute inset-0 flex flex-col items-center justify-center backdrop-blur-md gap-y-2 h-full z-30 rounded-md text-secondary ">
          <Lock className="w-8 h-8" />
          <p className="text-center text-sm">Este curso no está disponible</p>
        </div>
      )}

      {videoUrl && (
        <div className="w-full rounded-md ">
          <iframe
            width="100%"
            height="500"
            src={videoUrl}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          ></iframe>
        </div>
      )}
        <ProgressCourse userProgress={userProgress} chapterCourseId={chapterCourseId} infoCourse={infoCourse} />

   {PurchaseCourse && (
  <div className="mt-6">
    <h3 className="text-lg font-semibold text-slate-800 mb-4">Recursos del curso</h3>
    <DocumentsUrl
      chapter={infoCourse.chapters.find(
        (chapter) => chapter.id === chapterCourseId
      )!}
    />
  </div>
)}


    </div>
  );
}
