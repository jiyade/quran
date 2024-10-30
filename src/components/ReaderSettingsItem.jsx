const ReaderSettingsItem = ({
    text,
    className,
    onClick,
    selected,
    
}) => {
    return (
        <div
            className={`py-2 px-4 rounded-md text-xs border ${
                selected
                    ? 'bg-blue-300 bg-opacity-40 border-black'
                    : 'bg-transparent'
            } ${className}`}
            onClick={onClick}
        >

                <span className=''>{text}</span>
                
        </div>
    )
}

export default ReaderSettingsItem
