import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../utils/api";

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = !!id;

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    capacity: "",
    description: "",
    details: "", // JSON string or separate fields? Let's keep it simple or text area for now
  });
    const [imageFiles, setImageFiles] = useState([]);
    const [existingImages, setExistingImages] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isEditMode) {
      fetchProduct();
    }
  }, [id]);

  const fetchProduct = async () => {
    try {
      const res = await api.get(`/api/products/${id}`);
      const { name, price, capacity, description, details } = res.data;
      setFormData({
        name,
        price,
        capacity,
        description,
                details: JSON.stringify(details, null, 2)
            });
            
            // Handle multiple images from backend
            if (res.data.images && Array.isArray(res.data.images)) {
                 setExistingImages(res.data.images);
            } else if (res.data.image) {
                 // Fallback for single image legacy data
                 setExistingImages([res.data.image]);
            }
    } catch (error) {
      console.error("Error fetching product", error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

    const handleFileChange = (e) => {
        if (e.target.files) {
            // Convert FileList to Array and combine with compatible existing selection logic if needed
            // For now, let's just append or replace. Let's append.
            setImageFiles(prev => [...prev, ...Array.from(e.target.files)]);
        }
    };
    
    const removeImage = (indexToRemove) => {
        setImageFiles(prev => prev.filter((_, index) => index !== indexToRemove));
    };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const form = new FormData();
      form.append("name", formData.name);
      form.append("price", formData.price);
      form.append("capacity", formData.capacity);
      form.append("description", formData.description);
      try {
        // Validate JSON
        JSON.parse(formData.details);
        form.append("details", formData.details);
      } catch (e) {
        // If empty or invalid, maybe send empty object or ignore
        form.append("details", "{}");
      }

            imageFiles.forEach(file => {
                form.append('images', file);
            });

      if (isEditMode) {
        await api.put(`/api/products/${id}`, form, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      } else {
        await api.post("/api/products", form, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }

      navigate("/admin/products");
    } catch (error) {
      console.error("Error saving product", error);
      alert("Failed to save product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-8">
          {isEditMode ? "Edit Product" : "Add New Product"}
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Product Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-solar-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Price ($)
              </label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-solar-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Capacity
              </label>
              <input
                type="text"
                name="capacity"
                value={formData.capacity}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-solar-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              rows="4"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-solar-500"
            ></textarea>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Technical Details (JSON)
            </label>
            <textarea
              name="details"
              value={formData.details}
              onChange={handleChange}
              rows="4"
              placeholder='{"warranty": "25 years", "weight": "20kg"}'
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-solar-500 font-mono text-sm"
            ></textarea>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Product Images
            </label>
            <input
              type="file"
              onChange={handleFileChange}
              accept="image/*"
              multiple
              className="w-full mb-2"
            />
            <p className="text-xs text-gray-500 mb-2">
              Select multiple files to upload.
            </p>

            {/* Image Previews */}
            <div className="flex flex-wrap gap-4 mt-2">
              {/* Existing Images */}
              {existingImages.map((img, index) => (
                <div
                  key={`existing-${index}`}
                  className="relative h-24 w-24 border rounded overflow-hidden group"
                >
                  <img
                    src={img}
                    alt={`Product ${index}`}
                    className="h-full w-full object-cover"
                  />
                  {/* Optional: Add delete button here if backend supports it */}
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-opacity" />
                </div>
              ))}

              {/* New Candidates */}
              {imageFiles.map((file, index) => (
                <div
                  key={`new-${index}`}
                  className="relative h-24 w-24 border rounded overflow-hidden group"
                >
                  <img
                    src={URL.createObjectURL(file)}
                    alt={`Preview ${index}`}
                    className="h-full w-full object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1 m-1 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    &times;
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-end space-x-4 pt-4 text-black">
            <button
              type="button"
              onClick={() => navigate("/admin/products")}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-solar-600 text-black rounded-lg hover:bg-solar-700 transition-colors disabled:opacity-50"
            >
              {loading ? "Saving..." : "Save Product"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProduct;
