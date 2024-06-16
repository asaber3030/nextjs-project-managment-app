import Image from "next/image";
import Link from "next/link";

import { getServerSession } from "next-auth";
import { getPlans } from "@/actions/app";
import { authOptions } from "@/services/auth";
import { clientsList, numbersList, servicesList } from "@/lib/lists";

import { DollarSign, HomeIcon, LogIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { OneService } from "./_components/app/one-service";
import { OnePlan } from "./_components/app/one-plan";
import { OneClient } from "./_components/app/one-client";
import { OneStat } from "./_components/app/one-stat";
import { Footer } from "./_components/app/footer";
import { formatNumber } from "@/lib/utils";

export default async function Home() {

  const session = await getServerSession(authOptions)
  const plans = await getPlans()

  return (
    <section>
      
      {/* Home  */}
      <main className="bg-gray-50 h-[calc(100vh-68px)] flex flex-col items-center justify-center">
        
        <div className="flex gap-8 pl-16 space-y-4">
            
          <div>
            <h1 className="xl:text-6xl text-4xl font-semibold">Welcome to <span className="font-normal text-secondaryMain">P</span>latform</h1>
            <p className="xl:font-medium mt-4 xl:text-sm text-sm font-medium text-gray-500">Where you can create, maintain, share, contribute your projects with your team. You can easily create tasks and assign to many members. Also post some boards to share something with the teams</p>
            
            <div className='flex gap-1 mt-4'>
              <Button variant="secondaryMain" size="sm" className="text-sm"><DollarSign className='size-4' /> Subscribe</Button>
              <Button variant="link" size="sm" className="text-sm"><HomeIcon className='size-4' /> View Analytics</Button>
            </div>

            <div className="flex gap-4 mt-4">
              <div>
                <p className='text-2xl font-semibold'>{formatNumber(25_254)}+</p>
                <h3 className='text-gray-500'>Clients</h3>
              </div>

              <div>
                <p className='text-2xl font-semibold'>{formatNumber(3_250)}+</p>
                <h3 className='text-gray-500'>Teams</h3>
              </div>
            </div>

          </div>

          <div className='min-w-[600px] mx-auto flex justify-center'>
            <Image alt="Landing page" src="/home/analytics.svg" width={400} height={400} className="mx-auto" />
          </div>

        </div>

      </main>
     
      {/* Plans */}
      <div className="container">
        
        <h2 className="text-3xl font-medium my-4">Plans</h2>

        <div className="gap-4 grid xl:grid-cols-3 grid-cols-1">
          {plans.map((plan, idx) => (
            <OnePlan key={`single-plan-idx-${plan.id}`} plan={plan} idx={idx} />
          ))}
        </div>

      </div>

      {/* Services */}
      <div className="my-4 container">

        <h2 className="text-3xl font-medium my-4">Services</h2>

        <section className="grid xl:grid-cols-3 grid-cols-1 gap-4">
          {servicesList.map((service, idx) => (
            <OneService key={`single-service-${idx}`} {...service} />
          ))}
        </section>

      </div>

      {/* News Letter */}
      <div className="py-8 bg-gray-50">

        <div className="container">

          <h2 className="text-3xl font-medium mt-4 text-center">Subscribe To newsletter!</h2>
          <p className="text-center text-lg text-gray-600 mb-4">Keep up-to-date with our new updates and services!</p>

          <div className="flex">
            <Input placeholder="example@domain-name.com" />
            <Button variant="secondaryMain" className="h-10 ml-2">Subscribe</Button>
          </div>

        </div>

      </div>

      {/* Clients */}
      <div className="my-4 container">

        <h2 className="text-3xl font-medium text-center my-10">What clients said about our service?</h2>

        <section className="grid xl:grid-cols-3 grid-cols-1 gap-4">
          {clientsList.map((client, idx) => (
            <OneClient key={`single-client-${idx}`} idx={idx} {...client} />
          ))}
        </section>

      </div>

      {/* Statistics */}
      <div className="my-4 container min-h-[300px] flex flex-col justify-center items-center">
        <h2 className="text-3xl font-medium text-center my-10">Our Statistics for now.</h2>

        <section className="grid xl:grid-cols-5 grid-cols-1 gap-4">
          {numbersList.map((stat, idx) => (
            <OneStat key={`single-stat-${idx}`} {...stat} />
          ))}
        </section>
      </div>

      <Footer />

    </section>
  )
}
