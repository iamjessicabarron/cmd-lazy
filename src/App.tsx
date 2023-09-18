import { FunctionComponent, useState } from "react";
import Navigation from "./components/Navigation";

const App: FunctionComponent = () => {
  const [count, setCount] = useState(0);

  return (
    <div>
      <Navigation />
      <div className="w-max mx-auto m-6 bg-apricot-900 px-12 py-8 rounded-3xl">
        <h1>Hello world!</h1>
        <p>This is my website.</p>
        <div className="mt-6">
          <button
            className="w-full"
            onClick={() => setCount((count) => count + 1)}
          >
            Count is {count}
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;
