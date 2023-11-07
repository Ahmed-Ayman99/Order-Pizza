import Error from "../../ui/Error";
import Loadding from "../../ui/Loadding";
import MenuItem from "./MenuItem";
import useMenu from "./useMenu";

const Menu=()=> {
  const { isLoading, menu, error } = useMenu();

  if (isLoading) return <Loadding />;
  if (error) return <Error />;

  return (
    <ul className="divide-y divide-stone-200 px-2">
      {menu.map((pizza) => (
        <MenuItem pizza={pizza} key={pizza.id} />
      ))}
    </ul>
  );
}

export default Menu;
