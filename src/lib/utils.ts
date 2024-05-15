import { PersonalTaskStatus, Status } from "@prisma/client"
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function arr(length: number) {
  return Array.from({ length })
}
export function badgeVariant(status: Status, addOutline?: boolean) {
  switch (status) {
    case Status.Pending:
      return addOutline ? 'outlineWarning' : 'warning'
    case Status.Accepted:
      return addOutline ? 'outlineSuccess' : 'success'
    case Status.Refused:
      return addOutline ? 'outlineDanger' : 'destructive'
  }
}

export function badgeVariantForPersonal(status: PersonalTaskStatus, addOutline?: boolean) {
  switch (status) {
    case PersonalTaskStatus.Pending:
      return addOutline ? 'outlineWarning' : 'warning'
    case PersonalTaskStatus.Done:
      return addOutline ? 'outlineSuccess' : 'success'
    case PersonalTaskStatus.Todo:
      return addOutline ? 'outlineDanger' : 'destructive'
  }
}

export function notificationIcon(name: string = 'default'): string {
  return `/notifications/${name}.svg`
}

export function generateText(length: number) {
  let result = '';
 
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  
  let counter = 0;

  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }

  return result;
}
export function formatNumber(num: number) {
  return Intl.NumberFormat('en', { notation: 'compact' }).format(num);
}