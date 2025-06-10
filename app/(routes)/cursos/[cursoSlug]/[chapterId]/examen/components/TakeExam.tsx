"use client";

import {useState } from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { Exam, Question } from "@prisma/client";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import axios from "axios";
import { useRouter } from "next/navigation";


interface TakeExamProps {
  chapterId: string;
  exam: (Exam & { questions: Question[] }) | null ;
  cursoSlug: string;
}

export const TakeExam = ({ chapterId, exam, cursoSlug }: TakeExamProps) => {
  const [answers, setAnswers] = useState<{ [key: string]: string }>({});
  const [result, setResult] = useState<null | { correct: number; total: number; passed: boolean }>(null);
  const router = useRouter();

  const handleSelect = (questionId: string, value: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
  };

  const  handleSubmit = async () => {
    if (!exam) return;

    const total = exam.questions.length;
    const correct = exam.questions.filter(
      (q) => answers[q.id] === q.correct
    ).length;
    const score = (correct / total) * 100;
    const passed = score >= exam.passingScore;

    setResult({ correct, total, passed });

    if (passed) {
  toast.success(`Aprobaste con ${score.toFixed(2)}% 🎉`);

  try {
    const data = {
      chapterId,
      score: score,
      passed: true,
    };

    console.log(data);
    await axios.post("/api/courses/chapters/exam/submit", data, 
      {
        withCredentials: true,
      }
    );

    toast.success("Progreso del capítulo guardado ✅");
    router.push(`/cursos/${cursoSlug}/${chapterId}`);
  } catch (err) {
    toast.error("Error al guardar el progreso");
    console.error("Error al guardar el progreso:", err);
  }
} else {
  toast.warning(`Reprobaste con ${score.toFixed(2)}%. Intenta de nuevo.`);
}

  };



  if (!exam) {
    return <p className="text-red-500">No se encontró ningún examen para este capítulo.</p>;
  }

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Examen: {exam.questions.length} preguntas</h2>

      {exam.questions.map((q, index) => (
        <Card key={q.id} className="p-4 space-y-3">
          <p className="font-medium">{index + 1}. {q.text}</p>

          <RadioGroup
            value={answers[q.id] || ""}
            onValueChange={(value) => handleSelect(q.id, value)}
            className="space-y-2"
          >
            {q.options.map((option, i) => (
              <div key={i} className="flex items-center space-x-2">
                <RadioGroupItem value={option} id={`${q.id}-${i}`} />
                <label htmlFor={`${q.id}-${i}`} className="text-sm">{option}</label>
              </div>
            ))}
          </RadioGroup>
        </Card>
      ))}

      <Button onClick={handleSubmit} className="mt-4">Enviar respuestas</Button>

      {result && (
        <div className="mt-6">
          <p className={`text-lg font-semibold ${result.passed ? "text-green-600" : "text-red-600"}`}>
            {result.passed ? "¡Aprobaste!" : "No aprobaste"}
          </p>
          <p>Respuestas correctas: {result.correct} de {result.total}</p>
        </div>
      )}
    </div>
  );
};
