import { LineWave } from 'react-loader-spinner'

const FullScreenLoader = ({ isTransparent }) => {
    return (
        <div
            className={`flex justify-center items-center fixed top-0 w-full min-h-[100dvh] z-50 pl-10 ${
                isTransparent ? 'bg-transparent' : 'bg-main'
            }`}
        >
            <LineWave
                width='130'
                height='130'
            />
        </div>
    )
}

export default FullScreenLoader
