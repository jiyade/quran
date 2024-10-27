const Header = ({ title, className = 'font-lora' }) => {
    return (
        <header className={`flex justify-center py-4`}>
            <h1 className={`text-lg font-bold text-main-text ${className}`}>
                {title}
            </h1>
        </header>
    )
}

export default Header
