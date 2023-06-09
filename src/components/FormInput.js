const FormInput = (props) => {
    const {id, type, placeholder, value, name} = props;
  
    return (
        <input
            id={id}
            type={type}
            placeholder={placeholder}
            value={value}
            name={name}
            className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"

            onBlur={props.onBlur}
            onChange={props.onChange}

            min={props.minimum ?? null}
            max={props.maximum ?? null}
            minLength={props.minLength ?? null}
            maxLength={props.maxLength ?? null}
            pattern={props.pattern ?? null}
        />
    );
};

export default FormInput;
