import { useState, useRef, useEffect } from 'react'
import { FaPlay } from 'react-icons/fa'
import { IoMdPause } from 'react-icons/io'
import { MdSkipPrevious } from 'react-icons/md'
import { MdSkipNext } from 'react-icons/md'
import { IoClose } from 'react-icons/io5'
import Slider from '@mui/material/Slider'

const MiniAudioPlayer = ({
    audioData,
    setAudioData,
    setIsAudioLoading,
    handleAyahSelection,
    recitationsPage = false,
    reciteSurah
}) => {
    const [isPlaying, setIsPlaying] = useState(false)
    const [currentTime, setCurrentTime] = useState(0)
    const [duration, setDuration] = useState(0)

    const audioRef = useRef()

    const togglePlay = () => {
        if (isPlaying) {
            audioRef.current.pause()
        } else {
            audioRef.current.play()
        }
        setIsPlaying((prev) => !prev)
    }

    const updateTime = () => {
        setCurrentTime(Number(audioRef.current.currentTime))
        setDuration(Number(audioRef.current.duration))
    }

    const formatTime = (time) => {
        if (time >= 3600) {
            const hours = Math.floor(time / 3600)
            const minutes = Math.floor((time % 3600) / 60)
            const seconds = Math.floor(time % 60)
            return `${hours}:${minutes < 10 ? '0' : ''}${minutes}:${
                seconds < 10 ? '0' : ''
            }${seconds}`
        } else {
            const minutes = Math.floor(time / 60)
            const seconds = Math.floor(time % 60)
            return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`
        }
    }

    const handleSeek = (e, val) => {
        const seekTime = Number(val)
        audioRef.current.currentTime = seekTime
        setCurrentTime(seekTime)
    }

    const handleAudioEnd = () => {
        setAudioData(null)
    }

    const handleClose = () => {
        setAudioData(null)
    }

    const handlePrevious = () => {
        if (recitationsPage) {
            if (audioData?.surah.number > 1) {
                setIsPlaying(false)
                reciteSurah(audioData?.surah.number - 1)
            }
        } else {
            if (audioData?.numberInSurah > 1) {
                setIsPlaying(false)
                handleAyahSelection(
                    audioData?.surah.number,
                    audioData?.numberInSurah - 1,
                    true
                )
            }
        }
    }

    const handleNext = () => {
        if (recitationsPage) {
            if (audioData?.surah.number < 114) {
                setIsPlaying(false)
                reciteSurah(audioData?.surah.number + 1)
            }
        } else {
            if (audioData?.numberInSurah < audioData?.surah?.numberOfAyahs) {
                setIsPlaying(false)
                handleAyahSelection(
                    audioData?.surah.number,
                    audioData?.numberInSurah + 1,
                    true
                )
            }
        }
    }

    useEffect(() => {
        const playAudio = async () => {
            if (audioData && audioRef?.current?.readyState >= 3) {
                try {

                    await audioRef.current.play()
                    setIsPlaying(true)
                } catch (error) {
                    console.warn('Playback failed:', error)
                } 
            }
        }
        playAudio()
    }, [audioData, audioRef?.current?.readyState])

    return (
        <div className='w-full fixed bottom-14 left-0 z-10 px-4'>
            <div className='flex flex-col items-center py-4 bg-[#f2f2f2] rounded-xl'>
                <audio
                    ref={audioRef}
                    src={audioData?.audio}
                    onTimeUpdate={updateTime}
                    onLoadedMetadata={updateTime}
                    onEnded={handleAudioEnd}
                    className='hidden'
                />
                <div className='flex justify-between w-full px-6'>
                    <div className='flex flex-col gap-1 w-full'>
                        <div className='flex justify-between'>
                            <p className='text-base font-bold'>
                                {audioData?.surah?.englishName}
                                {!recitationsPage &&
                                    `: ${audioData?.numberInSurah}`}
                            </p>
                            <button onClick={handleClose}>
                                <IoClose size='1.4em' />
                            </button>
                        </div>
                        <p className='text-xs font-semibold'>
                            {recitationsPage
                                ? audioData?.reciter
                                : audioData?.edition?.englishName}
                        </p>
                    </div>
                </div>
                <div className='flex flex-col w-full px-6'>
                    <Slider
                        size='small'
                        min={1}
                        max={duration ? duration - 1 : 0}
                        value={currentTime}
                        onChange={handleSeek}
                    />
                    <div className='flex justify-between'>
                        <span className='text-xs'>
                            {formatTime(currentTime)}
                        </span>

                        <span className='text-xs'>
                            {formatTime(duration) === 'NaN:NaN'
                                ? '0:00'
                                : formatTime(duration)}
                        </span>
                    </div>
                </div>
                <div className='flex justify-center items-center gap-3'>
                    <button onClick={handlePrevious}>
                        <MdSkipPrevious size='1.5em' />
                    </button>
                    <button
                        className='pl-4 pr-3'
                        onClick={togglePlay}
                    >
                        {isPlaying ? (
                            <IoMdPause size='1.1em' />
                        ) : (
                            <FaPlay size='0.9em' />
                        )}
                    </button>
                    <button onClick={handleNext}>
                        <MdSkipNext size='1.5em' />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default MiniAudioPlayer
