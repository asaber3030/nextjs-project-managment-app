"use client";

import Link from "next/link";

import { usePathname } from "next/navigation";

import { accountSidebarURLs } from "@/lib/lists";
import { cn } from "@/lib/utils";

export const AccountLinks = () => {

  const pathname = usePathname()

  return ( 
    <ul className='flex'>
      {accountSidebarURLs.map((item, idx) => (
        <li key={`account-sidebar-item-${idx}`}>
          <Link 
            href={item.url} 
            className={cn(
              'flex gap-4 text-xs p-2 border-b-2 border-transparent px-4 transition-all items-center text-gray-600 hover:border-b-blue-300 hover:shadow-sm',
              pathname.endsWith(item.url) && 'border-b-2 border-b-blue-300',
              )}
          >
            {item.icon}
            <span>{item.label}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
}