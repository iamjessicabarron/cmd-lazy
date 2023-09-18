import { FunctionComponent, useState } from "react";
import Navigation from "./components/ui/Navigation";
import Widget from "./components/ui/Widget";

type Param = "a" | "b" | "c" | "d" | "e";
type MultiParamVariation = Record<Param, string>;

const parameters: Param[] = ["a", "b", "c", "d", "e"];
const defaultCommand = "";
const defaultValues = {
  a: "",
  b: "",
  c: "",
  d: "",
  e: "",
};

const exampleValues = {
  a: "Major_Charisma, Major_HomestyleCooking, Major_Fishing, Major_Fabrication, Major_Herbalism, Skill_Fitness",
  b: "8, 6, 6, 6, 6, 6",
  c: "",
  d: "",
  e: "",
};
const exampleCommand = "stats.set_skill_level {a} {b}";

const getParamVariations = (
  values: Record<Param, string>
): MultiParamVariation[] => {
  const entries = Object.entries(values);

  // return a new object where we have created the parameters
  // for each individual command (based on order)
  return entries.reduce<MultiParamVariation[]>((acc, entry) => {
    const [key, value] = entry;
    const split = value.split(",");

    const params = [...acc];
    split.forEach((v, i) => {
      params[i] = {
        ...params[i],
        [key]: v.trim(),
      };
    });

    return params;
  }, []);
};

const App: FunctionComponent = () => {
  const [values, setValues] = useState<Record<Param, string>>(exampleValues);
  const [command, setCommand] = useState(exampleCommand);
  const [scratchpad, setScratchpad] = useState("");

  const paramVariations = getParamVariations(values);

  const getCommands = () => {
    const cmds = paramVariations.map((variation) => {
      const entries = Object.entries(variation);

      return entries.reduce((cmd, entry) => {
        const [param, value] = entry;
        return cmd.replace(`{${param}}`, value);
      }, command);
    });

    return cmds;
  };

  const clearValues = () => {
    setValues(defaultValues);
  };

  const clearCommand = () => {
    setCommand(defaultCommand);
  };

  const clearScratchpad = () => {
    setScratchpad("");
  };

  return (
    <div className="bg-slate-50 h-full">
      <Navigation />
      <Widget className="w-max mx-auto text-2xl pt-12">
        With this easy, two step process, you too can be lazy!
      </Widget>
      <div className="flex gap-4 m-8">
        <Widget className="bg-white w-2/3">
          <Widget className="bg-mountbattenPink-700 my-4 flex justify-between">
            <h2>1. Choose your command</h2>
            <button
              className="border-2 border-black bg-transparent text-black hover:text-white hover:border- font-semibold"
              onClick={clearCommand}
            >
              clear
            </button>
          </Widget>
          <Widget>
            <textarea
              className="block w-full text-xl h-12"
              value={command}
              name={"command"}
              onChange={(e) => setCommand(e.target.value)}
            />
          </Widget>
          <Widget>
            {getCommands().map((c, i) => (
              <div className="flex items-center">
                <span className="inline-block mr-4 font-bold">{i}</span>
                <input
                  className="block w-full select-all bg-mountbattenPink-800 border-0 text-mountbattenPink-400 rounded-r-none h-12"
                  key={i}
                  value={c}
                  readOnly
                  name={"generated"}
                  type="text"
                />
                <button
                  className="rounded-l-none h-12"
                  onClick={() => navigator.clipboard.writeText(c)}
                >
                  Copy
                </button>
              </div>
            ))}
          </Widget>
        </Widget>
        <Widget className="flex bg-white">
          <div className="w-full">
            <Widget className="bg-apricot-700 my-4 flex justify-between">
              <h2>2. Set your variables</h2>
              <button
                className="border-2 border-black bg-transparent text-black hover:text-white hover:border- font-semibold"
                onClick={clearValues}
              >
                clear
              </button>
            </Widget>
            {parameters.map((v) => (
              <div className="flex w-full items-center pr-4" key={v}>
                <label className="inline-block mr-4 font-bold">{v}</label>
                <textarea
                  className="w-full"
                  value={values[v]}
                  name={v}
                  onChange={(e) =>
                    setValues({ ...values, [v]: e.target.value })
                  }
                />
              </div>
            ))}
          </div>
        </Widget>
        <Widget className="bg-white mx-auto w-2/3">
          <Widget className="bg-sunset-700 my-4 flex justify-between">
            <h2>3. Mess around with it</h2>
            <button
              className="border-2 border-black bg-transparent text-black hover:text-white hover:border- font-semibold"
              onClick={clearScratchpad}
            >
              clear
            </button>
          </Widget>
          <textarea
            className="w-full h-4/6 mx-auto"
            onChange={(e) => setScratchpad(e.target.value)}
            value={scratchpad}
          ></textarea>
        </Widget>
      </div>
    </div>
  );
};

export default App;
