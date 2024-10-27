import Slider from '@mui/material/Slider'
import ReaderSettingsItem from './ReaderSettingsItem'

const ReaderDisplaySettings = ({
    fontSize,
    setFontSize,
    brightness,
    setBrightness,
    autoScroll,
    setAutoScroll,
    autoScrollSpeed,
    setAutoScrollSpeed
}) => {
    const handleFontChange = (font) => {
        setFontSize(font)
    }

    const handleAutoScrollSpeedChange = (e, val) => {
        
        setAutoScrollSpeed(val)
    }

    const handleBrightnessChange = (e, val) => {
        setBrightness(Number(val))
    }

    return (
        <div className='flex flex-col gap-8 pt-3 text-sm'>
            <div className='flex flex-col justify-between px-3 gap-3'>
                <p className='font-medium'>Font size</p>
                <div className='flex items-center gap-3 px-2'>
                    <ReaderSettingsItem
                        text='Small'
                        className={
                            fontSize === 'text-lg'
                                ? 'bg-blue-300 bg-opacity-40 border-0'
                                : 'bg-transparent'
                        }
                        onClick={() => handleFontChange('text-lg')}
                    />
                    <ReaderSettingsItem
                        text='Medium'
                        className={
                            fontSize === 'text-xl'
                                ? 'bg-blue-300 bg-opacity-40 border-0'
                                : 'bg-transparent'
                        }
                        onClick={() => handleFontChange('text-xl')}
                    />
                    <ReaderSettingsItem
                        text='Big'
                        className={
                            fontSize === 'text-2xl'
                                ? 'bg-blue-300 bg-opacity-40 border-0'
                                : 'bg-transparent'
                        }
                        onClick={() => handleFontChange('text-2xl')}
                    />
                </div>
            </div>

            <div className='flex flex-col justify-between px-3 gap-3'>
                <p className='font-medium'>Auto scroll</p>
                <div className='flex items-center gap-3 px-2'>
                    <ReaderSettingsItem
                        text='Off'
                        className={
                            autoScroll === false
                                ? 'bg-blue-300 bg-opacity-40 border-0'
                                : 'bg-transparent'
                        }
                        onClick={() => setAutoScroll(false)}
                    />
                    <ReaderSettingsItem
                        text='On'
                        className={
                            autoScroll === true
                                ? 'bg-blue-300 bg-opacity-40 border-0'
                                : 'bg-transparent'
                        }
                        onClick={() => setAutoScroll(true)}
                    />
                </div>
            </div>

            <div className='flex flex-col justify-between px-3 gap-1'>
                <p className='font-medium'>Auto scroll speed</p>
                <div className='flex items-center px-2'>
                    <Slider
                        size='small'
                        min={1}
                        max={100}
                        value={autoScrollSpeed}
                        onChange={handleAutoScrollSpeedChange}
                        disabled={!autoScroll}
                    />
                </div>
            </div>

            <div className='flex flex-col justify-between px-3 gap-1'>
                <p className='font-medium'>Brightness</p>
                <div className='flex items-center px-2'>
                    <Slider
                        size='small'
                        valueLabelDisplay='auto'
                        min={1}
                        max={100}
                        value={brightness}
                        onChange={handleBrightnessChange}
                    />
                </div>
            </div>
        </div>
    )
}

export default ReaderDisplaySettings
