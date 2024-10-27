import { useState, useEffect, useRef } from 'react'
import { IoSearchOutline } from 'react-icons/io5'
import { MdClear } from 'react-icons/md'

import axios from 'axios'
import toast from 'react-hot-toast'

import surahsJson from '../data/surahs.json'

import Header from '../components/Header'
import Footer from '../components/Footer'
import Surah from '../components/Surah'
import Select from '../components/Select'
import Option from '../components/Option'
import ReaderRecitationSettings from '../components/ReaderRecitationSettings'
import MiniAudioPlayer from '../components/MiniAudioPlayer'

const AUDIO_BASE_URL = 'https://api.quran.com/api/v4'

const Recitations = () => {
    const [query, setQuery] = useState('')
    const [surahs, setSurahs] = useState(surahsJson)
    const [audioData, setAudioData] = useState(null)
    const [isAudioLoading, setIsAudioLoading] = useState(false)

    const [surahReciter, setSurahReciter] = useState(() => {
        if (localStorage.getItem('surah-reciter') === null) {
            const obj = {
                name: 'AbdulBaset AbdulSamad',
                val: '1'
            }
            localStorage.setItem('surah-reciter', JSON.stringify(obj))
            return obj
        } else {
            return JSON.parse(localStorage.getItem('surah-reciter'))
        }
    })

    const offlineToastId = useRef(null)

    useEffect(() => {
        if (isNaN(query) && query.length > 0) {
            setSurahs(
                surahsJson.filter((surah) =>
                    surah.englishName
                        .toLowerCase()
                        .includes(query.toLowerCase())
                )
            )
        } else if (!isNaN(query) && query.length > 0) {
            setSurahs(
                surahsJson.filter((surah) => surah.number === parseInt(query))
            )
        } else {
            setSurahs(surahsJson)
        }
    }, [query])

    const reciteSurah = async (surahId) => {
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
            setIsAudioLoading(true)
            const res = await axios.get(
                `${AUDIO_BASE_URL}/chapter_recitations/${surahReciter.val}/${surahId}`
            )
            const data = await res?.data?.audio_file
            const obj = {
                audio: data.audio_url,
                reciter: surahReciter.name,
                surah: { number: surahId, englishName: surahsJson[surahId-1].englishName }
            }

            setAudioData(obj)
        } catch (err) {
            console.log(err)
        } finally {
            setTimeout(() => {
                setIsAudioLoading(false)
            }, 300)
        }
    }

    return (
        <div className='w-full h-full flex flex-col'>
            <div className='flex flex-col px-4'>
                <Header title='Recitations' />

                <div className='flex flex-row bg-[#E7F3ED] items-center gap-3 px-4 py-2 rounded-lg'>
                    <IoSearchOutline
                        color='#115740'
                        size='1.4em'
                    />
                    <input
                        type='text'
                        placeholder='Surah name, Surah number'
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        className='placeholder-sub-text bg-transparent text-sub-text py-1 w-3/4 border-none outline-none text-base font-medium'
                    />
                    {query && (
                        <button
                            className='ml-3'
                            onClick={() => setQuery('')}
                        >
                            <MdClear
                                color='#115740'
                                size='1.4em'
                            />
                        </button>
                    )}
                </div>

                <div className='flex flex-col py-5'>
                    <ReaderRecitationSettings
                        surahReciter={surahReciter}
                        setSurahReciter={setSurahReciter}
                        recitationsPage={true}
                    />
                </div>
            </div>

            <div className='flex flex-col overflow-y-scroll px-3 gap-2 pb-20'>
                {surahs.map((surah) => (
                    <Surah
                        surah={surah}
                        key={surah.number}
                        recitationsPage={true}
                        reciteSurah={reciteSurah}
                    />
                ))}
            </div>

            <div className='w-full border-t px-4 fixed left-0 bottom-0 bg-main'>
                <Footer />
            </div>
            {audioData && !isAudioLoading && (
                <MiniAudioPlayer
                    audioData={audioData}
                    setAudioData={setAudioData}
                    recitationsPage={true}
                    reciteSurah={reciteSurah}
                />
            )}
        </div>
    )
}

export default Recitations
