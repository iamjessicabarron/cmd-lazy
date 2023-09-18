import { FunctionComponent } from "react";
import Logo from "../assets/logo.svg";

const Navigation: FunctionComponent = () => {
  return (
    <div className="w-full p-2">
      <img className="h-16 mx-auto" src={Logo} alt="logo" />
    </div>
  );
};

export default Navigation;
