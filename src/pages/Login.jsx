import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Lock, AlertCircle, Shield, UserCheck } from 'lucide-react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../firebase/config';

const ADMIN_USERNAME = 'admin';
const ADMIN_PASSWORD = 'admin123';

const Login = () => {
  const [role, setRole] = useState('admin'); // 'admin' or 'supervisor'
  const [username, setUsername] = useState('');
  const [supervisorId, setSupervisorId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    setError('');
    setLoading(true);

    try {
      if (role === 'admin') {
        // Admin login logic
        if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
          localStorage.setItem('isAdminLoggedIn', 'true');
          localStorage.setItem('userRole', 'admin');
          navigate('/admin/dashboard');
        } else {
          setError('Invalid username or password. Please try again.');
        }
        setLoading(false);
      } else {
        // Supervisor login logic - check against Firestore
        if (!supervisorId || !password) {
          setError('Please enter Supervisor ID and password.');
          setLoading(false);
          return;
        }

        // Query Firestore for supervisor
        const supervisorsRef = collection(db, 'supervisors');
        const q = query(supervisorsRef, where('supervisorId', '==', supervisorId));
        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) {
          setError('Invalid Supervisor ID or password.');
          setLoading(false);
          return;
        }

        // Check password
        const supervisorDoc = querySnapshot.docs[0];
        const supervisorData = supervisorDoc.data();

        if (supervisorData.password === password) {
          // Check if supervisor is active
          if (supervisorData.status !== 'active') {
            setError('Your account is inactive. Please contact administrator.');
            setLoading(false);
            return;
          }

          // Store supervisor session
          localStorage.setItem('isSupervisorLoggedIn', 'true');
          localStorage.setItem('userRole', 'supervisor');
          localStorage.setItem('supervisorId', supervisorId);
          localStorage.setItem('supervisorName', supervisorData.name || '');
          navigate('/supervisor/dashboard');
        } else {
          setError('Invalid Supervisor ID or password.');
        }
        setLoading(false);
      }
    } catch (error) {
      console.error('Login error:', error);
      setError('An error occurred during login. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 to-blue-600 flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-2xl p-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-blue-900">Login</h2>
          <p className="text-slate-600 mt-2">Sign in to access your dashboard</p>
        </div>

        {/* Role Selection */}
        <div className="mb-6">
          <label className="block text-sm font-semibold text-slate-700 mb-3">
            Select Role
          </label>
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => {
                setRole('admin');
                setError('');
                setSupervisorId('');
                setUsername('');
                setPassword('');
              }}
              className={`flex items-center justify-center gap-2 px-4 py-3 rounded-lg border-2 transition-all ${
                role === 'admin'
                  ? 'border-blue-600 bg-blue-50 text-blue-900'
                  : 'border-slate-200 text-slate-600 hover:border-slate-300'
              }`}
            >
              <Shield size={20} />
              <span className="font-medium">Admin</span>
            </button>
            <button
              type="button"
              onClick={() => {
                setRole('supervisor');
                setError('');
                setSupervisorId('');
                setUsername('');
                setPassword('');
              }}
              className={`flex items-center justify-center gap-2 px-4 py-3 rounded-lg border-2 transition-all ${
                role === 'supervisor'
                  ? 'border-blue-600 bg-blue-50 text-blue-900'
                  : 'border-slate-200 text-slate-600 hover:border-slate-300'
              }`}
            >
              <UserCheck size={20} />
              <span className="font-medium">Supervisor</span>
            </button>
          </div>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6 flex items-center gap-2">
            <AlertCircle size={20} />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {role === 'admin' ? (
            <>
              <div>
                <label htmlFor="username" className="block text-sm font-semibold text-slate-700 mb-2">
                  Username
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                  <input
                    type="text"
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border-2 border-slate-200 rounded-lg focus:outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-600/10"
                    placeholder="Enter username"
                    required
                  />
                </div>
              </div>
            </>
          ) : (
            <div>
              <label htmlFor="supervisorId" className="block text-sm font-semibold text-slate-700 mb-2">
                Supervisor ID
              </label>
              <div className="relative">
                <UserCheck className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                <input
                  type="text"
                  id="supervisorId"
                  value={supervisorId}
                  onChange={(e) => setSupervisorId(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border-2 border-slate-200 rounded-lg focus:outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-600/10"
                  placeholder="Enter Supervisor ID"
                  required
                />
              </div>
            </div>
          )}

          <div>
            <label htmlFor="password" className="block text-sm font-semibold text-slate-700 mb-2">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border-2 border-slate-200 rounded-lg focus:outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-600/10"
                placeholder="Enter password"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold transition-all hover:bg-blue-700 hover:-translate-y-0.5 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
