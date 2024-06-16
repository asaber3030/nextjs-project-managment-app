"use client"

import { ChangeEvent, FormEvent, useState } from "react";

import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

import { cn } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";

type Props = { className?: string, value?: string }

export const SearchApp = ({ className, value }: Props) => {

  const searchParams = useSearchParams()
  const router = useRouter()

  const [query, setQuery] = useState(value ? value : searchParams.get('query'))

  const onSubmit = (event: FormEvent) => {
    event.preventDefault()
    router.push(`/dashboard/search?query=${query}`)
  }

  return ( 
    <form onSubmit={onSubmit} className='relative'>
      <Search className='text-gray-500 absolute -translate-y-1/2 top-1/2 left-3 size-5' />
      <Input 
        onChange={(event: ChangeEvent<HTMLInputElement>) => setQuery(event.target.value)}
        value={query as string}
        placeholder="Press Enter to search." 
        className={cn('pl-10', className && className)} 
      />
    </form>
  );
}