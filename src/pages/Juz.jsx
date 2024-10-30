import { useState, useEffect, useRef } from 'react'

import juzJson from '../data/juzs.json'
import hizbJson from '../data/hizbs.json'
import surahsJson from '../data/surahs.json'

import { IoSearchOutline } from 'react-icons/io5'
import { MdClear } from 'react-icons/md'

import JuzWrapper from '../components/JuzWrapper'
import HizbWrapper from '../components/HizbWrapper'
import Header from '../components/Header'
import Footer from '../components/Footer'

const Juz = () => {
    const [active, setActive] = useState(0)
    const [query, setQuery] = useState('')
    const [juzData, setJuzData] = useState(juzJson)
    const [hizbData, setHizbData] = useState(hizbJson)

    const [font, setFont] = useState(() => {
        if (localStorage.getItem('font') === null) {
            localStorage.setItem('font', 'amiri')
            return 'amiri'
        } else {
            return localStorage.getItem('font')
        }
    })

    const containerRef = useRef(null)
    const queryRef = useRef(null)
    const mainDivRef = useRef(null)

    useEffect(() => {
        if (!isNaN(query) && query.length > 0) {
            if (active === 0) {
                setJuzData(
                    juzJson.filter((juz) => juz.number === parseInt(query))
                )
            } else if (active === 1) {
                setHizbData(
                    hizbJson.filter((hizb) => hizb.number === parseInt(query))
                )
            }
        } else {
            if (active === 0) {
                setJuzData(juzJson)
            } else if (active === 1) {
                setHizbData(hizbJson)
            }
        }
    }, [query, active])

    return (
        <div
            ref={containerRef}
            className='w-full h-full flex flex-col'
        >
            <div className='flex flex-col px-4'>
                <Header title='Juz/Hizb' />
                <div className='flex flex-row bg-[#E7F3ED] items-center gap-3 px-4 py-2 rounded-lg'>
                    <IoSearchOutline
                        color='#115740'
                        size='1.4em'
                    />
                    <input
                        type='number'
                        placeholder={
                            active === 0 ? 'Juz number' : 'Hizb number'
                        }
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        className='placeholder-sub-text bg-transparent text-sub-text py-1 w-3/4 border-none outline-none text-base font-medium'
                        ref={queryRef}
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
                <div className='pt-3'>
                    <nav className='flex flex-row justify-around items-center text-center mt- pb-1 relative'>
                        <div
                            className={`text-lg w-1/2 ${
                                active === 0 ? 'font-bold' : ''
                            }`}
                            onClick={() => {
                                setActive(0)
                                setQuery('')
                                queryRef.current.blur()
                                mainDivRef.current.scrollTo(0, 0)
                            }}
                        >
                            Juz
                        </div>
                        <div
                            className={`text-lg w-1/2 ${
                                active === 1 ? 'font-bold' : ''
                            }`}
                            onClick={() => {
                                setActive(1)
                                setQuery('')
                                queryRef.current.blur()
                                mainDivRef.current.scrollTo(0, 0)
                            }}
                        >
                            Hizb
                        </div>
                        <div
                            className={`absolute  bottom-0 left-0 w-1/2 h-0.5 transition-transform duration-300 ease-out flex justify-center ${
                                active === 1 ? 'translate-x-full' : ''
                            }`}
                        >
                            <span className='h-full w-2/3 bg-[#115740]'></span>
                        </div>
                    </nav>
                </div>
            </div>
            <div
                className='relative w-full h-full overflow-y-scroll'
                ref={mainDivRef}
            >
                <div
                    className={`w-full h-full transition-all duration-300 ease-out ${
                        active === 0
                            ? 'opacity-100'
                            : 'opacity-0 max-h-0 overflow-hidden'
                    }`}
                >
                    <div className='flex flex-col px-3 pt-5 pb-20 gap-2'>
                        {juzData.map((juz) => (
                            <JuzWrapper
                                juz={juz}
                                surahs={surahsJson}
                                font={font}
                                key={juz.id}
                            />
                        ))}
                    </div>
                </div>
                <div
                    className={`w-full h-full transition-all duration-300 ease-out ${
                        active === 1
                            ? 'opacity-100'
                            : 'opacity-0 max-h-0 overflow-hidden'
                    }`}
                >
                    <div className='flex flex-col px-3 pt-5 pb-20 gap-2'>
                        {hizbData.map((hizb) => (
                            <HizbWrapper
                                hizb={hizb}
                                font={font}
                                key={hizb.id}
                            />
                        ))}
                    </div>
                </div>
            </div>
            <div className='w-full border-t px-4 fixed left-0 bottom-0 bg-main'>
                <Footer />
            </div>
        </div>
    )
}

export default Juz
