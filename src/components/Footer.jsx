import { NavLink, useLocation } from 'react-router-dom'
import { GoHome } from 'react-icons/go'
import { GoHomeFill } from 'react-icons/go'
import { HiOutlineSpeakerWave } from 'react-icons/hi2'
import { HiSpeakerWave } from 'react-icons/hi2'
import { HiOutlineBookOpen } from 'react-icons/hi'
import { HiBookOpen } from 'react-icons/hi2'

const Footer = () => {
    const location = useLocation()

    return (
        <footer className='flex flex-row justify-between items-center w-full py-4 px-6'>
            <NavLink
                to='/quran/surah'
                className='flex flex-col items-center justify-center'
            >
                {location.pathname === '/quran/surah' ? (
                    <GoHomeFill
                        size='1.5em'
                        color='#115740'
                    />
                ) : (
                    <GoHome
                        size='1.5em'
                        color='#115740'
                    />
                )}
                <span className='text-xs text-sub-text font-normal'>Home</span>
            </NavLink>
            <NavLink
                to='/quran/juz-hizb'
                className='flex flex-col items-center justify-center'
            >
                {location.pathname === '/quran/juz-hizb' ? (
                    <HiBookOpen
                        size='1.5em'
                        color='#115740'
                    />
                ) : (
                    <HiOutlineBookOpen
                        size='1.5em'
                        color='#115740'
                    />
                )}
                <span className='text-xs text-sub-text font-normal'>Juz</span>
            </NavLink>
            <NavLink
                to='/quran/recitations'
                className='flex flex-col items-center justify-center'
            >
                {location.pathname === '/quran/recitations' ? (
                    <HiSpeakerWave
                        size='1.5em'
                        color='#115740'
                    />
                ) : (
                    <HiOutlineSpeakerWave
                        size='1.5em'
                        color='#115740'
                    />
                )}
                <span className='text-xs text-sub-text font-normal'>
                    Recitations
                </span>
            </NavLink>
        </footer>
    )
}

export default Footer
