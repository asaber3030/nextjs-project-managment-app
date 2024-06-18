import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

type Props = {
  url: string
}
export const SubscriptionInvoiceButtons = ({ url }: Props) => {
  return (
    <div className='mt-2'>
      <Button variant='outline' className='py-0'><a href={url} target='_blank' className='flex gap-2'><Download className='size-4' /> Download Invoice</a></Button>
    </div>
  );
}