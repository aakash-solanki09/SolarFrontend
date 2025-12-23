import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../utils/api';
import { Eye, Trash2 } from 'lucide-react';
import Pagination from '../../components/Pagination';
import SearchBar from '../../components/SearchBar';

const AdminInquiries = () => {
    const [contacts, setContacts] = useState([]);
    const [page, setPage] = useState(1);
    const [pages, setPages] = useState(1);
    const [total, setTotal] = useState(0);
    const [keyword, setKeyword] = useState('');
    const [limit, setLimit] = useState(10);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            fetchContacts();
        }, 300);

        return () => clearTimeout(delayDebounceFn);
    }, [page, keyword, limit]);

    const fetchContacts = async () => {
        setLoading(true);
        try {
            const res = await api.get(`/api/contact?page=${page}&limit=${limit}&search=${keyword}`);
            setContacts(res.data.contacts);
            setPages(res.data.pages);
            setTotal(res.data.total);
        } catch (error) {
            console.error("Error fetching inquiries", error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this inquiry?')) {
            try {
                await api.delete(`/api/contact/${id}`);
                fetchContacts();
            } catch (error) {
                console.error("Error deleting inquiry", error);
            }
        }
    };

    return (
        <div className="p-6">
            <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
                <h1 className="text-3xl font-bold text-gray-900">Contact Inquiries</h1>
                <div className="w-full md:w-auto">
                    <SearchBar keyword={keyword} setKeyword={setKeyword} placeholder="Search name, email..." />
                </div>
            </div>

            <div className="bg-white rounded-lg shadow overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name/Email</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Message Preview</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {loading ? (
                            <tr><td colSpan="4" className="px-6 py-4 text-center">Loading...</td></tr>
                        ) : contacts.length === 0 ? (
                            <tr><td colSpan="4" className="px-6 py-4 text-center">No inquiries found.</td></tr>
                        ) : (
                            contacts.map((contact) => (
                                <tr key={contact._id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm font-medium text-gray-900">{contact.name}</div>
                                        <div className="text-sm text-gray-500">{contact.email}</div>
                                        {contact.phone && <div className="text-xs text-gray-400">{contact.phone}</div>}
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="text-sm text-gray-900 max-w-xs truncate">{contact.message}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {new Date(contact.createdAt).toLocaleDateString()}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <div className="flex items-center justify-end gap-3">
                                            <Link to={`/admin/inquiries/${contact._id}`} className="text-solar-600 hover:text-solar-900">
                                                <Eye className="h-5 w-5" />
                                            </Link>
                                            <button onClick={() => handleDelete(contact._id)} className="text-red-600 hover:text-red-900">
                                                <Trash2 className="h-5 w-5" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            <Pagination page={page} setPage={setPage} pages={pages} total={total} limit={limit} setLimit={setLimit} />
        </div>
    );
};

export default AdminInquiries;
