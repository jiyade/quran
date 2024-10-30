import { useState, useEffect } from 'react'
import { IoSearchOutline } from 'react-icons/io5'
import { MdClear } from 'react-icons/md'

import surahsJson from '../data/surahs.json'

import Header from '../components/Header'
import Footer from '../components/Footer'
import Surah from '../components/Surah'
import ContinueReading from '../components/ContinueReading'

const Homepage = () => {
    const [query, setQuery] = useState('')
    const [surahs, setSurahs] = useState(surahsJson)
    
    const [font, setFont] = useState(() => {
        if (localStorage.getItem('font') === null) {
            localStorage.setItem('font', 'amiri')
            return 'amiri'
        } else {
            return localStorage.getItem('font')
        }
    })

    const [lastRead, setLastRead] = useState(() => {
        if (localStorage.getItem('last-read')) {
            return JSON.parse(localStorage.getItem('last-read'))
        } else {
            return null
        }
    })

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

    return (
        <div className='w-full h-full flex flex-col'>
            <div className='flex flex-col px-4'>
                <Header title="The Holy Qur'an" />

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

                {lastRead?.surah && (
                    <div className='pt-5'>
                        <ContinueReading lastRead={lastRead} />
                    </div>
                )}

                <div className='py-5'>
                    <h1 className='text-lg text-main-text font-semibold'>
                        All Surahs
                    </h1>
                </div>
            </div>

            <div className='flex flex-col overflow-y-scroll px-3 gap-2 pb-20'>
                {surahs.map((surah) => (
                    <Surah
                        surah={surah}
                        font={font}
                        key={surah.number}
                    />
                ))}
            </div>

            <div className='w-full border-t px-4 fixed left-0 bottom-0 bg-main'>
                <Footer />
            </div>
        </div>
    )
}

export default Homepage
