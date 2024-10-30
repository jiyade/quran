import Slider from '@mui/material/Slider'
import ReaderSettingsItem from './ReaderSettingsItem'
import Select from './Select'
import Option from './Option'

const ReaderDisplaySettings = ({
    font,
    setFont,
    fontSize,
    setFontSize,
    brightness,
    setBrightness,
    autoScroll,
    setAutoScroll,
    autoScrollSpeed,
    setAutoScrollSpeed
}) => {
    const fonts = ['Amiri', 'Scheherazade', 'Vazirmatn']

    const handleFontChange = (font) => {
        localStorage.setItem('font', font)
        setFont(font)
    }

    const handleFontSizeChange = (fontsize) => {
        localStorage.setItem('font-size', fontsize)
        setFontSize(fontsize)
    }

    const handleFontWeightChange = (fontweight) => {
        localStorage.setItem('font-weight', fontweight)
        setFontWeight(fontweight)
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
                <p className='font-medium'>Font</p>
                <div className='flex items-center gap-3 px-2'>
                    {fonts.map((currentFont, i) => (
                        <ReaderSettingsItem
                            text={currentFont}
                            selected={
                                currentFont.replace(/ /g, '-').toLowerCase() ===
                                font
                            }
                            onClick={() => {
                                handleFontChange(
                                    currentFont.replace(/ /g, '-').toLowerCase()
                                )
                            }}
                            key={i}
                        />
                    ))}
                </div>
            </div>

            <div className='flex flex-col justify-between px-3 gap-3'>
                <p className='font-medium'>Font size</p>
                <div className='flex items-center gap-3 px-2'>
                    <ReaderSettingsItem
                        text='Small'
                        selected={fontSize === 'text-lg'}
                        onClick={() => handleFontSizeChange('text-lg')}
                    />
                    <ReaderSettingsItem
                        text='Medium'
                        selected={fontSize === 'text-xl'}
                        onClick={() => handleFontSizeChange('text-xl')}
                    />
                    <ReaderSettingsItem
                        text='Big'
                        selected={fontSize === 'text-2xl'}
                        onClick={() => handleFontSizeChange('text-2xl')}
                    />
                </div>
            </div>

            

            <div className='flex flex-col justify-between px-3 gap-3'>
                <p className='font-medium'>Auto scroll</p>
                <div className='flex items-center gap-3 px-2'>
                    <ReaderSettingsItem
                        text='Off'
                        selected={!autoScroll}
                        onClick={() => setAutoScroll(false)}
                    />
                    <ReaderSettingsItem
                        text='On'
                        selected={autoScroll}
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
