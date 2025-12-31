import React, { useState } from 'react';
import { useForm } from 'react-hook-form'; // Import hook
import {
  MapPin,
  MessageSquare,
  Check,
  X,
  MoreHorizontal,
  CalendarClock,
  CalendarDays
} from 'lucide-react';

import { useDispatch } from 'react-redux';

import { getStatusBadge, getTypeIcon } from '../utils/constants';
import { asyncupdaterequeststatus } from '../store/actions/requestActions';

const RequestCard = ({ request, isIncoming }) => {
  const dispatch = useDispatch();

  const [isAccepting, setIsAccepting] = useState(false);
  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  const isPending = request.status === 'pending';
  const otherUser = isIncoming ? request.requester : request.owner;
  const userLocation = [otherUser?.city, otherUser?.state].filter(Boolean).join(", ") || "Unknown Location";

  const formattedDueDate = request.dueDate
    ? new Date(request.dueDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    : null;

  const onSubmit = (data) => {
    dispatch(asyncupdaterequeststatus({
      requestId: request._id, action: 'approved', pickupInfo: {
        location: data.location,
        datetime: data.datetime,
        note: data.note,
      }
    }));
    console.log("Form Submitted:", data);
  };

  const handleCancel = () => {
    dispatch(asyncupdaterequeststatus({ requestId: request._id, action: 'rejected' }))
    reset();
    setIsAccepting(false);
  };

  return (
    <div className="group bg-white rounded-2xl p-4 border border-gray-100 shadow-sm hover:shadow-md hover:border-orange-200 transition-all duration-300">
      <div className="flex flex-col sm:flex-row gap-5">

        <div className="w-full sm:w-24 h-32 flex-shrink-0 bg-gray-100 rounded-xl overflow-hidden relative">
          <img src={request.book.coverImageUrl} alt={request.book.title} className="w-full h-full object-cover" />
        </div>

        <div className="flex-1 flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-start mb-2">
              <div className="flex flex-wrap gap-2 items-center">
                {getTypeIcon(request.type)}
                {formattedDueDate && (
                  <span className="text-xs font-medium text-red-600 bg-red-50 px-2 py-0.5 rounded flex items-center gap-1 border border-red-100">
                    <CalendarClock size={12} /> Due: {formattedDueDate}
                  </span>
                )}
              </div>
              <div className="hidden sm:block">
                {getStatusBadge(request.status)}
              </div>
            </div>

            <h3 className="text-lg font-bold text-gray-900 leading-tight">{request.book.title}</h3>
            <p className="text-sm text-gray-500 mb-3">by {request.book.author}</p>

            <div className="flex items-center gap-3 bg-gray-50 p-2 rounded-xl w-fit">
              <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0 border border-gray-200">
                {otherUser?.avatar ? (
                  <img
                    src={otherUser.avatar?.url || otherUser.avatar}
                    alt={otherUser?.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-black text-white flex items-center justify-center text-xs font-bold">
                    {otherUser?.name?.[0]?.toUpperCase() || "U"}
                  </div>
                )}
              </div>

              <div>
                <p className="text-xs font-bold text-gray-900">
                  {isIncoming ? "Request from" : "Owner"}
                </p>
                <div className="flex items-center gap-1 text-xs text-gray-500">
                  <span className="font-medium text-gray-700">
                    {otherUser?.name || "Unknown"}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-0.5">
                    <MapPin size={10} /> {userLocation}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {request.notes && !isAccepting && (
            <div className="mt-3 flex gap-2 items-start text-xs text-gray-600 italic">
              <MessageSquare size={14} className="text-orange-400 mt-0.5 flex-shrink-0" />
              <p>"{request.notes}"</p>
            </div>
          )}
        </div>

        <div className={`flex sm:flex-col justify-end gap-2 sm:border-l sm:border-gray-100 sm:pl-5 flex-shrink-0 ${isAccepting ? 'w-full sm:w-72' : 'sm:w-32'}`}>
          <div className="sm:hidden mr-auto">{getStatusBadge(request.status)}</div>

          {isIncoming && isPending && !isAccepting ? (
            <>
              <button
                onClick={() => setIsAccepting(true)}
                className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-black text-white px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-gray-800 transition-colors"
              >
                <Check size={14} /> Accept
              </button>
              <button
                onClick={() => handleCancel()}
                className="flex-1 sm:flex-none flex items-center justify-center gap-2 border border-gray-200 text-gray-600 px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-gray-50 transition-colors"
              >
                <X size={14} /> Decline
              </button>
            </>
          ) : !isIncoming && isPending ? (
            <button className="w-full border border-gray-200 text-gray-500 px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-gray-50 hover:text-red-500 transition-colors">
              Cancel
            </button>
          ) : !isAccepting && (
            <button className="w-full flex items-center justify-center gap-2 text-gray-400 hover:text-orange-500 transition-colors py-2">
              <MoreHorizontal size={20} />
            </button>
          )}

          {isAccepting && (
            <form
              className="flex flex-col gap-3 animate-in fade-in slide-in-from-right-4 duration-300"
              onSubmit={(e) => e.preventDefault()} // Prevent default form submission to handle via button click
            >
              <div className="text-xs font-bold text-gray-900 uppercase">Pickup Details</div>

              <div className="relative">
                <MapPin size={14} className="absolute left-3 top-3 text-gray-400" />
                <input
                  type="text"
                  placeholder="Pickup Location..."
                  className={`w-full pl-9 pr-3 py-2 bg-gray-50 border rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-orange-500 
                    ${errors.location ? 'border-red-500 focus:ring-red-500' : 'border-gray-200'}`}
                  {...register("location", { required: "Pickup location is required" })}
                />
                {errors.location && <p className="text-[10px] text-red-500 mt-1 ml-1">{errors.location.message}</p>}
              </div>

              <div className="relative">
                <CalendarDays size={14} className="absolute left-3 top-3 text-gray-400" />
                <input
                  type="datetime-local"
                  className={`w-full pl-9 pr-3 py-2 bg-gray-50 border rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-orange-500 text-gray-600
                    ${errors.datetime ? 'border-red-500 focus:ring-red-500' : 'border-gray-200'}`}
                  {...register("datetime", { required: "Date and time is required" })}
                />
                {errors.datetime && <p className="text-[10px] text-red-500 mt-1 ml-1">{errors.datetime.message}</p>}
              </div>

              <div>
                <textarea
                  placeholder="Add a note (Required)"
                  className={`w-full p-3 bg-gray-50 border rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-orange-500 resize-none h-16
                    ${errors.note ? 'border-red-500 focus:ring-red-500' : 'border-gray-200'}`}
                  {...register("note", { required: "Please add a note for the borrower" })}
                />
                {errors.note && <p className="text-[10px] text-red-500 mt-1 ml-1">{errors.note.message}</p>}
              </div>

              <div className="flex gap-2 mt-1">
                <button
                  type="button"
                  onClick={handleSubmit(onSubmit)}
                  className="flex-1 bg-black text-white py-2 rounded-lg text-xs font-bold uppercase hover:bg-green-600 transition-colors"
                >
                  Confirm
                </button>
                <button
                  type="button"
                  onClick={handleCancel}
                  className="flex-1 bg-white border border-gray-200 text-gray-600 py-2 rounded-lg text-xs font-bold uppercase hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          )}

        </div>
      </div>
    </div>
  );
};

export default RequestCard;