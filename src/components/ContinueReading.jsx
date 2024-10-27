import { useNavigate } from 'react-router-dom'

import { FaPlay } from 'react-icons/fa'

const ContinueReading = ({ lastRead }) => {
    const navigate = useNavigate()
    const url = lastRead.pathname.includes('?')
        ? `${lastRead.pathname}&continue=true`
        : `${lastRead.pathname}?continue=true`
    
    return (
        <div className='flex items-center justify-between'>
            <div className='flex items-center gap-2'>
                <p className='text-sm text-main-text'>Last read:</p>
                <p className='font-medium text-main-text'>{lastRead.surah}</p>
            </div>
            <div
                className='flex items-center justify-center gap-2'
                onClick={() => navigate(url)}
            >
                <button className='text-sub-text font-medium'>
                    Continue reading
                </button>
                <FaPlay
                    size='0.6em'
                    className='text-sub-text mt-0.5'
                />
            </div>
        </div>
    )
}

export default ContinueReading
