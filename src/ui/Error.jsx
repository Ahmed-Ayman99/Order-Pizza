import LinkButton from "./LinkButton";

const Error = ({ message = "Something went wrong 😢" }) => {
  return (
    <div>
      <h1>{message}</h1>
      <LinkButton to="-1">&larr; Go back</LinkButton>
    </div>
  );
};

export default Error;
