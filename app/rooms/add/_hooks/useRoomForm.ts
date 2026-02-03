"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { useTranslations } from "@/providers/I18nProvider"

// Fonction pour créer le schéma avec les traductions
function createRoomFormSchema(t: (key: string) => string) {
  return z.object({
    name: z.string().min(1, t("nameRequired")),
    capacity: z.coerce
      .number(t("capacityRequired"))
      .int(t("capacityRequired"))
      .positive(t("capacityPositive")),
    equipment: z.string().optional(),
    image_url: z.string().url(t("imageUrlInvalid")).or(z.literal("")),
  })
}

// Type des champs du formulaire
export type RoomFormInput = z.input<ReturnType<typeof createRoomFormSchema>>
export type RoomFormFields = z.output<ReturnType<typeof createRoomFormSchema>>

// Hook custom pour le formulaire
export function useRoomForm() {
  const t = useTranslations("roomForm")
  const schema = createRoomFormSchema(t)

  return useForm<RoomFormInput, any, RoomFormFields>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      capacity: 1,
      equipment: "",
      image_url: "",
    },
  })
}
