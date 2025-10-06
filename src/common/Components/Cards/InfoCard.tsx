
interface InfoCardProps {
    title: string,
    subtitle: string,
    className?: string
}

const InfoCard = ({ title, subtitle, className }: InfoCardProps) => {
    return (
        <div className={`flex flex-col ${className}`}>
            <h1 className='text-lg font-semibold'>{title}</h1>
            <p className='line-clamp-1 text-sm text-gray-700'>{subtitle}</p>
        </div>
    )
}

export default InfoCard 