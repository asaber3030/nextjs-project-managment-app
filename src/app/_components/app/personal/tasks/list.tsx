"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { ChangeEvent, FormEvent, useState } from "react"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Title } from "@/components/title"
import { Input } from "@/components/ui/input"
import { OnePersonalTask } from "@/app/_components/app/personal/tasks/task"

import { Task } from "@/types"
import { EmptyData } from "@/components/empty-data"
import { Button } from "@/components/ui/button"
import { CreatePersonalTask } from "./actions/create"
import { PersonalTaskStatus } from "@prisma/client"

type Props = {
  tasks: Task[]
}

export const ListPersonalTasks = ({ tasks }: Props) => {

  const searchParams = useSearchParams()
  const router = useRouter()

  const [query, setQuery] = useState(searchParams.get('query') ?? '')
  const [orderBy, setOrderBy] = useState(searchParams.get('orderBy') ?? 'id')
  const [orderType, setOrderType] = useState(searchParams.get('orderType') ?? 'desc')

  const onSubmitSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    router.push(`?query=${query}&orderBy=${orderBy}&orderType=${orderType}`)
  }

  return ( 
    <div className='xl:container'>

      <div className='fixed bottom-5 right-5'>
        <CreatePersonalTask />
      </div>

      <Title label="My Tasks" parentClassName="mb-4" hasBottomBorder>
       
        <form className='grid xl:grid-cols-10 grid-cols-1 gap-2' onSubmit={onSubmitSearch}>

          <Input
            className="col-span-3"
            value={query} 
            onChange={(event: ChangeEvent<HTMLInputElement>) => setQuery(event.target.value)} 
            placeholder='Search..' 
          />
          
          <Select defaultValue={orderBy} onValueChange={(value) => setOrderBy(value)}>
            <SelectTrigger className="col-span-3">
              <SelectValue placeholder="Order By" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="id">ID</SelectItem>
              <SelectItem value="createdAt">Creation Date</SelectItem>
              <SelectItem value="updatedAt">Last Update</SelectItem>
              <SelectItem value="finishAt">Finish Date</SelectItem>
            </SelectContent>
          </Select>

          <Select defaultValue={orderType} onValueChange={(value) => setOrderType(value)}>
            <SelectTrigger className="col-span-3">
              <SelectValue placeholder="Sort" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="desc">Descending</SelectItem>
              <SelectItem value="asc">Ascending</SelectItem>
            </SelectContent>
          </Select>

          <Button className="col-span-1 h-10" type='submit' variant='secondaryMain' size='sm'>Filter</Button>

        </form>

      </Title>

      {tasks.length === 0 ? (
        <EmptyData label="No tasks" />
      ): (
        <div className="grid xl:grid-cols-3 grid-col-1 gap-4">
          {tasks.map((task) => (
            <OnePersonalTask
              key={`personal-task-idx-${task.id}`}
              task={task} 
            />
          ))}
        </div>
      )}
    </div>
  );
}