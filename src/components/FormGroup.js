const FormGroup = ({title, description, children, grow}) => {
    return (
        <div className="flex gap-9">
            <div className="w-full rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                    <h3 className="font-medium text-black dark:text-white">
                        {title}
                    </h3>
                    {description ?? (
                        <p>{description}</p>
                    )}
                </div>
                <div className="flex flex-col gap-5.5 p-6.5">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default FormGroup;