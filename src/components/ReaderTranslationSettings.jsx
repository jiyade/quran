import { useState, useEffect } from 'react'

import Select from './Select'
import Option from './Option'

import translationLanguages from '../data/translationLanguages.json'
import availableTranslations from '../data/availableTranslations.json'

translationLanguages.sort((a, b) => a.name.localeCompare(b.name))
availableTranslations.sort((a, b) => a.name.localeCompare(b.name))

const ReaderTranslationSettings = ({
    language,
    setLanguage,
    translation,
    setTranslation,
    
}) => {
    const [translations, setTranslations] = useState(availableTranslations)

    useEffect(() => {
        const allTranslations = [...availableTranslations]

        const filteredTranslations = allTranslations.filter(
            (translation) =>
                translation.language === language.name.toLowerCase()
        )

        const newTranslation = {
            name: filteredTranslations[0]?.name,
            val: filteredTranslations[0]?.id
        }

        localStorage.setItem('translation', JSON.stringify(newTranslation))

        setTranslation(newTranslation)
        setTranslations(filteredTranslations)
    }, [language])

    const handleLanguageSelect = (value) => {
        localStorage.setItem('translationLanguage', JSON.stringify(value))

        setLanguage(value)
    }

    const handleTranslationSelect = (value) => {
        localStorage.setItem('translation', JSON.stringify(value))
        setTranslation(value)
    }

    return (
        <div className='flex flex-col gap-8 pt-3 text-sm'>
            <div className='flex items-center px-3 justify-between'>
                <p className='font-medium'>Language</p>
                <div className='flex items-center gap-3 px-2'>
                    <Select selected={language}>
                        {translationLanguages.map((ln) => (
                            <Option
                                value={{
                                    name: ln.name,
                                    val: ln.code,
                                    direction: ln.direction
                                }}
                                selected={language}
                                handleClick={handleLanguageSelect}
                                key={ln.id}
                            >
                                {ln.name}
                            </Option>
                        ))}
                    </Select>
                </div>
            </div>

            <div className='flex items-center px-3 justify-between'>
                <p className='font-medium'>Translation</p>
                <div className='flex items-center gap-3 px-2'>
                    <Select selected={translation}>
                        {translations.map((translation) => (
                            <Option
                                value={{
                                    name: translation.name,
                                    val: translation.id
                                }}
                                selected={translation}
                                handleClick={handleTranslationSelect}
                                key={translation.id}
                            >
                                {translation.name}
                            </Option>
                        ))}
                    </Select>
                </div>
            </div>
        </div>
    )
}

export default ReaderTranslationSettings
