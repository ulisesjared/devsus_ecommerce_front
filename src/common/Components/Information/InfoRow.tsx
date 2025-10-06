export const InfoRow: React.FC<{ label: string, value: string, className?: string }> = ({ label, value, className }) => (
    <div className={`grid grid-cols-[30%,auto] items-center gap-2  ${className}`}>
        <div className="text-sm">{label}:</div>
        <div className="font-semibold">{value}</div>
    </div>
);