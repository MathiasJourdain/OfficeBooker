"use client"

import { SubmitHandler } from "react-hook-form"
import { useRouter } from "next/navigation"
import { useRoomForm, RoomFormFields } from "../_hooks/useRoomForm"
import { usePostRoomMutation } from "../_hooks/mutations/usePostRoomMutation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { useTranslations } from "next-intl"

export function RoomForm() {
  const router = useRouter()
  const t = useTranslations("roomForm")

  const form = useRoomForm()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form

  const { mutate: postRoom, isPending, isError, error } = usePostRoomMutation()

  const onSubmit: SubmitHandler<RoomFormFields> = (data) => {
    const equipment = data.equipment
      ? data.equipment.split(",").map((item) => item.trim())
      : []

    postRoom(
      {
        name: data.name,
        capacity: data.capacity,
        equipment,
        image_url: data.image_url || "",
      },
      {
        onSuccess: () => {
          router.push("/?bookingSuccess=true")
        },
      }
    )
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>{t("title")}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name">{t("name")} *</Label>
            <Input
              id="name"
              type="text"
              placeholder="Ex: Salle Elon Musk"
              {...register("name")}
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="capacity">{t("capacity")} *</Label>
            <Input
              id="capacity"
              type="number"
              min="1"
              placeholder="Ex: 8"
              {...register("capacity")}
            />
            {errors.capacity && (
              <p className="text-red-500 text-sm">{errors.capacity.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="equipment">{t("equipment")}</Label>
            <Input
              id="equipment"
              type="text"
              placeholder="Ex: Projecteur, Tableau blanc, Wifi"
              {...register("equipment")}
            />
            <p className="text-gray-500 text-xs">{t("equipmentHint")}</p>
            {errors.equipment && (
              <p className="text-red-500 text-sm">{errors.equipment.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="image_url">{t("imageUrl")}</Label>
            <Input
              id="image_url"
              type="url"
              placeholder="https://example.com/image.jpg"
              {...register("image_url")}
            />
            {errors.image_url && (
              <p className="text-red-500 text-sm">{errors.image_url.message}</p>
            )}
          </div>

          {isError && (
            <div className="bg-red-50 border border-red-200 text-red-800 p-4 rounded-lg">
              {error?.message || t("error")}
            </div>
          )}

          <Button
            type="submit"
            disabled={isPending}
            className="w-full bg-blue-600 hover:bg-blue-700"
          >
            {isPending ? t("submitting") : t("submit")}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}

