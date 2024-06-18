import Image from "next/image";

type Props = {
 
}
export const PrivateAccount = ({}: Props) => {
  return ( 
    <div className='w-full bg-white rounded-md shadow-sm h-fit p-4'>
      <Image src='/defaults/security.svg' alt="Private" width={200} height={200} className='mx-auto my-4' />
      <h2 className='font-medium text-lg mt-4 text-center'>This user has choosed to make his account private.</h2>
    </div>
  );
}