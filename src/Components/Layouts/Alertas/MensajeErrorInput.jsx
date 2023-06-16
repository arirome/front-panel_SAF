import { ErrorMessage } from "formik";
import React from "react";

const MensajeErrorInput = ({ name, className }) => {
  return (
    <ErrorMessage
      name={name}
      render={(msg) => (
        <div className={className} role="alert">
          {msg}
        </div>
      )}
    />
  );
};

export default MensajeErrorInput;