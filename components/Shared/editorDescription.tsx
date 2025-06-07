"use client";
import dynamic from "next/dynamic";
import { useMemo } from "react";
import "react-quill-new/dist/quill.snow.css";

export const EditorDescription = ({
    value,
    onChange,
}: {
    value: string;
    onChange: (value: string) => void;
}) => {
    const ReactQuill = useMemo(
        () => dynamic(() => import("react-quill-new"), { ssr: false }),
        []
    ) 
  return <ReactQuill theme="snow" value={value} onChange={onChange}  />;
};