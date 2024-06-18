import { formatNumber } from "@/lib/utils";

type Props = {
  subTotal: number,
  total: number
}

export const SubscriptionMoneyLi = ({ subTotal, total }: Props) => {
  return ( 
    <>
      <li className='flex items-center gap-10 py-1'>
        <span className='min-w-36'>Sub Total</span> 
        <span className='text-green-600 min-w-36 font-semibold'>${formatNumber(subTotal / 100)}.00</span>
      </li>

      <li className='flex items-center gap-10 py-1'>
        <span className='min-w-36'>Total</span> 
        <span className='text-green-600 min-w-36 font-semibold'>${formatNumber(total / 100)}.00</span>
      </li>
    </>
  );
}