import type { UseFormRegisterReturn, FieldError } from "react-hook-form";

interface FormInputProps {
  label: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  register: UseFormRegisterReturn;
  error?: FieldError;
}

export default function FormInput({
  label,
  type = 'text',
  placeholder,
  required,
  register,
  error,
}: FormInputProps) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        type={type}
        {...register}
        placeholder={placeholder}
        className={`mt-1 block w-full rounded-md border px-3 py-2 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm 
          ${error ? 'border-red-500' : 'border-gray-300'}
        `}
      />
      {error && <p className="mt-1 text-xs text-red-500">{error.message}</p>}
    </div>
  );
}
