const AddressForm = ({ formData, onChange, darkMode = false }) => {
    const handleChange = (e) => {
        const { name, value } = e.target;
        onChange({ ...formData, [name]: value });
    };

    const labelClass = `block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`;
    const inputClass = `w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-solar-500 ${darkMode
            ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
            : 'bg-white border-gray-300 text-gray-900'
        }`;

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
                <label className={labelClass}>Street Address</label>
                <input
                    type="text"
                    name="street"
                    value={formData.street || ''}
                    onChange={handleChange}
                    className={inputClass}
                    required
                />
            </div>

            <div>
                <label className={labelClass}>City</label>
                <input
                    type="text"
                    name="city"
                    value={formData.city || ''}
                    onChange={handleChange}
                    className={inputClass}
                    required
                />
            </div>

            <div>
                <label className={labelClass}>State/Province</label>
                <input
                    type="text"
                    name="state"
                    value={formData.state || ''}
                    onChange={handleChange}
                    className={inputClass}
                    required
                />
            </div>

            <div>
                <label className={labelClass}>Country</label>
                <input
                    type="text"
                    name="country"
                    value={formData.country || ''}
                    onChange={handleChange}
                    className={inputClass}
                    required
                />
            </div>

            <div>
                <label className={labelClass}>Postal Code</label>
                <input
                    type="text"
                    name="postalCode"
                    value={formData.postalCode || ''}
                    onChange={handleChange}
                    className={inputClass}
                    required
                />
            </div>

            <div className="md:col-span-2">
                <label className={labelClass}>Landmark (Optional)</label>
                <input
                    type="text"
                    name="landmark"
                    value={formData.landmark || ''}
                    onChange={handleChange}
                    className={inputClass}
                />
            </div>
        </div>
    );
};

export default AddressForm;
