import Loader from '../Loader/Loader'

const LoadingPage = ({ message }: { message: string }) => {
    return (
        <div className='flex-1 bg-white rounded-md shadow-md total-center'>
            <div className='w-8'>
                <Loader message={message} />
            </div>
        </div>
    )
}

export default LoadingPage