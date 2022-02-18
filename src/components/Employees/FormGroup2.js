import React from "react";

const FormGroup = ({
   labelName,
   labelClass,
   inputClass,
   inputType,
   inputName,
   inputValue,
   disabledOp,
   onChangeHandler,
   checkValid,
   errors,
}) => {
   return (
      <div className="form__group">
         <input
            className={`${inputClass} ${
               !disabledOp ? "form__input__edit" : ""
            } ${checkValid(errors[`${inputName}`]) ? "is-invalid" : ""}`}
            type={inputType}
            name={inputName}
            value={inputValue}
            disabled={disabledOp}
            onChange={onChangeHandler}
         />
         <small id="helpId" className="invalid-feedback">
            Debes ingresar un {inputName}
         </small>
      </div>
   );
};

export default FormGroup;