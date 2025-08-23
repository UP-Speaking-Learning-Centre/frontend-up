const SectionTitle = ({
    title,
    subtitle,
    description,
}: {
    title?: string;
    subtitle?: string;
    description?: string;
}) => {
    return (
        <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-base font-semibold leading-7 text-[#CE6439]">{title}</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                {subtitle}
            </p>
            <p className="mt-6 text-lg leading-8 text-gray-600">{description}</p>
        </div>
    );
};

export default SectionTitle;
