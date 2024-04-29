import { Metadata } from "next";
// import { notFound } from "next/navigation";

type Props = {
  params: {
    productId: string  
  }
};

export const generateMetadata = async ({ params }: Props): Promise<Metadata> => {
  const title = await new Promise(resolve => {
    setTimeout(() => {
      resolve(`stuff ${params.productId}`);
    }, 100);
  });
  return {
    title: `Product ${title}`
  };
};
export default function ProductDetails( { params }: Props ) {
  
  return (
    <div>
      <h1>Product Details</h1>
      <p>Product details go heres {params.productId} </p>
    </div>
  );
};