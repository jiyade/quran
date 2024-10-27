import React from 'react'
import { useParams, useNavigate, useSearchParams } from 'react-router-dom'
import { useWakeLock } from 'react-screen-wake-lock'
import { useEffect, useState, useRef } from 'react'
import { FaArrowLeftLong } from 'react-icons/fa6'
import { CSSTransition } from 'react-transition-group'

import axios from 'axios'
import toast from 'react-hot-toast'

import Header from '../components/Header'
import ReaderMenu from '../components/ReaderMenu'
import ReaderSettings from '../components/ReaderSettings'
import AyahContainer from '../components/AyahContainer'
import AyahWithTranslationContainer from '../components/AyahWithTranslationContainer'
import MiniAudioPlayer from '../components/MiniAudioPlayer'
import FullScreenLoader from '../components/FullScreenLoader'

import { juzs } from '../quran/juz'
import bismiTranslations from '../data/bismiTranslations.json'

const AUDIO_BASE_URL = 'https://api.alquran.cloud/v1'
const TRANSLATION_BASE_URL = 'https://api.quran.com/api/v4'

const JuzReader = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const [searchParams] = useSearchParams()

    const [juz, setJuz] = useState({})
    const [surahs, setSurahs] = useState([])
    const [currentJuz, setCurrentJuz] = useState(null)
    const [currentHizb, setCurrentHizb] = useState(null)

    const [lastRead, setLastRead] = useState(() => {
        if (localStorage.getItem('last-read')) {
            return JSON.parse(localStorage.getItem('last-read'))
        } else {
            return null
        }
    })

    const [isLoading, setIsLoading] = useState(false)
    const [isAudioLoading, setIsAudioLoading] = useState(false)
    const [isTranslationLoading, setIsTranslationLoading] = useState(false)
    const [isRecite, setIsRecite] = useState(false)

    const [reciter, setReciter] = useState(() => {
        if (localStorage.getItem('reciter') === null) {
            const obj = {
                name: 'Alafasy',
                val: 'ar.alafasy'
            }
            localStorage.setItem('reciter', JSON.stringify(obj))
            return obj
        } else {
            return JSON.parse(localStorage.getItem('reciter'))
        }
    })

    const [isTranslate, setIsTranslate] = useState(false)
    const [isReaderSettingsShown, setIsReaderSettingsShown] = useState(false)
    const [audioData, setAudioData] = useState(null)

    const [language, setLanguage] = useState(() => {
        if (localStorage.getItem('translationLanguage') === null) {
            const obj = {
                name: 'English',
                val: 'en',
                direction: 'ltr'
            }
            localStorage.setItem('translationLanguage', JSON.stringify(obj))
            return obj
        } else {
            return JSON.parse(localStorage.getItem('translationLanguage'))
        }
    })

    const [translation, setTranslation] = useState(() => {
        if (localStorage.getItem('translation') === null) {
            const obj = {
                name: 'Dr. Mustafa Khattab, The Clear Quran',
                val: 131
            }
            localStorage.setItem('translation', JSON.stringify(obj))
            return obj
        } else {
            return JSON.parse(localStorage.getItem('translation'))
        }
    })

    const [translationData, setTranslationData] = useState([])
    const [fontSize, setFontSize] = useState('text-xl')
    const [autoScroll, setAutoScroll] = useState(false)
    const [autoScrollSpeed, setAutoScrollSpeed] = useState(30)
    const [brightness, setBrightness] = useState(100)

    const toastId = useRef(null)
    const offlineToastId = useRef(null)
    const nodeRef = useRef(null)
    const mainDivRef = useRef(null)

    const { isSupported, request, release } = useWakeLock()

    const handleAyahSelection = async (surahId, ayah, controlled = false) => {
        if ((!isRecite && !controlled) || ayah === 0) {
            return
        }

        if (!navigator.onLine) {
            toast.dismiss(offlineToastId?.current)
            offlineToastId.current = toast.error(
                'Please turn on the Internet',
                {
                    position: 'top-center',
                    duration: 3000,
                    style: {
                        marginTop: '50px',
                        fontSize: '.8em',
                        fontWeight: 600
                    }
                }
            )
            return
        }

        try {
            !controlled && setIsAudioLoading(true)
            toast.dismiss(toastId.current)

            const res = await axios.get(
                `${AUDIO_BASE_URL}/ayah/${surahId}:${ayah}/${reciter.val}`
            )
            const data = await res?.data?.data

            setAudioData(data)
        } catch (err) {
            console.log(err)
            toast.error('Failed to fetch audio', {
                position: 'top-center',
                duration: 3000,
                style: {
                    marginTop: '50px',
                    fontSize: '.8em',
                    fontWeight: 600
                }
            })
        } finally {
            setTimeout(() => {
                setIsRecite(false)
                setIsAudioLoading(false)
            }, 300)
        }
    }

    useEffect(() => {
        const handleSurahTranslation = async () => {
            try {
                if (!isTranslate) {
                    return
                }

                if (!navigator.onLine) {
                    toast.dismiss(offlineToastId?.current)
                    offlineToastId.current = toast.error(
                        'Please turn on the Internet',
                        {
                            position: 'top-center',
                            duration: 3000,
                            style: {
                                marginTop: '50px',
                                fontSize: '.8em',
                                fontWeight: 600
                            }
                        }
                    )
                    setIsTranslate(false)
                    return
                }

                setIsTranslationLoading(true)

                const surahNumbers = [
                    ...new Set(surahs.map((surah) => surah.number))
                ]
                const allTranslations = []

                for (const surah of surahNumbers) {
                    const res = await axios.get(
                        `${TRANSLATION_BASE_URL}/quran/translations/${translation.val}?chapter_number=${surah}`
                    )
                    const data = await res?.data?.translations

                    const newTranslation =
                        surah !== 1
                            ? [
                                  {
                                      text: bismiTranslations[
                                          `translation${translation.val}`
                                      ].text.replace(/<sup.*?<\/sup>/g, '')
                                  },
                                  ...data
                              ]
                            : data
                    allTranslations.push(newTranslation)
                }

                setTranslationData(allTranslations)
            } catch (err) {
                console.log(err)
                toast.error('Failed to fetch translations', {
                    position: 'top-center',
                    duration: 3000,
                    style: {
                        marginTop: '50px',
                        fontSize: '.8em',
                        fontWeight: 600
                    }
                })
            } finally {
                setTimeout(() => {
                    setIsTranslationLoading(false)
                }, 300)
            }
        }

        handleSurahTranslation()
    }, [
        navigator.onLine,
        isTranslate,
        TRANSLATION_BASE_URL,
        offlineToastId.current,
        language,
        translation
    ])

    useEffect(() => {
        setIsLoading(true)
        setJuz(juzs[`juz${id}`])

        setTimeout(() => {
            setIsLoading(false)
        }, 300)
    }, [id])

    useEffect(() => {
        if (Object.keys(juz).length > 0) {
            setSurahs([])
            const surahNumbers = [
                ...new Set(juz?.ayahs.map((ayah) => ayah.surah.number))
            ]

            surahNumbers.forEach((surahNumber, i) => {
                const ayahs = juz?.ayahs.filter(
                    (ayah) => ayah.surah.number === surahNumber
                )

                const surah = ayahs[0].surah

                const obj = { number: surahNumber, ayahs, surah }
                setSurahs((surahs) => [...surahs, obj])
                if (i === 0) {
                    if (surahNumber === 1) {
                        setCurrentJuz(ayahs[0].juz)

                        setCurrentHizb(ayahs[0].hizbQuarter)
                    } else {
                        setCurrentJuz(ayahs[1].juz)

                        setCurrentHizb(ayahs[1].hizbQuarter)
                    }
                }
            })
        }
    }, [juz])

    useEffect(() => {
        if (!autoScroll) return

        const mapSliderValue = (sliderValue) => {
            const sliderMin = 1
            const sliderMax = 100

            const newValueMin = 30
            const newValueMax = 5

            const percentage =
                (sliderValue - sliderMin) / (sliderMax - sliderMin)

            const newValue =
                newValueMin + percentage * (newValueMax - newValueMin)

            return newValue
        }

        const speed = mapSliderValue(autoScrollSpeed)

        const interval = setInterval(() => {
            mainDivRef.current.scrollBy(0, 1)
        }, speed)

        return () => clearInterval(interval)
    }, [autoScroll, autoScrollSpeed])

    useEffect(() => {
        let isWakeLockActive = false
        if (isSupported) {
            request('screen').then(() => {
                isWakeLockActive = true
            })
        }

        return () => {
            if (isSupported && isWakeLockActive) {
                release()
            }
        }
    }, [isSupported])

    // Save scroll position for continue reading
    useEffect(() => {
        const handleScroll = () => {
            const scrollPos = mainDivRef?.current?.scrollTop

            const pathname = location.pathname

            const obj = {
                pathname,
                surah: `Juz ${currentJuz}`,
                scrollPos
            }

            localStorage.setItem('last-read', JSON.stringify(obj))
        }

        handleScroll()
    }, [mainDivRef.current, location.pathname, currentJuz])

    useEffect(() => {
        const handleScroll = () => {
            const scrollPos = mainDivRef?.current?.scrollTop

            const pathname = location.pathname

            const obj = {
                pathname,
                surah: `Juz ${currentJuz}`,
                scrollPos
            }

            localStorage.setItem('last-read', JSON.stringify(obj))
        }

        mainDivRef?.current?.addEventListener('scroll', handleScroll)

        return () =>
            mainDivRef?.current?.removeEventListener('scroll', handleScroll)
    }, [mainDivRef?.current?.scrollTop, location?.pathname, currentJuz])

    // Auto scroll to the last read position
    useEffect(() => {
        if (
            lastRead &&
            lastRead?.scrollPos > 0 &&
            mainDivRef.current &&
            !isLoading &&
            searchParams.get('continue') === 'true'
        ) {
            mainDivRef.current.scrollTo({
                top: lastRead?.scrollPos,
                behavior: 'smooth'
            })
        }
    }, [lastRead, mainDivRef.current, isLoading])

    return (
        <>
            <div
                className='w-full h-full flex pb-4 relative'
                style={{
                    filter: `brightness(${
                        brightness < 15 ? '15' : brightness
                    }%)`
                }}
            >
                <div className='flex flex-col border-b-2 flex-1 relative'>
                    <div
                        className='flex flex-col items-center gap-1 text-main-text text-base font-semibold flex-1 bg-[#fffffd] overflow-y-scroll pt-[0.1px]'
                        ref={mainDivRef}
                    >
                        {!isLoading &&
                            juz.ayahs &&
                            surahs &&
                            !isTranslate &&
                            surahs.map((surah, index) => (
                                <AyahContainer
                                    surah={surah}
                                    isJuzPage={true}
                                    isRecite={isRecite}
                                    fontSize={fontSize}
                                    handleAyahSelection={handleAyahSelection}
                                    
                                    lastSurahNumber={surahs.length}
                                    currentSurahNumber={index + 1}
                                    currentJuz={currentJuz}
                                    setCurrentJuz={setCurrentJuz}
                                    currentHizb={currentHizb}
                                    setCurrentHizb={setCurrentHizb}
                                    mainDivRef={mainDivRef}
                                    key={surah.number}
                                />
                            ))}

                        {!isTranslationLoading &&
                            translationData.length > 0 &&
                            isTranslate &&
                            surahs.map((surah, index) => (
                                <AyahWithTranslationContainer
                                    translationData={translationData[index]}
                                    surah={surah}
                                    isRecite={isRecite}
                                    isJuzPage={true}
                                    fontSize={fontSize}
                                    handleAyahSelection={handleAyahSelection}
                                    
                                    lastSurahNumber={surahs.length}
                                    currentSurahNumber={index + 1}
                                    currentJuz={currentJuz}
                                    currentHizb={currentHizb}
                                    setCurrentJuz={setCurrentJuz}
                                    setCurrentHizb={setCurrentHizb}
                                    mainDivRef={mainDivRef}
                                    key={surah.number}
                                />
                            ))}
                    </div>

                    {audioData && !isAudioLoading && (
                        <MiniAudioPlayer
                            audioData={audioData}
                            setAudioData={setAudioData}
                            handleAyahSelection={handleAyahSelection}
                            setIsAudioLoading={setIsAudioLoading}
                        />
                    )}

                    <div className='w-full border-t px-4 fixed left-0 bottom-0 bg-main'>
                        <ReaderMenu
                            setIsRecite={setIsRecite}
                            isRecite={isRecite}
                            setIsTranslate={setIsTranslate}
                            isTranslate={isTranslate}
                            setAudioData={setAudioData}
                            toastId={toastId}
                            offlineToastId={offlineToastId}
                            setIsReaderSettingsShown={setIsReaderSettingsShown}
                            setIsTranslationLoading={setIsTranslationLoading}
                            isJuzPage={true}
                        />
                    </div>
                </div>
            </div>

            <CSSTransition
                in={isReaderSettingsShown}
                nodeRef={nodeRef}
                timeout={300}
                classNames='transition-height'
                unmountOnExit
            >
                <ReaderSettings
                    isReaderSettingsShown={isReaderSettingsShown}
                    nodeRef={nodeRef}
                    fontSize={fontSize}
                    setFontSize={setFontSize}
                    brightness={brightness}
                    setBrightness={setBrightness}
                    autoScroll={autoScroll}
                    setAutoScroll={setAutoScroll}
                    autoScrollSpeed={autoScrollSpeed}
                    setAutoScrollSpeed={setAutoScrollSpeed}
                    reciter={reciter}
                    setReciter={setReciter}
                    language={language}
                    setLanguage={setLanguage}
                    translation={translation}
                    setTranslation={setTranslation}
                />
            </CSSTransition>

            {(isLoading || isAudioLoading || isTranslationLoading) && (
                <FullScreenLoader isTransparent={isAudioLoading} />
            )}

            {isReaderSettingsShown && (
                <div
                    className='w-full min-h-[100dvh] fixed top-0 z-20 bg-black opacity-50'
                    onClick={() => setIsReaderSettingsShown(false)}
                ></div>
            )}
        </>
    )
}

export default JuzReader
