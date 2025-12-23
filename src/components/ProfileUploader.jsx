import { useState, useRef } from 'react';
import { Camera, Upload } from 'lucide-react';

const ProfileUploader = ({ currentImage, onImageSelected }) => {
    const [preview, setPreview] = useState(currentImage);
    const fileInputRef = useRef(null);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result);
            };
            reader.readAsDataURL(file);
            onImageSelected(file);
        }
    };

    return (
        <div className="flex flex-col items-center">
            <div className="relative group cursor-pointer" onClick={() => fileInputRef.current.click()}>
                <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-lg bg-gray-100">
                    {preview ? (
                        <img src={preview} alt="Profile" className="w-full h-full object-cover" />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-400">
                            <Camera className="w-12 h-12" />
                        </div>
                    )}
                </div>
                <div className="absolute inset-0 bg-black bg-opacity-40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <Upload className="text-white w-8 h-8" />
                </div>
            </div>
            <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="image/*"
                className="hidden"
            />
            <p className="mt-2 text-sm text-gray-500">Click to upload new photo</p>
        </div>
    );
};

export default ProfileUploader;
