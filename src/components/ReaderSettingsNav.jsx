const ReaderSettingsNav = ({ currentSetting, setCurrentSetting }) => {
    return (
        <div className='relative'>
            <div className='flex justify-around items-center w-full text-base border-b-[0.5px] border-gray-300 pb-2 pt-5 fixed left-0 bg-gray-900 z-10 rounded-t-xl'>
                <Button
                    text='Display'
                    currentSetting={currentSetting}
                    handleClick={() => setCurrentSetting('display')}
                />
                <Button
                    text='Recitation'
                    currentSetting={currentSetting}
                    handleClick={() => setCurrentSetting('recitation')}
                />
                <Button
                    text='Translation'
                    currentSetting={currentSetting}
                    handleClick={() => setCurrentSetting('translation')}
                />
            </div>
        </div>
    )
}

const Button = ({ text, currentSetting, handleClick }) => {
    return (
        <button
            className={`${
                currentSetting === text.toLowerCase()
                    ? 'border-b-2'
                    : 'border-0'
            } px-2 py-0.5 border-blue-200 rounded-sm text-sm`}
            onClick={handleClick}
        >
            {text}
        </button>
    )
}

export default ReaderSettingsNav
