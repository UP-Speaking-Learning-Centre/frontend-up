const Title = ({ title, description }: { title: string; description: string }) => {
    return (
        <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-2xl font-bold leading-7 text-[#111827]">{title}</h2>
            <p className="mt-2 text-base text-[#4B5563]">{description}</p>
        </div>
    );
};

export default Title;
