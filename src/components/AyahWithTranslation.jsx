import { useRef, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import EndOfAyah from './EndOfAyah'

const AyahWithTranslation = ({
    ayah,
    translation,
    numberOfAyahs,
    isRecite,
    handleAyahSelection,
    currentHizb,
    setCurrentHizb,
    currentJuz,
    setCurrentJuz,
    mainDivRef
}) => {
    const ayahRef = useRef(null)
    const direction = JSON.parse(
        localStorage.getItem('translationLanguage')
    ).direction
    const surahId = ayah?.surah?.number || Number(useParams().id)
    
    useEffect(() => {
        const checkAyahPosition = () => {
            if (ayahRef.current) {
                if (
                    ayah.hizbQuarter !== currentHizb &&
                    currentHizb !== undefined &&
                    ayah.hizbQuarter !== undefined
                ) {
                    const rect = ayahRef.current.getBoundingClientRect()
                    if (rect.y < 180 && rect.y > 160) {
                        setCurrentHizb(ayah.hizbQuarter)
                    }
                }
                if (
                    ayah.juz !== currentJuz &&
                    currentJuz !== undefined &&
                    ayah.juz !== undefined
                ) {
                    const rect = ayahRef.current.getBoundingClientRect()
                    if (rect.y < 180 && rect.y > 160) {
                        setCurrentJuz(ayah.juz)
                    }
                }
            }
        }

        if (mainDivRef.current) {
            mainDivRef.current.addEventListener('scroll', checkAyahPosition)
        }

        return () => {
            if (mainDivRef.current) {
                mainDivRef.current.removeEventListener(
                    'scroll',
                    checkAyahPosition
                )
            }
        }
    }, [currentHizb, ayah.hizbQuarter, currentJuz, ayah.juz])

    return (
        <div
            className={`flex flex-col gap-3 py-4 px-3 ${
                (surahId === 1 && ayah.numberInSurah !== 1) ||
                (surahId !== 1 && ayah.numberInSurah !== 0)
                    ? 'border-t'
                    : ''
            } ${ayah.numberInSurah !== numberOfAyahs ? 'border-b' : ''}`}
            ref={ayahRef}
        >
            <p
                dir='rtl'
                className='text-right text-lg leading-10'
                onClick={() => handleAyahSelection(surahId, ayah.numberInSurah)}
            >
                <span
                    className={`${
                        isRecite && ayah.numberInSurah !== 0
                            ? 'text-green-700'
                            : ''
                    } font-amiri`}
                >
                    {ayah?.text.replace('\n', '')}
                </span>
                <span className='px-0.5'>
                    {ayah.numberInSurah !== 0 && (
                        <EndOfAyah
                            number={ayah.numberInSurah?.toLocaleString('ar-SA')}
                        />
                    )}
                </span>
            </p>
            <p
                className={`text-left font-roboto text-sm`}
                dir={direction}
            >
                {translation?.text.replace(/<sup.*?<\/sup>/g, '')}
            </p>
        </div>
    )
}

export default AyahWithTranslation
