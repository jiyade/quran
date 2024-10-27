import { useState, useEffect, useRef } from 'react'
import { IoIosArrowUp, IoIosArrowDown } from 'react-icons/io'

const Select = ({ children, selected, recitationsPage=false }) => {
    const [isOptionsShown, setIsOptionsShown] = useState(false)

    const selectRef = useRef(null)

    useEffect(() => {
        if (!isOptionsShown) return

        const handleClick = (e) => {
            if (!selectRef.current.contains(e.target)) {
                setIsOptionsShown(false)
            }
        }

        window.addEventListener('click', handleClick)

        return () => window.removeEventListener('click', handleClick)
    }, [isOptionsShown])

    return (
        <div
            className='flex flex-col relative'
            onClick={() => setIsOptionsShown((prev) => !prev)}
            ref={selectRef}
        >
            <div className='flex justify-between items-center gap-2 w-52 px-3 py-3 border rounded-md'>
                <span>{selected.name}</span>
                <span>
                    {isOptionsShown ? <IoIosArrowUp /> : <IoIosArrowDown />}
                </span>
            </div>
            {isOptionsShown && (
                <div className='absolute top-full w-full pt-0.5 pb-6 z-30'>
                    <div
                        className={`flex flex-col w-full max-h-48 overflow-y-scroll rounded-b-md ${
                            recitationsPage
                                ? 'bg-main border'
                                : 'bg-[#1b2436]'
                        }`}
                    >
                        {children}
                    </div>
                </div>
            )}
        </div>
    )
}

export default Select
