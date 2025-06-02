import { z } from "zod"
export const formSchema = z.object({
  courseName: z.string().min(2).max(50),
  slug: z.string().min(2).max(50),
})