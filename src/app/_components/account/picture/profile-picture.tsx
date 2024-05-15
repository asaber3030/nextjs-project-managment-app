"use client"

import { useState } from "react"
import { useUpdateUser } from "@/hooks/useUser"
import { useSession } from "next-auth/react"

import { Save } from "lucide-react"
import { LoadingButton } from "@/components/loading-button"
import { Input } from "@/components/ui/input"

import { v4 as uuid } from 'uuid'
import { toast } from "sonner"
import { storage } from "@/services/firebase"
import { getDownloadURL, ref, uploadBytes } from "firebase/storage"
import { ACCEPTED_IMAGE_TYPES, MAX_FILE_SIZE } from "@/lib/constants"

export const ChangeProfilePicture = () => {

  const [file, setFile] = useState<File>()

  const { update } = useSession()
  const { mutateChangePicture, changePictureLoading } = useUpdateUser()

  const handleChangeProfilePicture = () => {

    if (!file) {
      toast.message("Please select an image!")
      return
    }

    if (file?.size && file?.size >= MAX_FILE_SIZE) {
      toast.message("Max File size is 5 MB")
      return
    }

    if (!ACCEPTED_IMAGE_TYPES.includes(file?.type)) {
      toast.message("Images are only allowed!")
      return
    }

    const storageRef = ref(storage, 'user-pictures/' + uuid())

    uploadBytes(storageRef, file as any).then(() => {
      getDownloadURL(storageRef).then((url) => {
        mutateChangePicture({ data: url })
        update({
          photo: url
        })
      })
    })
  }

  return ( 
    <div>
      <h2 className='text-lg mb-4 font-medium border-b rounded-md mt-4'>Profile Picture</h2>

      <Input 
        type='file' 
        onChange={(event) => setFile(event.target.files?.[0])}
        className='mb-2'
      />
      
      <LoadingButton loading={changePictureLoading} onClick={handleChangeProfilePicture} variant='secondaryMain'><Save className="size-4"/> Change Picture</LoadingButton>
      
    </div>
  )
}