const FormLabel = ({children, htmlFor}) => {
    return (
        <label className="mb-3 block text-black dark:text-white" htmlFor={htmlFor}>
            {children}
        </label>
    );
};

export default FormLabel;