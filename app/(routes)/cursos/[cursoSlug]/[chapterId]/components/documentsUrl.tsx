"use client";

import { Chapter } from "@prisma/client";

export function DocumentsUrl({
  chapter,
}: {
  chapter: Chapter & {
    documentUrl: {
      id: string;
      title: string;
      documentUrl: string;
      chapterId: string;
      createdAt: Date;
      updatedAt: Date;
    }[];
  };
}) {
  if (!chapter) {
    return <p className="text-sm text-gray-500">Capítulo no encontrado.</p>;
  }

  if (!chapter.documentUrl || chapter.documentUrl.length === 0) {
    return <p className="text-sm text-gray-500">No hay documentos para este capítulo.</p>;
  }

  return (
    <div className="mb-4 p-4 border border-slate-200 rounded-lg bg-white shadow-sm">
      <p className="font-semibold text-base text-slate-700 mb-2">
        {chapter.title}
      </p>
      <ul className="space-y-2 pl-4">
        {chapter.documentUrl.map((doc) => (
          <li key={doc.id} className="text-sm">
            <a
              href={doc.documentUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800 underline transition-colors duration-200"
            >
              📄 {doc.title}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
