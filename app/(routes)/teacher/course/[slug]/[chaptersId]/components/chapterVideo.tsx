import { File, Link, Video } from "lucide-react";
import { TitleBlock } from "../../components";
import { Button } from "@/components/ui/button";
import { DocumentUrl } from "@prisma/client";
import { useState } from "react";
import { ChapterDocumentsForm } from "./chapterDocumentsForm";
import { ChapterVideoForm } from "./chapterVideoForm";

export const ChapterVideo = ({slug, chapterId, videoUrl, documentUrl}: {
    slug: string;
    chapterId: string;
    videoUrl: string | null;
    documentUrl: DocumentUrl[];
}) => {

    const [isEditing, setIsEditing] = useState(false);
    const [isEditingVideo, setIsEditingVideo] = useState(false);
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-6 mt-6 bg-white rounded-md border border-slate-200 flex flex-col">
        <TitleBlock title="Video del capítulo" icon={Video} />

        {videoUrl ? (
            <div>
                <iframe width="100%" height="315" src={videoUrl} title="YouTube video player"  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"></iframe>
                <Button variant="outline" size="sm" className="mt-4 w-full px-2" onClick={() => setIsEditingVideo(!isEditingVideo)}>
                    editar video
                </Button>
                {isEditingVideo === true && (
                    <ChapterVideoForm videoUrl={videoUrl} slug={slug} chapterId={chapterId} setIsEditingVideo={setIsEditingVideo}/>
                )}
            </div>

        ) : (
            <div >
                <Button variant="outline" size="sm" onClick={() => setIsEditingVideo(!isEditingVideo)} >
                    subir video
                </Button>

                {isEditingVideo === true && (
                    <ChapterVideoForm videoUrl={videoUrl} slug={slug} chapterId={chapterId} setIsEditingVideo={setIsEditingVideo}/>
                )}
            </div>
        )}
    </div>
    <div className="p-6 mt-6 bg-white rounded-md border border-slate-200 flex flex-col">
        <TitleBlock title="Documentación del capítulo" icon={File} />
            <div >
                <Button variant="outline" size="sm" onClick={() => setIsEditing(!isEditing)}>
                    subir documentación
                </Button>
                {isEditing === true && (
                    <ChapterDocumentsForm setIsEditing={setIsEditing} slug={slug} chapterId={chapterId}/>
                )}
            </div>
            {documentUrl.map((document, index) => (
                <div key={index} className="p-4 bg-white rounded-md border border-slate-200 mt-6 flex justify-between items-">
                    <p className="text-sm">{document.title}</p>
                    <a href={document.documentUrl} target="_blank" rel="noreferrer">
                        <Link className="h-4 w-4" />
                    </a>
                </div>
            ))}
    </div>
    </div>
  );
};
