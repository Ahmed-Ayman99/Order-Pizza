import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import CreateUser from "../features/user/CreateUser";

const Home = () => {
  const { username } = useSelector((state) => state.user);

  return (
    <div className="my-10 px-4 text-center sm:my-16">
      <h1 className="mb-8 text-9xl font-semibold md:text-3xl">
        The best pizza.
        <br />
        <span className="text-yellow-500 text-3xl">
          Straight out of the oven, straight to you.
        </span>
      </h1>

      <p className="mb-4 text-base text-stone-600 md:text-base">
        👋 Welcome! Please start by telling us your name:
      </p>

      {username ? (
        <Link
          className="inline-block text-sm rounded-full bg-yellow-400 font-semibold uppercase tracking-wide text-stone-800 transition-colors duration-300 hover:bg-yellow-300 focus:bg-yellow-300 focus:outline-none focus:ring focus:ring-yellow-300 focus:ring-offset-2 disabled:cursor-not-allowed px-4 py-3 md:px-6 md:py-4"
          to="/menu"
        >
          Coutinue oredering, {username}
        </Link>
      ) : (
        <CreateUser />
      )}
    </div>
  );
};

export default Home;
