import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../utils/api';
import AddressForm from '../components/AddressForm';
import ProfileUploader from '../components/ProfileUploader';

const EditProfile = () => {
    const { user, loadUser } = useAuth();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        street: '',
        city: '',
        state: '',
        country: '',
        postalCode: '',
        landmark: ''
    });
    const [imageFile, setImageFile] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (user) {
            setFormData({
                name: user.name || '',
                email: user.email || '',
                phone: user.phone || '',
                street: user.address?.street || '',
                city: user.address?.city || '',
                state: user.address?.state || '',
                country: user.address?.country || '',
                postalCode: user.address?.postalCode || '',
                landmark: user.address?.landmark || ''
            });
        }
    }, [user]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleAddressChange = (addressData) => {
        setFormData({ ...formData, ...addressData });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const form = new FormData();
            Object.keys(formData).forEach(key => {
                form.append(key, formData[key]);
            });
            if (imageFile) {
                form.append('image', imageFile);
            }

            await api.put('/api/users/profile', form);

            await loadUser();
            navigate('/dashboard');
        } catch (error) {
            console.error("Error updating profile", error);
            alert("Failed to update profile");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen py-12">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-card rounded-xl shadow-lg p-8 border border-card-border">
                    <h1 className="text-2xl font-bold text-card-foreground mb-8 text-center">Edit Profile</h1>

                    <form onSubmit={handleSubmit} className="space-y-8">
                        <ProfileUploader
                            currentImage={user?.image}
                            onImageSelected={setImageFile}
                        />

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-card-foreground/80 mb-1">Full Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 bg-body border border-card-border rounded-md text-body-foreground focus:outline-none focus:ring-1 focus:ring-solar-500 placeholder-card-foreground/40"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-card-foreground/80 mb-1">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 bg-body border border-card-border rounded-md text-body-foreground focus:outline-none focus:ring-1 focus:ring-solar-500 placeholder-card-foreground/40"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-card-foreground/80 mb-1">Phone</label>
                                <input
                                    type="tel"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 bg-body border border-card-border rounded-md text-body-foreground focus:outline-none focus:ring-1 focus:ring-solar-500 placeholder-card-foreground/40"
                                />
                            </div>
                        </div>

                        <div className="border-t border-card-border pt-6">
                            <h3 className="text-lg font-medium text-card-foreground mb-4">Address Details</h3>
                            <AddressForm formData={formData} onChange={handleAddressChange} darkMode={false} />
                        </div>

                        <div className="flex gap-4">
                            <button
                                type="button"
                                onClick={() => navigate('/dashboard')}
                                className="flex-1 px-4 py-2 border border-card-border text-card-foreground/80 rounded-lg hover:bg-body transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={loading}
                                className="flex-1 px-4 py-2 bg-solar-600 text-white rounded-lg hover:bg-solar-700 transition-colors disabled:opacity-50 font-bold"
                            >
                                {loading ? 'Saving...' : 'Save Changes'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default EditProfile;
