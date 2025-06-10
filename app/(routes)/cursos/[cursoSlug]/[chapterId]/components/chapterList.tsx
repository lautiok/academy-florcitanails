import { Chapter, UserProgress } from "@prisma/client";
import { Check, Lock, Unlock } from "lucide-react";
import Link from "next/link";

export const ChapterList = ({
  chapters,
  cursoSlug,
  currentChapter,
  userProgress,
}: {
  chapters: Chapter[] | null;
  cursoSlug: string;
  currentChapter: string;
  userProgress: UserProgress[];
}) => {
  if (!chapters) return null;

  const orderedChapters = [...chapters].sort((a, b) => a.position - b.position);

  const completedChapterIds = userProgress
    .filter((progress) => progress.isCompleted)
    .map((progress) => progress.chapterId);

  const firstIncompleteChapter = orderedChapters.find(
    (chapter) => !completedChapterIds.includes(chapter.id)
  );

  return (
    <div className="grid gap-4">
      {orderedChapters.map((chapter) => {
        const isCompleted = completedChapterIds.includes(chapter.id);
        const isCurrentChapter = chapter.id === currentChapter;
        const isFirstIncomplete = chapter.id === firstIncompleteChapter?.id;
        const isUnlocked = isCompleted || isFirstIncomplete;

        const icon = isCompleted ? (
          <Check className="h-4 w-4" />
        ) : isFirstIncomplete ? (
          <Unlock className="h-4 w-4" />
        ) : (
          <Lock className="h-4 w-4" />
        );

        const content = (
          <div
            className={`flex items-center justify-between p-2 border rounded-md shadow-sm w-full transition-all duration-300 ${
              isCurrentChapter ? "bg-violet-400 text-white" : "bg-white"
            }`}
          >
            <span className="text-sm font-semibold">{chapter.title}</span>
            {icon}
          </div>
        );

        return isUnlocked ? (
          <Link
            key={chapter.id}
            href={`/cursos/${cursoSlug}/${chapter.id}`}
            className={`flex items-center justify-between border-slate-200 rounded-lg hover:bg-violet-300 hover:shadow-lg ${
              isCurrentChapter ? "bg-violet-400 text-white" : ""
            }`}
          >
            {content}
          </Link>
        ) : (
          <div
            key={chapter.id}
            className="flex items-center justify-between border-slate-200 rounded-lg opacity-50 cursor-not-allowed"
          >
            {content}
          </div>
        );
      })}
    </div>
  );
};
