import { useState, useEffect } from 'react'

const SurahDescription = ({ surah, currentJuz, currentHizb, font }) => {
    const [formattedHizb, setFormattedHizb] = useState('')

    useEffect(() => {
        if (currentHizb) {
            const intigerPart = Math.floor(currentHizb / 4)
            const decimalPart = currentHizb % 4

            let final
            if (intigerPart) {
                if (decimalPart) {
                    final = `${decimalPart.toLocaleString(
                        'ar-SA'
                    )}/${(4).toLocaleString(
                        'ar-SA'
                    )} ${intigerPart.toLocaleString('ar-SA')}`
                } else {
                    final = `${intigerPart.toLocaleString('ar-SA')}`
                }
            } else {
                final = `${decimalPart.toLocaleString(
                    'ar-SA'
                )}/${(4).toLocaleString('ar-SA')}`
            }

            setFormattedHizb(final)
        }
    }, [currentHizb])

    return (
        <div
            className={`flex w-full h-16 relative font-${font} border-y-[3px] border-[#004d00] bg-[#004d00]`}
        >
            <div className='w-full h-full absolute flex items-center'>
                <div className='w-full h-[3px] bg-[#e8f5e9]'></div>
            </div>
            <div className='flex-none w-1/4 flex justify-center items-center font-medium text-white flex-col gap-2'>
                <div className=''>
                    {surah?.revelationType === 'Meccan' ? 'مكي' : 'مدني'}
                </div>
                <div className=''>حزب {formattedHizb}</div>
            </div>

            <div className='flex-none w-1/2 relative'>
                <div className='absolute flex inset-0 items-center justify-center'>
                    <div className='w-full h-full clip-hexagon border flex items-center justify-center text-lg font-black text-[#115740] bg-[#e8f5e9]'>
                        {surah?.name}
                    </div>
                </div>
            </div>
            <div className='flex-none w-1/4 flex justify-center items-center font-medium text-white flex-col gap-2'>
                <div className=''>
                    {surah?.numberOfAyahs.toLocaleString('ar-SA')} آيات
                </div>
                <div className=''>
                    الجزء {currentJuz.toLocaleString('ar-SA')}
                </div>
            </div>
        </div>
    )
}

export default SurahDescription
