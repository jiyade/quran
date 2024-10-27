import { Link } from 'react-router-dom'

const HizbQuarter = ({ hizbQuarter, hizbNumber, quarter }) => {
    const quartersInArabic = {
        1: 'الربع الأول',
        2: 'الربع الثاني',
        3: 'الربع الثالث',
        4: 'الربع الرابع'
    }
    
    return (
        <Link
            to={`/quran/juz-hizb/hizb/${hizbNumber}?quarter=${quarter}`}
            className='flex flex-row px-3 py-3 justify-between items-center border rounded-md'
        >
            <div className='flex flex-row justify-center items-center gap-1 px-1'>
                <div className='w-9 h-9 flex justify-center items-center rounded-[4px] rotate-45 bg-[#e1f3ee]'>
                    <p className='text-main-text font-medium -rotate-45'>
                        {hizbQuarter?.number}
                    </p>
                </div>
                <div className='flex flex-col justify-center pl-4 gap-0.5'>
                    <p className={`text-main-text font-medium`}>
                        Quarter {quarter}
                    </p>
                    <span className='text-sub-text font-medium text-xs'>
                        Start: {hizbQuarter?.start}
                    </span>
                </div>
            </div>

            <div className='flex flex-row justify-center items-center'>
                <div className='flex flex-col justify-center items-end pr-4'>
                    <p
                        className={`text-main-text font-medium font-amiri text-lg`}
                    >
                        {quartersInArabic[quarter]}
                    </p>
                    <span className='text-sub-text font-medium text-xs'>
                        {hizbQuarter.total} Ayahs
                    </span>
                </div>
            </div>
        </Link>
    )
}

export default HizbQuarter
