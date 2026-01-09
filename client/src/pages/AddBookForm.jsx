import { useState } from "react";
import { toast } from "react-hot-toast";
import { bookGenres as BOOK_GENRES } from "../utils/constants";
import { Upload, X, Image as ImageIcon, Loader2, ArrowLeft, ChevronDown } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { addnewbook } from "../store/features/bookSlice";
import axios from "../config/axiosconfig";

const AddBookForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    author: "",
    description: "",
    genre: [],
    availabilityType: [],
    condition: "good",
  });

  const [coverImage, setCoverImage] = useState(null);
  const [coverPreview, setCoverPreview] = useState(null);
  const [galleryImages, setGalleryImages] = useState([]);
  const [galleryPreviews, setGalleryPreviews] = useState([]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleGenreToggle = (selectedGenre) => {
    setFormData((prev) => {
      const currentGenres = prev.genre;
      if (currentGenres.includes(selectedGenre)) {
        return { ...prev, genre: currentGenres.filter((g) => g !== selectedGenre) };
      } else {
        return { ...prev, genre: [...currentGenres, selectedGenre] };
      }
    });
  };

  const handlePurposeToggle = (type) => {
    setFormData((prev) => {
      const currentTypes = prev.availabilityType;
      if (currentTypes.includes(type)) {
        return { ...prev, availabilityType: currentTypes.filter((t) => t !== type) };
      } else {
        return { ...prev, availabilityType: [...currentTypes, type] };
      }
    });
  };

  const handleCoverChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCoverImage(file);
      setCoverPreview(URL.createObjectURL(file));
    }
  };

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

  const removeGalleryImage = (index) => {
    setGalleryImages((prev) => prev.filter((_, i) => i !== index));
    setGalleryPreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!coverImage) return toast.error("Cover image is required!");
    if (!formData.title || !formData.author) return toast.error("Title and Author are required!");

    if (formData.availabilityType.length === 0) {
      return toast.error("Please select at least one purpose.");
    }
    if (formData.genre.length === 0) {
      return toast.error("Please select at least one genre.");
    }

    setLoading(true);

    const form = new FormData();
    form.append("title", formData.title);
    form.append("author", formData.author);
    form.append("description", formData.description);

    form.append("condition", formData.condition);

    form.append("availabilityType", JSON.stringify(formData.availabilityType));
    form.append("genre", JSON.stringify(formData.genre));

    form.append("coverImage", coverImage);

    galleryImages.forEach((img) => {
      form.append("galleryImages", img);
    });
    console.log(form)
    try {
      const { data } = await axios.post(`/books/add`, form);

      if (data.statusCode === 400) {
        toast.error(data.error?.data?.message ?? 'Something went wrong!');
      } else {
        toast.success(data.message ? data.message : "Book added successfully!");
        setCoverImage(null);
        setCoverPreview(null);
        setGalleryImages([]);
        setGalleryPreviews([]);
        setFormData({
          title: "",
          author: "",
          description: "",
          genre: [],
          availabilityType: [],
          condition: "good",
        });
        dispatch(addnewbook(data.book));
      }

    } catch (error) {
      console.error(error);
      const errMessage = error.response?.data?.message || "";

      if (errMessage.includes("location") || errMessage.includes("profile")) {
        toast.error("Incomplete Profile: Please add your Address in settings first.", { duration: 4000 });
      } else {
        toast.error(errMessage || "Failed to add book");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-2xl shadow-sm border border-gray-100 my-10">

      {/* HEADER WITH BACK BUTTON */}
      <div className="flex items-center gap-4 mb-6">
        <button
          onClick={() => navigate(-1)}
          className="p-2 rounded-full hover:bg-gray-100 text-gray-600 transition-colors"
          title="Go Back"
        >
          <ArrowLeft size={24} />
        </button>
        <h2 className="text-2xl font-bold text-gray-900">List a Book</h2>
      </div>

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

          {/* Additional Images */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Additional Images (Max 5). <span className="text-red-500 tracking-tighter text-xs"><br />Make sure you're adding real images of your book here.*</span>
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
        <div className="space-y-5 ">

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

          {/* Genre Selection (Multi-Select Tags) */}
          <div>
            <label className="block text-xs font-bold uppercase text-gray-500 mb-2">Genre (Select Multiple)</label>
            <div className="flex flex-wrap gap-2">
              {BOOK_GENRES.map((genreItem) => {
                const isSelected = formData.genre.includes(genreItem);
                return (
                  <button
                    key={genreItem}
                    type="button" // Prevents form submission
                    onClick={() => handleGenreToggle(genreItem)}
                    className={`
                      px-3 py-1.5 rounded-full text-xs font-medium border transition-all
                      ${isSelected
                        ? "bg-orange-500 border-orange-500 text-white shadow-sm"
                        : "bg-white border-gray-200 text-gray-600 hover:border-orange-300 hover:bg-orange-50"}
                    `}
                  >
                    {genreItem}
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Condition</label>
            <div className="relative">
              <select
                name="condition"
                value={formData.condition}
                onChange={handleInputChange}
                className="w-full appearance-none rounded-lg border border-gray-200 px-4 py-2.5 text-sm focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none bg-white cursor-pointer transition-all"
              >
                <option value="new">New (Unused)</option>
                <option value="good">Good (Lightly Used)</option>
                <option value="fair">Fair (Readable)</option>
                <option value="poor">Poor (Heavily Worn)</option>
              </select>
              {/* Custom Chevron Icon for better styling */}
              <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none text-gray-500">
                <ChevronDown size={16} />
              </div>
            </div>
          </div>

          {/* Availability Type (Multi-Select) */}
          <div>
            <label className="block text-xs font-bold uppercase text-gray-500 mb-2">Purpose (Select all that apply)</label>
            <div className="grid grid-cols-3 gap-3">
              {['swap', 'borrow', 'donate'].map((type) => {
                const isSelected = formData.availabilityType.includes(type);
                return (
                  <div
                    key={type}
                    onClick={() => handlePurposeToggle(type)}
                    className={`
                      cursor-pointer text-center py-2.5 rounded-lg border text-sm font-medium capitalize transition-all select-none
                      ${isSelected
                        ? "bg-orange-500 border-orange-500 text-white shadow-md"
                        : "bg-white border-gray-200 text-gray-600 hover:border-orange-300 hover:bg-orange-50"}
                    `}
                  >
                    {type}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Description</label>
            <textarea
              name="description"
              rows={5}
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