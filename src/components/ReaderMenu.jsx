import toast from 'react-hot-toast'
import { PiTranslateBold } from 'react-icons/pi'
import { PiTranslateFill } from 'react-icons/pi'
import { HiOutlineSpeakerWave } from 'react-icons/hi2'
import { HiSpeakerWave } from 'react-icons/hi2'
import { IoSettingsOutline } from 'react-icons/io5'
import { MdOutlineNavigateNext } from 'react-icons/md'
import { MdOutlineNavigateBefore } from 'react-icons/md'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'

const ReaderMenu = ({
    setIsRecite,
    isRecite,
    isTranslate,
    setIsTranslate,
    setAudioData,
    setIsReaderSettingsShown,
    toastId,
    offlineToastId,
    setIsTranslationLoading,
    isJuzPage,
    isHizbPage
}) => {
    const navigate = useNavigate()
    const [searchParams] = useSearchParams()
    const id = Number(useParams().id)

    const isStartAndEnd =
        (searchParams.get('start') && searchParams.get('end') && true) || false

    let isNextDisabled = isStartAndEnd
    let isPreviousDisabled = isStartAndEnd

    if (!isStartAndEnd) {
        if (isJuzPage) {
            isNextDisabled = id >= 30
        } else if (isHizbPage) {
            isNextDisabled = id >= 60
        } else if (!isJuzPage && !isHizbPage) {
            isNextDisabled = id >= 114
        }

        isPreviousDisabled = id <= 1
    }

    const handleRecite = () => {
        setIsRecite((prev) => !prev)

        if (isRecite) {
            toast.dismiss(toastId.current)
            setAudioData(null)
        } else {
            toastId.current = toast('Please click on the verse to be recited', {
                duration: 3000,
                style: {
                    borderRadius: '10px',
                    background: '#333',
                    color: '#fff',
                    fontSize: '.8em'
                }
            })
        }
    }

    const handleTranslate = () => {
        if (isTranslate) {
            setIsTranslationLoading(true)
            setTimeout(() => {
                setIsTranslate(false)
                setIsTranslationLoading(false)
            }, 300)
        } else {
            setIsTranslate(true)
        }
    }

    const handleNext = () => {
        if (isJuzPage) {
            if (id < 30)
                navigate(`/quran/juz-hizb/juz/${id + 1}`, { replace: true })
        } else if (isHizbPage) {
            if (id < 60)
                navigate(`/quran/juz-hizb/hizb/${id + 1}`, { replace: true })
        } else {
            if (id < 114) navigate(`/quran/surah/${id + 1}`, { replace: true })
        }
    }

    const handlePrevious = () => {
        if (isJuzPage) {
            if (id > 1)
                navigate(`/quran/juz-hizb/juz/${id - 1}`, { replace: true })
        } else if (isHizbPage) {
            if (id > 1)
                navigate(`/quran/juz-hizb/hizb/${id - 1}`, { replace: true })
        } else {
            if (id > 1) navigate(`/quran/surah/${id - 1}`, { replace: true })
        }
    }

    return (
        <footer className='flex flex-row justify-evenly gap-10 items-center w-full py-4 px-3'>
            <button
                onClick={handleNext}
                disabled={isNextDisabled}
            >
                <MdOutlineNavigateBefore
                    size='1.5em'
                    color={`${isNextDisabled ? 'grey' : ''}`}
                />
            </button>
            <button onClick={handleTranslate}>
                {!isTranslate ? (
                    <PiTranslateBold size='1.2em' />
                ) : (
                    <PiTranslateFill size='1.2em' />
                )}
            </button>
            <button onClick={handleRecite}>
                {!isRecite ? (
                    <HiOutlineSpeakerWave
                        className='stroke-2'
                        size='1.2em'
                    />
                ) : (
                    <HiSpeakerWave size='1.2em' />
                )}
            </button>
            <button onClick={() => setIsReaderSettingsShown((prev) => !prev)}>
                <IoSettingsOutline size='1.2em' />
            </button>
            <button
                onClick={handlePrevious}
                disabled={isPreviousDisabled}
            >
                <MdOutlineNavigateNext
                    size='1.5em'
                    color={`${isPreviousDisabled ? 'grey' : ''}`}
                />
            </button>
        </footer>
    )
}

export default ReaderMenu
