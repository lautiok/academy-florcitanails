import { Chapter, UserProgress } from "@prisma/client";
import { ChapterList } from "./chapterList";

export const ChaptersCourse = ({
    chapters,
    cursoSlug,
    chapterId,
    userProgress,
} : {
    chapters: Chapter[] | null;
    cursoSlug: string;
    chapterId: string;
    userProgress: UserProgress[];
}) => {
    return (
        <div className="p-4 rounded-lg shadow-md border border-slate-200 flex flex-col">
            <h2 className="text-2xl font-semibold mb-4">Capítulos</h2>
            <ChapterList 
                chapters={chapters}
                cursoSlug={cursoSlug}
                currentChapter={chapterId}
                userProgress={userProgress}
            />
        </div>
    )
};

