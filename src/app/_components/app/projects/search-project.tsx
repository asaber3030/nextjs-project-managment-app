"use client"

import { ChangeEvent, FormEvent } from "react"

import { useRouter, useSearchParams } from "next/navigation"
import { useRef, useState } from "react"

import { Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

type Props = {
 
}
export const SearchProjectsInput = ({}: Props) => {
  
  const router = useRouter()
  const searchParams = useSearchParams()

  const [visible, setVisbility] = useState(false)
  
  const [projectName, setProjectName] = useState(searchParams.get('projectName') || '')

  const submitSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    router.push(`?projectName=${projectName}`)
  }

  return ( 
    <div className="flex gap-1">

      {visible && (
        <form onSubmit={submitSearch}>
          <Input
            className='max-w-[250px] h-9'
            placeholder="Search projects"
            value={projectName}
            onChange={(event: ChangeEvent<HTMLInputElement>) => setProjectName(event.target.value)}
          />
        </form>
      )}

      <Button 
        variant={visible ? 'main' : 'outline'} 
        onClick={() => setVisbility(old => !old)}
      >
        <Search className='size-4 text-gray-600' />
      </Button>

    </div>
  )
}