import { useState, useEffect } from 'react';
import { Eye, ChevronDown, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';
import EmailCompose from '../../components/admin/EmailCompose';
import { asyncfetchusers, asyncchangeuserrole } from '../../store/actions/adminActions';
import { useDispatch, useSelector } from 'react-redux';

const Users = () => {
  const [emailComposeOpen, setEmailComposeOpen] = useState(false);
  const dispatch = useDispatch();
  const users = useSelector(state => state.admin.usersList);

  useEffect(() => {
    if (users.length === 0) {
      dispatch(asyncfetchusers());
    }
  }, []);

  const handleRoleChange = async (e, userId) => {
    if (!e.target.value || !userId) return;
    console.log(e.target.value, userId);
    await dispatch(asyncchangeuserrole(userId, e.target.value));
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Member Directory</h1>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr>
              <th className="p-4 text-xs font-semibold text-gray-500 uppercase">User</th>
              <th className="p-4 text-xs font-semibold text-gray-500 uppercase">Role</th>
              <th className="p-4 text-xs font-semibold text-gray-500 uppercase text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {users.map((user) => (
              <tr key={user._id} className="hover:bg-gray-50 transition-colors">
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-sm overflow-hidden">
                      {user.avatar ? (
                        <img
                          className="w-full h-full object-cover"
                          src={user.avatar}
                          alt={user.name}
                        />
                      ) : (
                        user.name?.charAt(0)
                      )}
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">{user.name}</div>
                      <div className="text-sm text-gray-500">{user.email}</div>
                    </div>
                  </div>
                </td>

                <td className="p-4">
                  <div className="relative max-w-[120px]">
                    <select
                      name="role"
                      id={`${user._id}`}
                      value={user.role.toLowerCase() || 'user'}
                      className="block w-full cursor-pointer appearance-none rounded-lg border border-gray-200 bg-white py-2 pl-3 pr-8 text-sm font-medium text-gray-700 transition-all hover:border-indigo-300 hover:bg-gray-50 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                      onChange={(e) => handleRoleChange(e, user._id)}
                    >
                      <option value="user">User</option>
                      <option value="admin">Admin</option>
                    </select>

                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2 text-gray-400">
                      <ChevronDown size={16} />
                    </div>
                  </div>
                </td>

                <td className="p-4 text-right space-x-3">
                  <button
                    onClick={() => setEmailComposeOpen(!emailComposeOpen)}
                    className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg transition-colors"
                    title="Send Email"
                  >
                    <Mail size={18} />
                  </button>

                  <Link
                    to={`/profile/${user._id}`}
                    className="inline-flex items-center gap-1 text-sm font-semibold text-indigo-600 hover:text-indigo-800"
                  >
                    <Eye size={16} />
                    View Profile
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Users;