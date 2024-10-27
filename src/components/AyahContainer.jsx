import Ayah from './Ayah'
import SurahDescription from './SurahDescription'

const AyahContainer = ({
    surah,
    isJuzPage = false,
    isRecite,
    handleAyahSelection,
    fontSize,
    currentSurahNumber,
    lastSurahNumber,
    currentJuz,
    currentHizb,
    setCurrentJuz,
    setCurrentHizb,
    mainDivRef
}) => {
    return (
        <div className='flex flex-col'>
            <div
                className={`w-full z-10 ${
                    isJuzPage ? 'sticky top-0' : 'fixed'
                }`}
            >
                <SurahDescription
                    surah={isJuzPage ? surah.surah : surah}
                    currentJuz={currentJuz}
                    currentHizb={currentHizb}
                />
            </div>
            <div
                dir='rtl'
                className={`px-5 w-full leading-[3rem] text-justify font-amiri ${fontSize} ${
                    isJuzPage
                        ? currentSurahNumber === lastSurahNumber
                            ? 'pb-[60px] pt-4'
                            : 'pb-4 pt-4'
                        : 'pb-[60px] pt-[75px]'
                }`}
                style={{ textAlignLast: 'center' }}
            >
                {surah?.ayahs &&
                    surah?.ayahs?.map((ayah) => (
                        <Ayah
                            ayah={ayah}
                            key={isJuzPage ? ayah.id : ayah.numberInSurah}
                            isRecite={isRecite}
                            handleAyahSelection={handleAyahSelection}
                            currentHizb={currentHizb}
                            setCurrentHizb={setCurrentHizb}
                            currentJuz={currentJuz}
                            setCurrentJuz={setCurrentJuz}
                            mainDivRef={mainDivRef}
                        />
                    ))}
            </div>
        </div>
    )
}

export default AyahContainer
