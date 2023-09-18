import { FunctionComponent, PropsWithChildren } from "react";

type WidgetProps = {
  className?: string;
} & PropsWithChildren;

const Widget: FunctionComponent<WidgetProps> = (props) => {
  const { children, className } = props;
  return <div className={`w-full p-4 rounded-xl ${className}`}>{children}</div>;
};

export default Widget;
