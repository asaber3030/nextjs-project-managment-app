"use client"

import Link from "next/link"

import { FormEvent, useRef, useState } from "react"
import { useTeam } from "@/hooks/useTeams"
import { useRouter } from "next/navigation"

import { cn } from "@/lib/utils"
import { route } from "@/lib/route"
import { toast } from "sonner"

import { Team } from "@/types"

import { Trash } from "lucide-react"
import { TeamHeaderSection } from "./team-section-header"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"

type Props = {
  team: Team
}

export const DeleteTeamView = ({ team }: Props) => {
  const [modal, setModal] = useState(false)

  const teamNameRef = useRef<HTMLInputElement>(null)
  const router = useRouter()

  const { deleteTeamMutate } = useTeam(team.id)

  function handleDelete(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (teamNameRef.current?.value === team.name) {
      deleteTeamMutate({
        teamId: team.id
      })
      router.push(route.dashboard())
      return
    }
    toast.message("Invalid Team name!")
  }

  return (
    <div>
      <TeamHeaderSection icon={Trash} label={`Delete Team - ${team.name}`} />

      <section>
        <Alert>
          <Trash className="h-4 w-4" stroke="red" />
          <AlertTitle className="text-red-500 font-medium">
            Deleting Team - <b>{team.name}</b>
          </AlertTitle>
          <AlertDescription>
            <ul className="mt-3 space-y-1 list-disc ml-5 text-gray-500">
              <li>Once you delete this team you won&apos;t be able to restore it again.</li>
              <li>Deleting the team will cause to delete everthing related to this project</li>
              <li>Deleting a team will erase its data such as tasks, boards, and projects.</li>
            </ul>
            <div className="mt-4">
              <div className="flex gap-1">
                <Dialog open={modal} onOpenChange={setModal}>
                  <DialogTrigger
                    className={cn(
                      "rounded-md py-1 text-sm px-4 bg-red-500 hover:bg-red-700 transition-all text-white"
                    )}
                  >
                    Delete Team
                  </DialogTrigger>
                  <DialogContent className="min-w-[50%]">
                    <DialogHeader>
                      <DialogTitle>Delete Team</DialogTitle>
                      <DialogDescription>
                        Once you confirm this action everything belongs to this team will be deleted
                        once now and forever! including projects, boards, tasks, and anything
                        belongs to this team!
                      </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleDelete}>
                      <Label>
                        Please type <b>&quot;{team.name}&quot;</b>
                      </Label>
                      <Input
                        ref={teamNameRef}
                        placeholder={`Type "${team.name}" to delete the project!`}
                      />
                      <DialogFooter>
                        <Button className="mt-4" size="sm" variant="destructive" type="submit">
                          Confirm
                        </Button>
                      </DialogFooter>
                    </form>
                  </DialogContent>
                </Dialog>
                <Link href={route.viewTeam(team.id)}>
                  <Button variant="outline" size="sm">
                    Cancel
                  </Button>
                </Link>
              </div>
            </div>
          </AlertDescription>
        </Alert>
      </section>
    </div>
  )
}
