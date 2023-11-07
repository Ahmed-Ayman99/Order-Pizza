import { Link, useParams } from "react-router-dom";

const EmptyOrder = () => {
  const { orderId } = useParams();

  return (
    <div>
      <Link to="/cart">&larr; Back to cart</Link>

      <p>can&apos;t find order with this &apos;/{orderId}&apos; ID</p>
    </div>
  );
};

export default EmptyOrder;
