import React from "react";

type ErrorMessageProps = {
  command: string;
};
const ErrorMessage = (props: ErrorMessageProps) => {
  return (
    <div className="terminal-error-group">
      <span className="terminal-error">
        {`command not found: ${props.command}.`}
      </span>
      <span>{`Type 'help' to view a list of available commands (hit enter after typing your command)`}</span>
    </div>
  );
};

export default ErrorMessage;
