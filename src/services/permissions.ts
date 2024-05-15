import db from "./prisma";

import { User } from "@/types";
import { userSelect } from "@/actions/config";

export class Permission {

  userId: number;
  user: User;

  constructor (userId: number) {
    this.userId = userId
  }

  async fetchUser() {
    this.user = await db.user.findUnique({ where: { id: this.userId }, select: { ...userSelect, plan: true } }) as unknown as User
  }

  /// Global Permission ///
  async hasMailSystem() {
    return this.user.plan.hasMailSystem
  }
  async hasAnalytics() {
    return this.user.plan.hasAnalytics
  }
  async hasCharts() {
    return this.user.plan.hasCharts
  }
  async canDirectAdd() {
    return this.user.plan.canDirectAdd
  }
  async canCreateMoreTeams() {
    const countTeams = await db.team.count({ where: { ownerId: this.userId } })
    return countTeams <= this.user.plan.numberOfTeams ? true : false;
  }
  async canCreateMorePersonalProjects() {
    const countProjects = await db.project.count({ 
      where: { ownerId: this.userId } 
    })
    return countProjects <= this.user.plan.numberOfPersonalProjects
  }
  async canCreateMorePersonalTasks() {
    const countTasks = await db.task.count({ 
      where: { ownerId: this.userId } 
    })
    return countTasks <= this.user.plan.numberOfPersonalTasks
  }
  async canCreateMorePersonalBoards() {
    const countBoards = await db.project.count({ 
      where: { ownerId: this.userId } 
    })
    return countBoards <= this.user.plan.numberOfPersonalBoards
  }
  
  /// Team Permission ///
  async canCreateMoreTeamProjects(teamId: number) {
    const countTeamProjects = await db.teamProject.count({ 
      where: { ownerId: this.userId, teamId } 
    })
    return countTeamProjects <= this.user.plan.numberOfProjectTeams ? true : false;
  }

  async canAddMoreTeamMembers(teamId: number) {
    const countTeamMembers = await db.teamMember.count({ 
      where: { 
        team: { 
          id: teamId, 
          ownerId: this.userId 
        } 
      } 
    })
    return countTeamMembers <= this.user.plan.numberOfTeamMembers ? true : false;
  }

  /// Team Project Permission ///
  async canCreateMoreBoards(teamId: number, projectId: number) {
    const countProjectBoards = await db.teamProjectBoards.count({ 
      where: { 
        project: {
          id: projectId,
          team: { id: teamId, ownerId: this.userId }
        }
      } 
    })

    return countProjectBoards <= this.user.plan.numberOfBoards ? true : false;
  }

  async canCreateMoreTasks(teamId: number, projectId: number) {
    const countProjectTasks = await db.teamProjectTasks.count({ 
      where: { 
        project: {
          id: projectId,
          team: { id: teamId, ownerId: this.userId }
        }
      } 
    })

    return countProjectTasks <= this.user.plan.numberOfTasks ? true : false;
  }

}