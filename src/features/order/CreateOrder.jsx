import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import Button from "../../ui/Button";
import EmptyCart from "../cart/EmptyCart";

import { clearCart, getCart, getTotalCartPrice } from "../cart/cartSlice";
import { formatCurrency, isValidPhone } from "../../utils/helpers";
import { fetchAddress } from "../user/userSlice";
import { API_URL } from "../../utils/constant";

const CreateOrder = () => {
  const { username, address: userAddress } = useSelector((state) => state.user);
  const totalCartPrice = useSelector(getTotalCartPrice);
  const cart = useSelector(getCart);

  const [withPriority, setWithPriority] = useState("off");
  const [customer, setCustomer] = useState(username);
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState(userAddress);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const priorityPrice = withPriority === "on" ? totalCartPrice * 0.2 : 0;
  const totalPrice = totalCartPrice + priorityPrice;

  const [isLoading, setIsLoading] = useState(false);
  const [formErrors, setFormErrors] = useState(null);

  const handlePosition = (e) => {
    e.preventDefault();
    dispatch(fetchAddress());
  };

  const handleNewOrder = async (e) => {
    e.preventDefault();
    setFormErrors(null);

    const errors = {};
    if (!isValidPhone(phone))
      errors.phone = "Please give us your correct phone number";

    if (Object.keys(errors).length > 0) return setFormErrors(errors);

    const newOrder = {
      cart,
      customer,
      phone,
      address,
      priority: withPriority === "on",
    };

    try {
      setIsLoading(true);
      const res = await fetch(`${API_URL}/order`, {
        method: "POST",
        body: JSON.stringify(newOrder),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const { data } = await res.json();

      dispatch(clearCart());
      toast.success("Order Is Created");

      setIsLoading(false);
      navigate(`/order/${data.id}`);
    } catch (err) {
      toast.error(err.message);
    }
  };

  useEffect(() => {
    setAddress(userAddress);
  }, [userAddress]);

  if (!cart.length) return <EmptyCart />;

  return (
    <div className="px-4 py-6">
      <h2 className="mb-8 text-xl font-semibold">
        Ready to order? Let&lsquo;s go!
      </h2>

      <form onSubmit={handleNewOrder}>
        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">First Name</label>
          <input
            value={customer}
            onChange={(e) => setCustomer(e.target.value)}
            className="input grow"
            type="text"
            name="customer"
            required
          />
        </div>

        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">Phone number</label>
          <div className="grow">
            <input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="input w-full"
              type="tel"
              name="phone"
              required
            />
            {formErrors?.phone && (
              <p className="mt-2 rounded-md bg-red-100 p-2 text-xs text-red-700">
                {formErrors.phone}
              </p>
            )}
          </div>
        </div>

        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center relative">
          <label className="sm:basis-40">Address</label>
          <div className="grow">
            <input
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="input w-full"
              type="text"
              name="address"
              required
            />
          </div>
          <span className="z-100 absolute right-[3px] top-[3px] sm:right-[5px]">
            <Button onClick={handlePosition} type="small">
              GET POSITION
            </Button>
          </span>
        </div>

        <div className="mb-12 flex items-center gap-5">
          <input
            value={withPriority}
            onChange={() =>
              setWithPriority((prev) => (prev === "on" ? "off" : "on"))
            }
            className="h-6 w-6 accent-yellow-400 focus:outline-none focus:ring focus:ring-yellow-400 focus:ring-offset-2"
            type="checkbox"
            name="priority"
            id="priority"
          />
          <label htmlFor="priority" className="font-medium">
            Want to yo give your order priority?
          </label>
        </div>

        <div>
          <input type="hidden" name="cart" value={JSON.stringify(cart)} />
          <Button disabled={isLoading} type="primary">
            {isLoading
              ? "Placing order...."
              : `Order now ${formatCurrency(totalPrice)}`}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CreateOrder;
