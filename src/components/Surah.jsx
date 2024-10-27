import { Link } from 'react-router-dom'

const Surah = ({
    surah,
    recitationsPage = false,
    reciteSurah = null,
    isJuzPage = false,
    firstAyahInJuz = null,
    lastAyahInJuz = null,
    ayahRange
}) => {
    return (
        <Link
            to={`${
                recitationsPage
                    ? ''
                    : isJuzPage
                    ? `/quran/surah/${surah.number}?start=${firstAyahInJuz}&end=${lastAyahInJuz}`
                    : surah.number
            }`}
            className='flex flex-row px-3 py-3 justify-between items-center border rounded-md'
            onClick={() => {
                if (recitationsPage) reciteSurah(surah.number)
            }}
        >
            <div className='flex flex-row justify-center items-center gap-1 px-1'>
                <div className='w-9 h-9 flex justify-center items-center rounded-[4px] rotate-45 bg-[#e1f3ee]'>
                    <p className='text-main-text font-medium -rotate-45'>
                        {surah.number}
                    </p>
                </div>
                <div className='flex flex-col justify-center pl-4 gap-0.5'>
                    <p className={`text-main-text font-medium`}>
                        {surah.englishName}
                    </p>
                    <span className='text-sub-text font-medium text-xs'>
                        {surah.englishNameTranslation}
                    </span>
                </div>
            </div>

            <div className='flex flex-row justify-center items-center'>
                <div className='flex flex-col justify-center items-end pr-4'>
                    <p
                        className={`text-main-text font-medium font-amiri text-lg`}
                    >
                        {surah.name}
                    </p>
                    <span className='text-sub-text font-medium text-xs'>
                        {isJuzPage
                            ? `Ayahs ${ayahRange}`
                            : `${surah.numberOfAyahs} Ayahs`}
                    </span>
                </div>
            </div>
        </Link>
    )
}

export default Surah
