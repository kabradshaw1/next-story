export default function ProductDetails( { params }: any) {
  return (
    <div>
      <h1>Product Details</h1>
      <p>Product details go heres {params.productId} </p>
    </div>
  )
};