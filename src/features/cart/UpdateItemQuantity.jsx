import { useDispatch, useSelector } from "react-redux";

import {
  decreaseeItemQuantity,
  deleteItem,
  getCurrentQuantity,
  increaseItemQuantity,
} from "./cartSlice";

import Button from "../../ui/Button";
import DeleteItemCart from "./DeleteItemCart";

const UpdateItemQuantity = ({ id }) => {
  const currentQuantity = useSelector(getCurrentQuantity(id));
  const dispatch = useDispatch();

  const handleIncreaseCartItem = () => dispatch(increaseItemQuantity(id));
  const handleDecreaseCartItem = () =>
    currentQuantity === 1
      ? dispatch(deleteItem(id))
      : dispatch(decreaseeItemQuantity(id));

  return (
    <div className="flex items-center gap-3 sm:gap-8">
      <div className="flex items-center gap-2">
        <Button onClick={handleDecreaseCartItem} type="round">
          -
        </Button>
        {currentQuantity}
        <Button onClick={handleIncreaseCartItem} type="round">
          +
        </Button>
      </div>
      <DeleteItemCart pizzaId={id} />
    </div>
  );
};

export default UpdateItemQuantity;
