import Image from "next/image"

type Props = {
  image: string
  title: string
  description: string
}

export const OneService = ({ image, title, description }: Props) => {
  return ( 
    <section className="p-4 rounded-md shadow-sm border bg-white h-fit">
      <div className="max-h-[150px] h-[150px] flex justify-start items-center">
        <Image alt="Landing page" src={image} width={200} height={200} />
      </div>
      <h2 className="text-xl font-medium my-2 mt-10">{title}</h2>
      <p className="text-gray-500 text-sm">{description}</p>
    </section>
  );
}