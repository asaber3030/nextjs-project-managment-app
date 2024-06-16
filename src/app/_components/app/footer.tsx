import { socialMedia } from "@/lib/lists";
import { AppTitle } from "./app-title";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type Props = {
 
}
export const Footer = ({  }: Props) => {
  return (
    <div className='bg-main p-8 xl:px-24 px-4'>
      <div className="grid gap-8 xl:grid-cols-3 grid-cols-1">
        <div>
          <AppTitle className='text-2xl' />
          <p className="text-gray-400 mt-3">This is a SaaS application is created to control teams, team members, projects, tasks, and more. There&apos;re many features add to this project which you can use by upgrading your plan.</p>

          <div className='mt-4'>
            <h3 className='text-white text-xl mb-2 font-semibold'>Follow us on</h3>
            <div className='flex gap-2'>
              {socialMedia.map(({ url, icon: Icon }, idx) => (
                <a className='p-2 rounded-full bg-secondaryMain' key={`social-url-${idx}`} href={url}><Icon className='text-black size-4' /></a>
              ))}
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-lg text-white font-medium mb-3">Useful Link</h3>
          <div className='grid xl:grid-cols-2 gap-4 grid-cols-1'>
            <ul className='list-disc space-y-2 pl-4'>
              <li className='text-gray-300 text-sm hover:underline'><Link href=''>About us</Link></li>
              <li className='text-gray-300 text-sm hover:underline'><Link href=''>Clients</Link></li>
              <li className='text-gray-300 text-sm hover:underline'><Link href=''>Features</Link></li>
              <li className='text-gray-300 text-sm hover:underline'><Link href=''>Plans</Link></li>
            </ul>
            <ul className='list-disc space-y-2 pl-4'>
              <li className='text-gray-300 text-sm hover:underline'><Link href=''>Help Center</Link></li>
              <li className='text-gray-300 text-sm hover:underline'><Link href=''>Account</Link></li>
              <li className='text-gray-300 text-sm hover:underline'><Link href=''>Our Projects</Link></li>
              <li className='text-gray-300 text-sm hover:underline'><Link href=''>Privacy & Policies</Link></li>
            </ul>
          </div>
        </div>

        <div>
          <div>
            <h3 className="text-lg text-white font-medium mb-3">Do you have a project?</h3>
            <p className="text-gray-400 mt-3">Let us now through E-mail or Social media!</p>
            
            <div className="mt-4">

            </div>
            <div className='flex xl:flex-col flex-row gap-5'>
              <Input placeholder="E-mail address" className='rounded-md text-gray-500 bg-lightMain border-lightMain' />
              <Button variant='secondaryMain' className='rounded-md h-10'>Send Letter</Button>
            </div>
          </div>
        </div>

      </div>

      <div className='xl:flex justify-between items-center text-white pt-4 border-t border-t-lightMain mt-4'>
        <p>Copyrights 2024 © Abdulrahman Saber. All rights reserved</p>
        <a href='https://wa.me/+201123525123' className='block hover:underline hover:text-secondaryMain' target="_blank">+20 11 2352 5123</a>
      </div>
      
    </div>
  );
}