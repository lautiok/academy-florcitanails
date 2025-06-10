import { Progress } from "@/components/ui/progress"
import { DownloadCertificado } from "./downloadCertificado"

export function CourseProgressDisplay({
    progress,
    name,
    title,
} : {
    progress: number,
    name: string,
    title: string
}) {
    const showProgress = progress === 100 


    return showProgress ? (
        <DownloadCertificado name={name} title={title} />
    ) : (
        <div >
        <Progress value={progress} className="[&>*]:bg-violet-300 " />
        <p className="text-xs">{progress}%</p>
        </div>
    )
}