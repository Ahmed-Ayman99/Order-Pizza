import { BiCodeAlt } from "react-icons/bi";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { getTotalCartPrice, getTotalCartQuantity } from "./cartSlice";
import { formatCurrency } from "../../utils/helpers";

const CartOverview = () => {
  const totalCartQuantity = useSelector(getTotalCartQuantity);
  const totalCartPrice = useSelector(getTotalCartPrice);

  return (
    <footer className="o flex  items-center justify-between bg-stone-800 px-4 py-4 text-sm uppercase text-stone-200 sm:px-6 md:text-base">
      <div className="mx-aut flex items-center justify-center gap-1 px-4 py-0 text-base capitalize order-2  flex-grow-[1] text-center">
        <BiCodeAlt className="w-4 h-4 " />
        <span>{new Date().getFullYear()}</span> by
        <a
          target="_blank"
          rel="noreferrer"
          className="text-primary   text-yellow-400 transition-all duration-300 hover:scale-110 "
          href="https://www.linkedin.com/in/ahmed-ayman-723605229/"
        >
          Ahmed Ayman
        </a>
      </div>

      {totalCartPrice > 0 && (
        <>
          <p className="space-x-4 font-semibold text-stone-300 sm:space-x-6 order-1">
            <span>{totalCartQuantity} pizzas</span>
            <span>{formatCurrency(totalCartPrice)}</span>
          </p>

          <Link className="order-2" to="/cart">
            Open cart →
          </Link>
        </>
      )}
    </footer>
  );
};

export default CartOverview;
