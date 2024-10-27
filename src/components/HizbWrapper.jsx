import { Link } from 'react-router-dom'

import HizbQuarter from './HizbQuarter'

const HizbWrapper = ({ hizb }) => {
    const quarters = Object.keys(hizb.quarters).map(Number)

    return (
        <div className='flex flex-col px-3 pb-3 border rounded-md'>
            <Link
                to={`hizb/${hizb.number}`}
                className='flex justify-between'
            >
                <p className='font-medium text-sm py-2'>
                    Hizb {hizb.number}
                    <span className='px-1 text-xs'>({hizb.total} Ayahs)</span>
                </p>
                <p className='py-2 font-medium text-sm underline'>Read hizb</p>
            </Link>
            <div className='flex flex-col gap-1'>
                {quarters.map((quarter, i) => (
                    <HizbQuarter
                        hizbQuarter={hizb.quarters[quarter]}
                        quarter={i + 1}
                        hizbNumber={hizb.number}
                        key={i}
                    />
                ))}
            </div>
        </div>
    )
}

export default HizbWrapper
