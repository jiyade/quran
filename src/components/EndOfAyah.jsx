import ayahEndImg from '/assets/endOfAyah.png'

const EndOfAyah = ({ number }) => {
    return (
        <span className='inline-flex justify-center items-center w-9 w-9 relative'>
            <span>
                <img
                    src={ayahEndImg}
                    alt='ayah end'
                    width='100%'
                    height='100%'
                    className='inline'
                />
            </span>
            <span className='absolute text-xs'>{number}</span>
        </span>
    )
}

export default EndOfAyah
