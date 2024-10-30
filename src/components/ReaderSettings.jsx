import { useState } from 'react'
import ReaderSettingsNav from './ReaderSettingsNav'
import ReaderDisplaySettings from './ReaderDisplaySettings'
import ReaderRecitationSettings from './ReaderRecitationSettings'
import ReaderTranslationSettings from './ReaderTranslationSettings'

const ReaderSettings = ({
    isReaderSettingsShown,
    nodeRef,
    font,
    setFont,
    fontSize,
    setFontSize,
    brightness,
    setBrightness,
    autoScroll,
    setAutoScroll,
    autoScrollSpeed,
    setAutoScrollSpeed,
    reciter,
    setReciter,
    language,
    setLanguage,
    translation,
    setTranslation
}) => {
    const [currentSetting, setCurrentSetting] = useState('display')

    return (
        <div
            className='w-full fixed bottom-0 left-0 z-30 bg-gray-900 rounded-t-xl h-[350px] overflow-y-scroll'
            ref={nodeRef}
        >
            <div className='flex flex-col gap-5 px-4 font-roboto text-gray-200'>
                <ReaderSettingsNav
                    currentSetting={currentSetting}
                    setCurrentSetting={setCurrentSetting}
                />

                <div className='pt-12 pb-5'>
                    {currentSetting === 'display' && (
                        <ReaderDisplaySettings
                            font={font}
                            setFont={setFont}
                            fontSize={fontSize}
                            setFontSize={setFontSize}
                            brightness={brightness}
                            setBrightness={setBrightness}
                            autoScroll={autoScroll}
                            setAutoScroll={setAutoScroll}
                            autoScrollSpeed={autoScrollSpeed}
                            setAutoScrollSpeed={setAutoScrollSpeed}
                        />
                    )}
                    {currentSetting === 'recitation' && (
                        <ReaderRecitationSettings
                            reciter={reciter}
                            setReciter={setReciter}
                        />
                    )}
                    {currentSetting === 'translation' && (
                        <ReaderTranslationSettings
                            language={language}
                            setLanguage={setLanguage}
                            translation={translation}
                            setTranslation={setTranslation}
                        />
                    )}
                </div>
            </div>
        </div>
    )
}

export default ReaderSettings
