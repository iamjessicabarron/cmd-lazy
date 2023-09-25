import { FunctionComponent, useRef, useState } from "react";
import { ArrowDown, Clipboard as ClipboardIcon } from "react-feather";
import Navigation from "./components/ui/Navigation";

type Param = "a" | "b";
type MultiParamVariation = Record<Param, string>;

type CmdChainOption = "newline" | "and" | "semicolon" | "backslash";

const parameters: Param[] = ["a", "b"];
const defaultCommand = "";
const defaultValues = {
  a: "",
  b: "",
};

const exampleValues = {
  a: "Major_Charisma, Major_HomestyleCooking",
  b: "8, 6",
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

type ChainSelectOption = { value: string; label: string };

const cmdChainOptions: Record<CmdChainOption, ChainSelectOption> = {
  newline: {
    value: "\n",
    label: "newline ... \\n ",
  },
  and: {
    value: " && ",
    label: "and ... && ",
  },
  semicolon: {
    value: "; ",
    label: "semicolon ... ; ",
  },
  backslash: {
    value: " \\ \n",
    label: "backslash ... \\ ",
  },
};

const App: FunctionComponent = () => {
  const [values, setValues] = useState<Record<Param, string>>(exampleValues);
  const [command, setCommand] = useState(exampleCommand);
  const [scratchpad, setScratchpad] = useState("");

  const dropdownRef = useRef<HTMLDetailsElement>(null);

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

  const chainCommands = (opt: CmdChainOption) => {
    const commands = getCommands();
    const joined = commands.join(cmdChainOptions[opt].value);
    setScratchpad(joined);
  };

  return (
    <div className="h-full bg-base-200">
      <Navigation />
      <div className="hero pt-8">
        With this easy, two step process, you too can be lazy!
      </div>

      <div className="m-8 flex flex-wrap gap-4 max-w-screen-xl mx-auto">
        {/* main */}
        <div className="space-y-4 > * flex-grow flex-shrink-0 min-w-min">
          {/* one */}
          <div className="collapse collapse-arrow bg-base-100">
            <input type="checkbox" />
            <div className="collapse-title">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-1xl">1. Choose your command</h3>
              </div>
            </div>
            <div className="collapse-content pt-0">
              <div>
                <textarea
                  className="textarea bg-neutral-100 font-mono block w-full text-xl h-12 mb-4"
                  value={command}
                  name={"command"}
                  onChange={(e) => setCommand(e.target.value)}
                />
              </div>
              <div>
                <button className="btn btn-outline" onClick={clearCommand}>
                  Clear
                </button>
              </div>
            </div>
          </div>
          {/* two */}
          <div className="collapse collapse-arrow bg-base-100">
            <input type="checkbox" />
            <div className="collapse-title">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-1xl">2. Set your variables</h3>
              </div>
            </div>
            <div className="collapse-content pt-0">
              {parameters.map((v) => (
                <div className="flex w-full items-center pr-4 mb-4" key={v}>
                  <label className="inline-block mr-4 font-bold">{v}</label>
                  <textarea
                    className="textarea bg-neutral-100 w-full font-mono"
                    value={values[v]}
                    name={v}
                    onChange={(e) =>
                      setValues({ ...values, [v]: e.target.value })
                    }
                  />
                </div>
              ))}
              <button className="btn btn-outline" onClick={clearValues}>
                Clear
              </button>
            </div>
          </div>
        </div>
        {/* preview */}
        <div className="rounded-2xl bg-base-100 p-4 flex-grow flex-shrink-0 min-w-min">
          {getCommands().map((c, i) => (
            <div className="flex items-center mb-4">
              <span className="inline-block mr-4 font-bold">{i}</span>
              <input
                className="input input-bordered w-full rounded-r-none font-mono h-12"
                key={i}
                value={c}
                readOnly
                name={"generated"}
                type="text"
              />
              <button
                className="btn btn-neutral btn-xs rounded-l-none h-12"
                onClick={() => navigator.clipboard.writeText(c)}
              >
                <ClipboardIcon size={16} />
              </button>
            </div>
          ))}
          <details className="dropdown" ref={dropdownRef}>
            <summary className="btn btn-outline mb-4 mr-2">
              Chain commands <ArrowDown />
            </summary>
            <ul className="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52">
              {Object.entries(cmdChainOptions).map(([key, value]) => (
                <li
                  key={key}
                  onClick={() => {
                    chainCommands(key as CmdChainOption);
                    dropdownRef.current?.attributes.removeNamedItem("open");
                  }}
                >
                  <a>{value.label}</a>
                </li>
              ))}
            </ul>
          </details>
          <hr />
          <div className="relative mt-4">
            <textarea
              className="textarea textarea-bordered font-mono w-full h-fit pb-30"
              onChange={(e) => setScratchpad(e.target.value)}
              value={scratchpad}
            ></textarea>
            <button
              className="btn btn-neutral btn-sm btn-square absolute right-1 top-1"
              onClick={() => navigator.clipboard.writeText(scratchpad)}
            >
              <ClipboardIcon size={16} />
            </button>
          </div>
          <div>
            <button className="btn btn-outline" onClick={clearScratchpad}>
              Clear
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
