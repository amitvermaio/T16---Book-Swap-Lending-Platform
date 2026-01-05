import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import {
  User, MapPin, Mail, Save, Loader2, Camera,
  Globe, Shield, ChevronDown, ArrowLeft, UploadCloud
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { asyncupdateprofile, asyncupdateavatar } from "../store/actions/usersAction";

const Settings = () => {
  const navigate = useNavigate();
  const [avatarFile, setAvatarFile] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [avatarLoading, setAvatarLoading] = useState(false);

  const { user } = useSelector((state) => state.users);

  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors, isSubmitting }
  } = useForm({
    defaultValues: {
      name: user?.name || "",
      email: user?.email || "",
      address: user?.address || "",
      city: user?.city || "",
      state: user?.state || "",
      country: user?.country || "",
      pincode: user?.pincode || "",
      lendingPreferences: {
        visibility: user?.lendingPreferences?.visibility || "all",
        onlyLocal: user?.lendingPreferences?.onlyLocal ?? true
      }
    }
  });

  const watchLocalOnly = watch("lendingPreferences.onlyLocal");

  useEffect(() => {
    if (user) {
      reset({
        name: user.name || "",
        email: user.email || "",
        address: user.address || "",
        city: user.city || "",
        state: user.state || "",
        country: user.country || "",
        pincode: user.pincode || "",
        lendingPreferences: {
          visibility: user.lendingPreferences?.visibility || "all",
          onlyLocal: user.lendingPreferences?.onlyLocal ?? true
        }
      });
      if (user.avatar) setAvatarPreview(user.avatar);
    }
  }, [user, reset]);

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatarFile(file);
      setAvatarPreview(URL.createObjectURL(file));
    }
  };

  const handleAvatarSubmit = async () => {
    if (!avatarFile) return;
    console.log("Submitting avatar:", avatarFile);
    setAvatarLoading(true);
    const formData = new FormData();
    formData.append("avatar", avatarFile);

    try {
      await dispatch(asyncupdateavatar(formData));
      setAvatarFile(null);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update photo");
    } finally {
      setAvatarLoading(false);
    }
  };

  const onSubmitProfile = async (dataPayload) => {
    try {
      await dispatch(asyncupdateprofile(dataPayload));
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Failed to update profile");
    }
  };

  return (
    <div className="w-full max-w-[98%] mx-auto p-4 md:p-6 bg-white rounded-xl shadow-sm border border-gray-100 my-4">

      <div className="flex items-center gap-4 mb-6 pb-4 border-b border-gray-100">
        <button
          onClick={() => navigate(-1)}
          className="p-2 rounded-full hover:bg-gray-100 text-gray-600 transition-colors"
        >
          <ArrowLeft size={20} />
        </button>
        <div>
          <h2 className="text-xl font-bold text-gray-900">Account Settings</h2>
          <p className="text-xs text-gray-500">Manage your profile and preferences</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8">

        <div className="md:col-span-3 flex flex-col gap-4">
          <div className="bg-gray-50 rounded-xl p-5 border border-gray-100 flex flex-col items-center text-center sticky top-5">
            <h3 className="text-gray-900 font-bold mb-3 w-full text-left text-sm">Profile Picture</h3>

            <div className="relative group mb-4">
              <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-md bg-gray-200">
                {avatarPreview ? (
                  <img src={avatarPreview} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400">
                    <User size={48} />
                  </div>
                )}
              </div>

              <label className="absolute bottom-1 right-1 bg-gray-900 text-white p-2 rounded-full shadow-lg cursor-pointer hover:bg-black transition-all hover:scale-105 active:scale-95 border-2 border-white">
                <Camera size={16} />
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleAvatarChange}
                />
              </label>
            </div>

            <button
              onClick={handleAvatarSubmit}
              disabled={!avatarFile || avatarLoading}
              className={`
                    w-full py-2 rounded-lg text-xs font-semibold flex items-center justify-center gap-2 transition-all
                    ${!avatarFile
                  ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                  : "bg-orange-500 hover:bg-orange-600 text-white shadow-md"}
                `}
            >
              {avatarLoading ? (
                <Loader2 className="animate-spin h-3 w-3" />
              ) : (
                <>
                  <UploadCloud size={14} /> Update Photo
                </>
              )}
            </button>
          </div>
        </div>

        <div className="md:col-span-9">
          <form onSubmit={handleSubmit(onSubmitProfile)} className="space-y-6">
            <div>
              <h3 className="text-sm font-bold text-gray-900 flex items-center gap-2 border-b border-gray-100 pb-2 mb-3">
                <User size={16} className="text-orange-500" />
                Personal Information
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-bold uppercase text-gray-500 mb-1">Display Name</label>
                  <input
                    {...register("name", { required: "Name is required" })}
                    className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-orange-500 outline-none transition-all focus:ring-1 focus:ring-orange-500"
                  />
                  {errors.name && <span className="text-xs text-red-500">{errors.name.message}</span>}
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase text-gray-500 mb-1">Email Address</label>
                  <div className="relative">
                    <Mail size={14} className="absolute left-3 top-2.5 text-gray-400" />
                    <input
                      {...register("email")}
                      disabled
                      className="w-full rounded-lg border border-gray-200 pl-9 pr-3 py-2 text-sm bg-gray-50 text-gray-400 cursor-not-allowed"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-bold text-gray-900 flex items-center gap-2 border-b border-gray-100 pb-2 mb-3">
                <MapPin size={16} className="text-orange-500" />
                Address Details
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="md:col-span-4">
                  <label className="block text-[11px] font-bold uppercase text-gray-500 mb-1">Street Address</label>
                  <input
                    {...register("address", { required: "Address is required" })}
                    className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-orange-500 outline-none transition-all focus:ring-1 focus:ring-orange-500"
                  />
                  {errors.address && <span className="text-xs text-red-500">{errors.address.message}</span>}
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase text-gray-500 mb-1">City</label>
                  <input
                    {...register("city", { required: "Required" })}
                    className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-orange-500 outline-none"
                  />
                  {errors.city && <span className="text-xs text-red-500">{errors.city.message}</span>}
                </div>
                <div>
                  <label className="block text-[11px] font-bold uppercase text-gray-500 mb-1">State</label>
                  <input
                    {...register("state", { required: "Required" })}
                    className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-orange-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold uppercase text-gray-500 mb-1">Country</label>
                  <input
                    {...register("country")}
                    className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-orange-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold uppercase text-gray-500 mb-1">Pincode</label>
                  <input
                    type="number"
                    {...register("pincode", { required: "Required" })}
                    className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-orange-500 outline-none"
                  />
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-bold text-gray-900 flex items-center gap-2 border-b border-gray-100 pb-2 mb-3">
                <Shield size={16} className="text-orange-500" />
                Lending Privacy
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-bold uppercase text-gray-500 mb-1">Profile Visibility</label>
                  <div className="relative">
                    <Globe size={16} className="absolute left-3 top-2.5 text-gray-400 z-10" />
                    <select
                      {...register("lendingPreferences.visibility")}
                      className="w-full appearance-none rounded-lg border border-gray-200 pl-9 pr-3 py-2 text-sm focus:border-orange-500 outline-none bg-white cursor-pointer"
                    >
                      <option value="all">Public (Everyone)</option>
                      <option value="friends">Friends Only</option>
                      <option value="verified">Verified Users Only</option>
                    </select>
                    <ChevronDown size={14} className="absolute right-3 top-3 text-gray-400 pointer-events-none" />
                  </div>
                </div>

                <div className="flex items-center justify-between px-4 py-2 bg-gray-50 rounded-lg border border-gray-100 h-full">
                  <div>
                    <p className="font-semibold text-gray-900 text-sm">Local Only</p>
                    <p className="text-[10px] text-gray-500">Only show to my City.</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setValue("lendingPreferences.onlyLocal", !watchLocalOnly, { shouldDirty: true })}
                    className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors focus:outline-none
                                ${watchLocalOnly ? 'bg-orange-500' : 'bg-gray-300'}`}
                  >
                    <span
                      className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white transition-transform ${watchLocalOnly ? 'translate-x-4' : 'translate-x-1'}`}
                    />
                  </button>
                </div>
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-black hover:bg-gray-800 text-white font-medium px-6 py-2.5 rounded-xl transition-all shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 text-sm"
              >
                {isSubmitting ? <Loader2 className="animate-spin h-4 w-4" /> : (
                  <>
                    <Save size={16} /> Save Changes
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Settings;