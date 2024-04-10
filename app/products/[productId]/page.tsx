import { notFound } from "next/navigation"
import { Metadata } from "next"

type Props = {
  params: {
    productId: string  
  }
}

export const generaeteMatadata = async ({ params }: Props): Promise<Metadata> => {
  const title = await new Promise(resolve => {
    setTimeout(() => {
      resolve(`stuff ${params.productId}`)
    }, 100)
  })
  return {
    title: `Product ${params.productId}`
  }
}
export default function ProductDetails( { params }: Props ) {
  
  return (
    <div>
      <h1>Product Details</h1>
      <p>Product details go heres {params.productId} </p>
    </div>
  )
};