import { Link } from 'react-router-dom'

import Surah from './Surah'

const JuzWrapper = ({ juz, surahs,font }) => {
    const keys = Object.keys(juz.verses).map(Number)
    const surahsInJuz = surahs.filter((surah) => keys.includes(surah.number))
    

    return (
        <div className='flex flex-col px-3 pb-3 border rounded-md'>
            <Link
                to={`juz/${juz.number}`}
                className='flex justify-between'
            >
                <p className='font-medium text-sm py-2'>
                    Juz {juz.number}
                    <span className='px-1 text-xs'>({juz.total} Ayahs)</span>
                </p>
                <p className='py-2 font-medium text-sm underline'>Read Juz</p>
            </Link>
            <div className='flex flex-col gap-1'>
                {surahsInJuz.map((surah, i) => (
                    <Surah
                        surah={surah}
                        isJuzPage={true}
                        firstAyahInJuz={juz.first}
                        lastAyahInJuz={juz.last}
                        ayahRange={juz.verses[keys[i]]}
                        font={font}
                        key={surah.number}
                    />
                ))}
            </div>
        </div>
    )
}

export default JuzWrapper
