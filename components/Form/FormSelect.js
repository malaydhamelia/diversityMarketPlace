import { useFormContext } from "react-hook-form";
import cc from "classcat";

function FormSelect({
  label,
  name,
  options,
  required = false,
  validation = {},
  ...props
}) {
  const { errors, register } = useFormContext();

  const isRequired = required ? `${label || name} is required` : false;
  const isError = errors[name];

  const inputClass = cc([
    "appearance-none bg-transparent placeholder-faded-black border focus:border-black rounded-md w-full",
    { "border-faded-black": !isError, "border-red-500": isError },
  ]);

  return (
    <div className="py-1 md:py-2">
      <select
        ref={register({ required: isRequired, ...validation })}
        id={name}
        name={name}
        className={inputClass}
        {...props}
      >
        {options.map(({ value, label }) => (
          <option key={value} value={value}>
            {label || value}
          </option>
        ))}
      </select>

      {isError && (
        <div className="py-2">
          <FormError children={isError?.message} />
        </div>
      )}
    </div>
  );
}

export default FormSelect;
