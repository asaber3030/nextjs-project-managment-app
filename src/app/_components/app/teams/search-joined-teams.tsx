"use client"

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

import { ChangeEvent, FormEvent } from "react";

import { Input } from "@/components/ui/input";

export const SearchJoinedTeamsInput = () => {

  const router = useRouter()
  const searchParams = useSearchParams()

  const [name, setName] = useState(searchParams.get('joinedTeam') ?? '')

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    router.push(`?joinedTeam=${name}`)
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