import { Plan } from "@/types";

import { virtualInfinityNumber } from "@/lib/constants";
import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import { CheckCircle2, XCircle } from "lucide-react";

type Props = {
  plan: Plan
  idx: number
}

export const OnePlan = ({ plan, idx }: Props) => {

  return ( 
    <div key={`plan-idx-view-${plan.id}`} className={cn("border p-4 h-fit rounded-md shadow-sm space-y-4", idx === 1 && "xl:scale-105 bg-main text-white")}>
      <h3 className="text-center text-3xl font-extrabold">{plan.name}</h3>
      
      <p className="flex gap-1 justify-center items-center">
        <span className="text-lg text-green-700 font-extrabold">$</span>
        <span className="text-green-700 text-6xl font-extrabold">{plan.price}</span>
        <span className="text-gray-400 text-sm">/ Month</span>
      </p>

      <div className="flex gap-1 justify-center">
        <Button variant="secondaryMain">Get Early Access</Button>
        <Button variant="outline" className={cn(idx === 1 && "text-black")}>Subscribe</Button>
      </div>

      <ul className="px-4 space-y-4">
        <li className="flex gap-3 items-center">
          <span className="text-secondaryMain"><CheckCircle2 className="size-5" /></span>
          <span><b>{plan.numberOfTeams === virtualInfinityNumber ? "∞" : plan.numberOfTeams}</b> Teams</span>
        </li>

        <li className="flex gap-3 items-center">
          <span className="text-secondaryMain"><CheckCircle2 className="size-5" /></span>
          <span><b>{plan.numberOfPersonalProjects === virtualInfinityNumber ? "∞" : plan.numberOfPersonalProjects}</b> Personal Projects</span>
        </li>

        <li className="flex gap-3 items-center">
          <span className="text-secondaryMain"><CheckCircle2 className="size-5" /></span>
          <span><b>{plan.numberOfPersonalTasks === virtualInfinityNumber ? "∞" : plan.numberOfPersonalTasks}</b> Personal Tasks</span>
        </li>

        <li className="flex gap-3 items-center">
          <span className="text-secondaryMain"><CheckCircle2 className="size-5" /></span>
          <span><b>{plan.numberOfPersonalBoards === virtualInfinityNumber ? "∞" : plan.numberOfPersonalBoards}</b> Personal Boards</span>
        </li>
        
        <li className="flex gap-3 items-center">
          <span className="text-secondaryMain"><CheckCircle2 className="size-5" /></span>
          <span><b>{plan.numberOfProjectTeams === virtualInfinityNumber ? "∞" : plan.numberOfProjectTeams}</b> Team projects / per team</span>
        </li>
        <li className="flex gap-3 items-center">
          <span className="text-secondaryMain"><CheckCircle2 className="size-5" /></span>
          <span><b>{plan.numberOfTasks === virtualInfinityNumber ? "∞" : plan.numberOfTasks}</b> Tasks / per project</span>
        </li>
        <li className="flex gap-3 items-center">
          <span className="text-secondaryMain"><CheckCircle2 className="size-5" /></span>
          <span><b>{plan.numberOfBoards === virtualInfinityNumber ? "∞" : plan.numberOfBoards}</b> Boards / per project</span>
        </li>
        <li className="flex gap-3 items-center">
          <span className="text-secondaryMain"><CheckCircle2 className="size-5" /></span>
          <span><b>{plan.numberOfTeamMembers === virtualInfinityNumber ? "∞" : plan.numberOfTeamMembers}</b> Team Members / per team</span>
        </li>

        <li className="flex gap-3 items-center">
          {plan.hasAnalytics ? (
            <span className="text-secondaryMain"><CheckCircle2 className="size-5" /></span>
          ): (
            <span className="text-gray-300"><XCircle className="size-5" /></span>
          )}
          <span><b>{plan.hasAnalytics ? "Yes" : "No"}</b> analytics</span>
        </li>

        <li className="flex gap-3 items-center">
          {plan.hasCharts ? (
            <span className="text-secondaryMain"><CheckCircle2 className="size-5" /></span>
          ): (
            <span className="text-gray-300"><XCircle className="size-5" /></span>
          )}
          <span><b>{plan.hasCharts ? "Yes, Charts for virtulization" : "No Charts"}</b></span>
        </li>

        <li className="flex gap-3 items-center">
          {plan.hasMailSystem ? (
            <span className="text-secondaryMain"><CheckCircle2 className="size-5" /></span>
          ): (
            <span className="text-gray-300"><XCircle className="size-5" /></span>
          )}
          <span><b>{plan.hasMailSystem ? "Yes there is mail system" : "No mail system"}</b></span>
        </li>

        {plan.features?.map((feature) => (
          <li className="flex gap-3 items-center" key={`feature-idx-${feature.id}`}>
            {feature.available ? (
              <span className="text-secondaryMain"><CheckCircle2 className="size-5" /></span>
            ): (
              <span className="text-gray-300"><XCircle className="size-5" /></span>
            )}
            <span>{feature.title}</span>
          </li>
        ))}

      </ul>

    </div>
  );
}