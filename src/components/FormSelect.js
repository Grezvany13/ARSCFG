import Select from 'react-select';

const FormSelect = (props) => {
    const {id, type, placeholder, value, name} = props;
  
    return (
        <Select
            id={id}
            type={type}
            placeholder={placeholder}
            value={value}
            name={name}
            classNames={{
                clearIndicator: () => '',
                container: () => '',
                control: () => 'w-full dark:text-gray text-graydark rounded-lg border-[1.5px] border-stroke bg-transparent p-2 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary',
                dropdownIndicator: () => '',
                group: () => '',
                groupHeading: () => '',
                indicatorsContainer: () => '',
                indicatorSeparator: () => '',
                input: () => 'dark:text-gray text-graydark',
                loadingIndicator: () => '',
                loadingMessage: () => '',
                menu: () => 'bg-transparent border-[1.5px] border-stroke border-form-strokedark',
                menuList: () => 'dark:bg-form-input',
                menuPortal: () => '',
                multiValue: () => '',
                multiValueLabel: () => '',
                multiValueRemove: () => 'bg-warning dark:text-gray text-graydark dark:fill-gray fill-graydark',
                noOptionsMessage: () => '',
                option: () => 'bg-warning',
                placeholder: () => 'dark:text-gray text-graydark',
                singleValue: () => 'dark:text-gray text-graydark',
                valueContainer: () => 'dark:text-gray text-graydark',
            }}

            onBlur={props.onBlur}
            onChange={props.onChange}

            options={props.options}
            isClearable={props.isClearable ?? null}
            isMulti={props.isMulti ?? null}
        />
    );
};

export default FormSelect;
