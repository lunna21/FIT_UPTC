
const ColorChooser = ({ colors, setColor, color, label }) => {
    return (
        <div className="w-full p-1 box-border">
            <label className="block text-black font-medium text-sm py-2">{label}</label>
            <div className="flex justify-center items-center space-x-6 p-2 bg-gray-100 rounded-lg">
            <button
                type="button"
                className={`w-6 h-6 rounded-full border border-gray-300 ${color === '' ? 'border-black' : ''} bg-neutral-gray-medium`}
                onClick={() => setColor('default')}
            />
            <div className="w-px h-6 bg-gray-300"></div>
            <div className="flex justify-center items-center space-x-2">
                {colors.map((c, i) => (
                <button
                    type="button"
                    key={i}
                    className={`w-6 h-6 rounded-full border ${color === c.name ? 'border-black' : ''} ${c.code}`}
                    onClick={() => setColor(c.name)}
                />
                ))}
            </div>
            </div>
        </div>
        );
}

export default ColorChooser;