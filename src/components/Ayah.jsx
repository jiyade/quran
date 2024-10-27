import { useRef, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import EndOfAyah from './EndOfAyah'

const Ayah = ({
    ayah,
    isRecite,
    handleAyahSelection,
    currentHizb,
    setCurrentHizb,
    currentJuz,
    setCurrentJuz,
    mainDivRef
}) => {
    const ayahRef = useRef(null)
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
        <span
            dir='rtl'
            className={`${
                (surahId === 1 && ayah.numberInSurah === 1) ||
                ayah.numberInSurah === 0
                    ? 'block text-center'
                    : ''
            } ayah`}
            juz-number={ayah.juz}
            hizb-quarter-number={ayah.hizbQuarter}
            ref={ayahRef}
            onClick={() => handleAyahSelection(surahId, ayah.numberInSurah)}
        >
            <span
                className={`${
                    isRecite && ayah.numberInSurah !== 0 ? 'text-green-700' : ''
                }`}
            >
                {ayah.text.replace('\n', '')}
            </span>
            <span className='px-0.5'>
                {ayah.numberInSurah !== 0 && (
                    <EndOfAyah
                        number={ayah.numberInSurah?.toLocaleString('ar-SA')}
                    />
                )}
            </span>
        </span>
    )
}

export default Ayah
