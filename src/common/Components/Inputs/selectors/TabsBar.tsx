interface Tab {
    value: string,
    label: string,
    onClick: () => void,
    isSelected: boolean,
}

const TabsBar = ({ tabs }: { tabs: Tab[] }) => {
    return (
        <div className='flex gap-2 bg-white p-1 rounded-t-md'>
            {tabs.map((t) => (
                <button
                    key={t.value}
                    onClick={t.onClick}
                    className={`btn btn-rounded w-full sm:w-auto sm:px-4 h-8 ${t.isSelected ? 'btn-selected' : 'btn-ghost'}`}
                >
                    {t.label}
                </button>
            ))}
        </div>
    )
}

export default TabsBar