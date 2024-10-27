const ReaderSettingsItem = ({ text, className, onClick }) => {
    return (
        <div className={`py-2 px-4 rounded-md text-xs border ${className}`} onClick={onClick}>
            <span>{text}</span>
        </div>
    )
}

export default ReaderSettingsItem
