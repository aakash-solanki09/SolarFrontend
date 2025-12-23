import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../utils/api';
import { ArrowLeft, Trash2, Mail, Phone, Calendar, User } from 'lucide-react';

const AdminInquiryDetails = () => {
    const { id } = useParams();
    const [contact, setContact] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        fetchContact();
    }, [id]);

    const fetchContact = async () => {
        try {
            const res = await api.get(`/api/contact/${id}`);
            setContact(res.data);
        } catch (error) {
            console.error("Error fetching inquiry", error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async () => {
        if (window.confirm('Are you sure you want to delete this inquiry?')) {
            try {
                await api.delete(`/api/contact/${id}`);
                navigate('/admin/inquiries');
            } catch (error) {
                console.error("Error deleting inquiry", error);
            }
        }
    };

    if (loading) return <div className="p-12 text-center text-gray-500">Loading details...</div>;
    if (!contact) return <div className="p-12 text-center text-gray-500">Inquiry not found</div>;

    return (
        <div className="p-8 max-w-4xl mx-auto">
            <button
                onClick={() => navigate('/admin/inquiries')}
                className="flex items-center text-gray-600 hover:text-solar-600 mb-8 transition-colors"
            >
                <ArrowLeft className="h-5 w-5 mr-2" /> Back to Inquiries
            </button>

            <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100">
                <div className="p-6 sm:p-10">
                    <div className="flex justify-between items-start mb-8">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900 mb-2">Inquiry Details</h1>
                            <span className="text-sm text-gray-500 flex items-center">
                                <Calendar className="h-4 w-4 mr-1" />
                                {new Date(contact.createdAt).toLocaleString()}
                            </span>
                        </div>
                        <button
                            onClick={handleDelete}
                            className="bg-red-50 text-red-600 px-4 py-2 rounded-lg hover:bg-red-100 transition-colors flex items-center font-medium"
                        >
                            <Trash2 className="h-5 w-5 mr-2" />
                            Delete
                        </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                        <div className="bg-gray-50 rounded-lg p-6">
                            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">Contact Information</h3>
                            <div className="space-y-4">
                                <div className="flex items-start">
                                    <User className="h-5 w-5 text-gray-400 mt-0.5 mr-3" />
                                    <div>
                                        <p className="text-sm font-medium text-gray-900">{contact.name}</p>
                                        <p className="text-xs text-gray-500">Name</p>
                                    </div>
                                </div>
                                <div className="flex items-start">
                                    <Mail className="h-5 w-5 text-gray-400 mt-0.5 mr-3" />
                                    <div>
                                        <a href={`mailto:${contact.email}`} className="text-sm font-medium text-solar-600 hover:text-solar-700">{contact.email}</a>
                                        <p className="text-xs text-gray-500">Email</p>
                                    </div>
                                </div>
                                {contact.phone && (
                                    <div className="flex items-start">
                                        <Phone className="h-5 w-5 text-gray-400 mt-0.5 mr-3" />
                                        <div>
                                            <a href={`tel:${contact.phone}`} className="text-sm font-medium text-gray-900 hover:text-gray-700">{contact.phone}</a>
                                            <p className="text-xs text-gray-500">Phone</p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="bg-white rounded-lg p-6 border border-gray-100 shadow-sm">
                            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">Message Content</h3>
                            <div className="prose prose-sm max-w-none text-gray-800 whitespace-pre-wrap leading-relaxed">
                                {contact.message}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminInquiryDetails;
