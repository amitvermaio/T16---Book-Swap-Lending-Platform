import { useState } from "react";
import { Upload, X, Image as ImageIcon, Loader2, MapPin } from "lucide-react";
import { toast } from "react-hot-toast";
// import axios from "axios"; // Uncomment when ready to connect

const AddBookForm = () => {
  const [loading, setLoading] = useState(false);
  
  // Form State
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    description: "",
    genre: "", // We will split this by comma on submit
    city: "",
    state: "",
    availabilityType: "swap", // Default value matching schema enum
  });

  // Image State
  const [coverImage, setCoverImage] = useState(null);
  const [coverPreview, setCoverPreview] = useState(null);
  const [galleryImages, setGalleryImages] = useState([]); // Max 5
  const [galleryPreviews, setGalleryPreviews] = useState([]);

  // Handle Text Inputs
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle Cover Image
  const handleCoverChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCoverImage(file);
      setCoverPreview(URL.createObjectURL(file));
    }
  };

  // Handle Gallery Images (Max 5)
  const handleGalleryChange = (e) => {
    const files = Array.from(e.target.files);
    
    if (galleryImages.length + files.length > 5) {
      toast.error("You can only upload a maximum of 5 additional images.");
      return;
    }

    const newPreviews = files.map((file) => URL.createObjectURL(file));
    setGalleryImages((prev) => [...prev, ...files]);
    setGalleryPreviews((prev) => [...prev, ...newPreviews]);
  };

  // Remove a gallery image
  const removeGalleryImage = (index) => {
    setGalleryImages((prev) => prev.filter((_, i) => i !== index));
    setGalleryPreviews((prev) => prev.filter((_, i) => i !== index));
  };

  // Submit Handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!coverImage) return toast.error("Cover image is required!");
    if (!formData.title || !formData.author) return toast.error("Title and Author are required!");

    setLoading(true);

    const data = new FormData();
    data.append("title", formData.title);
    data.append("author", formData.author);
    data.append("description", formData.description);
    data.append("availabilityType", formData.availabilityType);
    
    // Convert comma-separated string to array for Genre
    const genreArray = formData.genre.split(",").map((g) => g.trim()).filter((g) => g !== "");
    data.append("genre", JSON.stringify(genreArray)); 

    // Location
    data.append("city", formData.city);
    data.append("state", formData.state);

    // Images
    data.append("coverImage", coverImage);
    galleryImages.forEach((img) => {
      data.append("galleryImages", img);
    });

    try {
      // await axios.post('/api/books/add', data, { headers: { 'Content-Type': 'multipart/form-data' } });
      console.log("Form Data Prepared:", Object.fromEntries(data));
      toast.success("Book added successfully!");
      // Reset form logic here...
    } catch (error) {
      console.error(error);
      toast.error("Failed to add book");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-2xl shadow-sm border border-gray-100 my-10">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">List a Book</h2>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* LEFT COLUMN: IMAGES */}
        <div className="space-y-6">
          
          {/* Cover Image Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Book Cover <span className="text-red-500">*</span>
            </label>
            <div className="relative group w-full h-64 bg-gray-50 border-2 border-dashed border-gray-300 rounded-xl flex flex-col items-center justify-center overflow-hidden transition-colors hover:bg-orange-50 hover:border-orange-300">
              {coverPreview ? (
                <>
                  <img src={coverPreview} alt="Preview" className="w-full h-full object-contain p-2" />
                  <button 
                    type="button"
                    onClick={() => { setCoverImage(null); setCoverPreview(null); }}
                    className="absolute top-2 right-2 bg-white p-1.5 rounded-full shadow-md hover:bg-red-50 text-red-500 transition-colors"
                  >
                    <X size={16} />
                  </button>
                </>
              ) : (
                <>
                  <Upload className="w-8 h-8 text-gray-400 mb-2 group-hover:text-orange-500 transition-colors" />
                  <p className="text-sm text-gray-500">Click to upload cover</p>
                </>
              )}
              <input 
                type="file" 
                accept="image/*"
                onChange={handleCoverChange} 
                className={`absolute inset-0 w-full h-full opacity-0 cursor-pointer ${coverPreview ? "pointer-events-none" : ""}`}
              />
            </div>
          </div>

          {/* Additional Images (Max 5) */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Additional Images (Max 5). <span className="text-red-500 tracking-tighter text-xs">Make sure you're adding real image of your book here.</span>
            </label>
            <div className="grid grid-cols-3 gap-3">
              {galleryPreviews.map((src, index) => (
                <div key={index} className="relative aspect-square rounded-lg overflow-hidden border border-gray-200 group">
                  <img src={src} alt={`Gallery ${index}`} className="w-full h-full object-cover" />
                  <button 
                    type="button"
                    onClick={() => removeGalleryImage(index)}
                    className="absolute top-1 right-1 bg-black/50 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X size={12} />
                  </button>
                </div>
              ))}
              
              {galleryImages.length < 5 && (
                <div className="relative aspect-square bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center hover:bg-orange-50 hover:border-orange-300 transition-colors">
                  <ImageIcon className="w-5 h-5 text-gray-400" />
                  <input 
                    type="file" 
                    accept="image/*"
                    multiple
                    onChange={handleGalleryChange} 
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: DETAILS */}
        <div className="space-y-5">
          
          {/* Title & Author */}
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Book Title</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="e.g. The Alchemist"
                className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none transition-all"
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Author</label>
              <input
                type="text"
                name="author"
                value={formData.author}
                onChange={handleInputChange}
                placeholder="e.g. Paulo Coelho"
                className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none transition-all"
              />
            </div>
          </div>

          {/* Genre */}
          <div>
            <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Genre (Comma separated)</label>
            <input
              type="text"
              name="genre"
              value={formData.genre}
              onChange={handleInputChange}
              placeholder="Fiction, Philosophy, Adventure"
              className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none transition-all"
            />
          </div>

          {/* Availability Type (Custom Radio Tiles) */}
          <div>
            <label className="block text-xs font-bold uppercase text-gray-500 mb-2">Purpose</label>
            <div className="grid grid-cols-3 gap-3">
              {['swap', 'lend', 'donate'].map((type) => (
                <label 
                  key={type}
                  className={`
                    cursor-pointer text-center py-2.5 rounded-lg border text-sm font-medium capitalize transition-all
                    ${formData.availabilityType === type 
                      ? "bg-orange-500 border-orange-500 text-white shadow-md" 
                      : "bg-white border-gray-200 text-gray-600 hover:border-orange-300 hover:bg-orange-50"}
                  `}
                >
                  <input
                    type="radio"
                    name="availabilityType"
                    value={type}
                    checked={formData.availabilityType === type}
                    onChange={handleInputChange}
                    className="hidden"
                  />
                  {type}
                </label>
              ))}
            </div>
          </div>

          {/* Location */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase text-gray-500 mb-1">City</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  className="w-full rounded-lg border border-gray-200 pl-9 pr-4 py-2.5 text-sm focus:border-orange-500 outline-none"
                  placeholder="City"
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-bold uppercase text-gray-500 mb-1">State</label>
              <input
                type="text"
                name="state"
                value={formData.state}
                onChange={handleInputChange}
                className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm focus:border-orange-500 outline-none"
                placeholder="State"
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Description</label>
            <textarea
              name="description"
              rows={4}
              value={formData.description}
              onChange={handleInputChange}
              className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none resize-none transition-all"
              placeholder="Tell us about the condition of the book..."
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-black hover:bg-gray-800 text-white font-medium py-3 rounded-xl transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center gap-2"
          >
            {loading ? <Loader2 className="animate-spin h-5 w-5" /> : "Post Book"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddBookForm;