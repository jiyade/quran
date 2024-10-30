import { useParams } from 'react-router-dom'
import AyahWithTranslation from './AyahWithTranslation'
import SurahDescription from './SurahDescription'

const AyahWithTranslationContainer = ({
    translationData,
    surah,
    isRecite,
    handleAyahSelection,
    font,
    fontSize,
    currentSurahNumber,
    lastSurahNumber,
    currentJuz,
    currentHizb,
    setCurrentJuz,
    setCurrentHizb,
    mainDivRef,
    isJuzPage = false
}) => {
    const surahId = surah?.surah?.number || Number(useParams().id)

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
                    font={font}
                />
            </div>
            <div
                className={`px-1 w-full ${
                    isJuzPage
                        ? currentSurahNumber === lastSurahNumber
                            ? 'pb-[60px] pt-4'
                            : 'pb-4 pt-4'
                        : 'pb-[60px] pt-[70px]'
                }`}
            >
                {surah?.ayahs &&
                    surah?.ayahs?.map((ayah) => (
                        <AyahWithTranslation
                            ayah={ayah}
                            key={isJuzPage ? ayah.id : ayah.numberInSurah}
                            translation={
                                translationData[
                                    surahId === 1
                                        ? ayah.numberInSurah - 1
                                        : ayah.numberInSurah
                                ]
                            }
                            numberOfAyahs={surah.numberOfAyahs}
                            isRecite={isRecite}
                            font={font}
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

export default AyahWithTranslationContainer
