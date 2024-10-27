const Option = ({
    children,
    value,
    selected,
    handleClick,
    recitationsPage
}) => {
    return (
        <div
            className={`flex items-center py-2 p-2 ${
                value.val === selected.val
                    ? recitationsPage
                        ? 'bg-[#e7f3ed]'
                        : 'bg-[#2c3a51]'
                    : ''
            }`}
            onClick={() => handleClick(value)}
        >
            <span>{children}</span>
        </div>
    )
}

export default Option
