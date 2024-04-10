import { notFound } from "next/navigation"
export default function ProductDetails( { params }: { params: { productId: string } } ) {
  
  return (
    <div>
      <h1>Product Details</h1>
      <p>Product details go heres {params.productId} </p>
    </div>
  )
};