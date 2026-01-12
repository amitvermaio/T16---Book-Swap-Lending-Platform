import { Eye, Ban } from 'lucide-react';


const Users = () => {
  const users = [
    { id: 1, name: 'Amit Sharma', email: 'amit@example.com', role: 'User', status: 'Active' },
    { id: 2, name: 'Priya Verma', email: 'priya@example.com', role: 'User', status: 'Suspended' },
    { id: 3, name: 'Rahul Singh', email: 'rahul@example.com', role: 'User', status: 'Active' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-semibold tracking-tighter">User Management</h1>
          <p className="text-gray-500 text-sm mt-1">Manage platform members.</p>
        </div>
        <button className="bg-black text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-gray-800 transition-colors">Export CSV</button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead className="bg-gray-50/50 border-b border-gray-100">
            <tr>
              <th className="p-5 text-xs font-bold text-gray-400 uppercase tracking-wider">Name</th>
              <th className="p-5 text-xs font-bold text-gray-400 uppercase tracking-wider">Email</th>
              <th className="p-5 text-xs font-bold text-gray-400 uppercase tracking-wider">Role</th>
              <th className="p-5 text-xs font-bold text-gray-400 uppercase tracking-wider">Status</th>
              <th className="p-5 text-xs font-bold text-gray-400 uppercase tracking-wider text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {users.map((user) => (
              <tr key={user.id} className="hover:bg-gray-50/50 transition-colors group">
                <td className="p-5 font-semibold text-gray-900">{user.name}</td>
                <td className="p-5 text-gray-500 text-sm">{user.email}</td>
                <td className="p-5 text-gray-500 text-sm">{user.role}</td>
                <td className="p-5">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold tracking-wide ${user.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                    }`}>
                    {user.status}
                  </span>
                </td>
                <td className="p-5 text-right space-x-2">
                  <button className="text-gray-400 hover:text-orange-500 transition-colors"><Eye size={18} /></button>
                  <button className="text-gray-400 hover:text-red-500 transition-colors"><Ban size={18} /></button>
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