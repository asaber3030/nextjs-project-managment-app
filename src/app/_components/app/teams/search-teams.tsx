"use client"

import { Input } from "@/components/ui/input";
import { ChangeEvent, FormEvent, useState } from "react";

import { useRouter, useSearchParams } from "next/navigation";

type Props = {
 
}
export const SearchTeamsInput = ({}: Props) => {

  const router = useRouter()
  const searchParams = useSearchParams()

  const [name, setName] = useState(searchParams.get('name') ?? '')

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    router.push(`?name=${name}`)
  }

  return ( 
    <form onSubmit={onSubmit}>
      <Input 
        placeholder="Search.." 
        value={name} 
        onChange={(event: ChangeEvent<HTMLInputElement>) => setName(event.target.value)} 
      />
    </form>
  );
}