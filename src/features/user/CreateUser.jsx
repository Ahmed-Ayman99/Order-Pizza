import { useDispatch } from "react-redux";
import { useState } from "react";

import Button from "../../ui/Button";
import { getname } from "./userSlice";

function CreateUser() {
  const [user, setUser] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(getname(user));
    setUser("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Your full name"
        className="input mb-8 w-72"
        value={user}
        onChange={(e) => setUser(e.target.value)}
      />

      {user !== "" && (
        <div>
          <Button type="primary">Start ordering</Button>
        </div>
      )}
    </form>
  );
}

export default CreateUser;
