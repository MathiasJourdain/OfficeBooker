import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"

// Schéma de validation Zod
const RoomFormSchema = z.object({
  name: z.string().min(1, "Veuillez fournir un nom de salle"),
  capacity: z.coerce
    .number("Veuillez fournir une capacité valide")
    .int("La capacité doit être un nombre entier")
    .positive("La capacité doit être supérieure à zéro"),
  equipment: z.string().optional(),
  image_url: z.string().url("Veuillez fournir une URL valide").or(z.literal("")),
})

// Type des champs du formulaire
export type RoomFormFields = z.infer<typeof RoomFormSchema>

// Hook custom pour le formulaire
export function useRoomForm() {
  return useForm<RoomFormFields>({
    resolver: zodResolver(RoomFormSchema),
    defaultValues: {
      name: "",
      capacity: 1,
      equipment: "",
      image_url: "",
    },
  })
}

