import React from "react";

type GraphProps = {
  banner: string;
};
const Graph = (props: GraphProps) => (
  <div className="terminal-banner">{props.banner}</div>
);

export default Graph;
