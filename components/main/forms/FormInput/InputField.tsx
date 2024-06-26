import React from 'react';

import type { UseFormRegister, FieldValues, Path } from 'react-hook-form';

type InputFieldProps<T extends FieldValues> = {
  id: Path<T>;
  label: string;
  placeholder: string;
  error?: string;
  register: UseFormRegister<T>;
};

const InputField = <T extends FieldValues>({
  id,
  label,
  placeholder,
  error,
  register,
}: InputFieldProps<T>): JSX.Element => {
  return (
    <div className="mb-4">
      <label htmlFor={id} className="label">
        {label}
      </label>
      <input
        type="text"
        id={id}
        placeholder={placeholder}
        className="input bg-gray-700"
        {...register(id)}
      />
      {error !== null && <p className="error-message">{error}</p>}
    </div>
  );
};
export default InputField;
