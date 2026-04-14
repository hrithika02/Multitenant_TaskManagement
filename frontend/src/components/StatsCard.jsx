function StatsCard({ title, count, color }) {
    return (
        <div className="bg-white p-4 md:p-5 rounded-xl shadow flex items-center gap-4">
            <div className={`w-10 h-10 md:w-12 md:h-12 rounded-lg ${color}`}></div>

            <div>
                <h2 className="text-xl md:text-2xl font-bold">{count}</h2>
                <p className="text-gray-500 text-sm md:text-base">{title}</p>
            </div>
        </div>
    );
}

export default StatsCard;