import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string,
);

const products = [
  { id: 1, name: 'Product 1', price: 10, image: 'product1.jpg', quantity: 2 },
  { id: 2, name: 'Product 2', price: 20, image: 'product2.jpg', quantity: 1 },
];

export default function Checkout() {
  const handleCheckout = async () => {
    const stripe = await stripePromise;
    if (!stripe) return;
    const response = await fetch('/api/checkout-sessions/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        cartItems: products,
        returnUrl: window.location.origin,
      }),
    });
    const { sessionId } = await response.json();
    await stripe.redirectToCheckout({ sessionId });
  };

  return (
    <div>
      <h1>Checkout</h1>
      {products.map((product) => (
        <div key={product.id}>
          <h2>{product.name}</h2>
          <p>Price: ${product.price}</p>
          <p>Quantity: {product.quantity}</p>
        </div>
      ))}
      <button onClick={handleCheckout}>Proceed to Checkout</button>
    </div>
  );
}
