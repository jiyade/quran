import Select from './Select'
import Option from './Option'

import availableAudio from '../data/availableAudio'
import availableFullAudio from '../data/availableFullAudio'

availableAudio.sort((a, b) => a.englishName.localeCompare(b.englishName))

const ReaderRecitationSettings = ({
    reciter,
    setReciter,
    surahReciter,
    setSurahReciter,
    recitationsPage = false
}) => {
    const handleSelectReciter = (value) => {
        localStorage.setItem('reciter', JSON.stringify(value))
        setReciter(value)
    }

    const handleSelectSurahReciter = (value) => {
        localStorage.setItem('surah-reciter', JSON.stringify(value))
        setSurahReciter(value)
    }

    return (
        <div className='flex flex-col gap-8 pt-3 text-sm'>
            <div className='flex items-center px-3 justify-between'>
                <p className='font-medium'>Reciter{recitationsPage && ':'}</p>
                <div className='flex items-center gap-3 px-2'>
                    {!recitationsPage ? (
                        <Select selected={reciter}>
                            {availableAudio.map((audio) => (
                                <Option
                                    value={{
                                        name: audio.englishName,
                                        val: audio.identifier
                                    }}
                                    selected={reciter}
                                    handleClick={handleSelectReciter}
                                    key={audio.identifier}
                                    recitationsPage={recitationsPage}
                                >
                                    {audio.englishName}
                                </Option>
                            ))}
                        </Select>
                    ) : (
                        <Select
                            selected={surahReciter}
                            recitationsPage={recitationsPage}
                        >
                            {availableFullAudio.map((audio) => (
                                <Option
                                    value={{
                                        name: audio.reciter_name,
                                        val: audio.id
                                    }}
                                    selected={surahReciter}
                                    handleClick={handleSelectSurahReciter}
                                    key={audio.id}
                                    recitationsPage={recitationsPage}
                                >
                                    {audio.reciter_name}
                                </Option>
                            ))}
                        </Select>
                    )}
                </div>
            </div>
        </div>
    )
}

export default ReaderRecitationSettings
