"use client"

import Image from "next/image"

import { ChangeEvent, useContext, useState } from "react"

import { Image as ImageIcon } from "lucide-react"
import { UserDataContext } from "@/providers/user-data-provider"

import { useUpdateUser } from "@/hooks/useUser";
import { useSession } from "next-auth/react";

import { LoadingButton } from "@/components/loading-button";
import { Input } from "@/components/ui/input"

import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "@/services/firebase";

import { v4 as uuid } from 'uuid'
import { toast } from "sonner";
import { ACCEPTED_IMAGE_TYPES, MAX_FILE_SIZE } from "@/lib/constants";
import { cn } from "@/lib/utils"


export const AccountBackground = () => {

  const user = useContext(UserDataContext)

  const [file, setFile] = useState<File>()
  const [previewURL, setPreviewURL] = useState<string>()

  const { update } = useSession()
  const { mutateChangeCover, changeCoverLoading } = useUpdateUser()

  const onFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFile(event.target.files?.[0])
    setPreviewURL(URL.createObjectURL(event.target.files?.[0] as File))
  }

  const handleChangeCover = () => {

    if (!file) {
      toast.message("Please select an image!")
      return;
    }

    if (file?.size && file?.size >= MAX_FILE_SIZE) {
      toast.message("Max File size is 5 MB")
      return
    }

    if (!ACCEPTED_IMAGE_TYPES.includes(file?.type)) {
      toast.message("Images are only allowed!")
      return
    }

    const storageRef = ref(storage, 'user-pictures/' + uuid());
    uploadBytes(storageRef, file as any).then(() => {
      getDownloadURL(storageRef).then((url) => {
        mutateChangeCover({ data: url })
        update({
          bgCover: url
        })
      })
    });
  }

  return ( 
    <div className={cn('w-full h-[200px] rounded-lg relative overflow-hidden', !user?.bgCover && 'bg-blue-600')}>
      {user.bgCover && (
        <Image src={!previewURL ? user.bgCover : previewURL} alt='BG' layout="fill" className='z-1 max-w-full max-h-full absolute object-cover rounded-md' />
      )}
      <Input type="file" onChange={onFileChange} className='absolute opacity-0 w-full h-full' />
      <LoadingButton onClick={handleChangeCover} loading={changeCoverLoading} variant='outline' className='absolute right-3 top-3'><ImageIcon /> Change Cover</LoadingButton>
    </div>
  );
}