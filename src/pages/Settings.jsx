import { useState } from 'react'
import { motion } from 'framer-motion'
import { Link, useLocation } from 'react-router-dom'
import { toast } from 'react-toastify'
import ApperIcon from '../components/ApperIcon'

const Settings = () => {
  const [darkMode, setDarkMode] = useState(false)
  const location = useLocation()

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
    document.documentElement.classList.toggle('dark')
  }

  const navItems = [
    { icon: 'Users', label: 'Employees', path: '/' },
    { icon: 'Calculator', label: 'Payroll', path: '/payroll' },
    { icon: 'Calendar', label: 'Attendance', path: '/attendance' },
    { icon: 'UserPlus', label: 'Recruitment', path: '/recruitment' },
    { icon: 'Settings', label: 'Settings', path: '/settings' }
  ]

  const [activeTab, setActiveTab] = useState('company')
  const [companySettings, setCompanySettings] = useState({
    name: 'TechCorp Solutions',
    address: '123 Tech Park, Bangalore, Karnataka 560001',
    phone: '+91 80 1234 5678',
    email: 'hr@techcorp.com',
    website: 'www.techcorp.com',
    taxId: 'GSTIN123456789',
    panNumber: 'AABCT1234C',
    pfNumber: 'KA/BGN/12345',
    esiNumber: '12345678901234567890'
  })

  const [payrollSettings, setPayrollSettings] = useState({
    pfRate: 12,
    esiRate: 0.75,
    tdsThreshold: 250000,
    hraRate: 40,
    daRate: 10,
    payrollFrequency: 'monthly',
    payDay: 28
  })

  const [systemSettings, setSystemSettings] = useState({
    dateFormat: 'DD/MM/YYYY',
    timeFormat: '24hr',
    currency: 'INR',
    timezone: 'Asia/Kolkata',
    language: 'en',
    backupFrequency: 'daily',
    emailNotifications: true,
    smsNotifications: false
  })

  const [users, setUsers] = useState([
    {
      id: 1,
      name: 'Admin User',
      email: 'admin@techcorp.com',
      role: 'Super Admin',
      status: 'Active',
      lastLogin: '2024-11-25 10:30 AM'
    },
    {
      id: 2,
      name: 'HR Manager',
      email: 'hr@techcorp.com',
      role: 'HR Admin',
      status: 'Active',
      lastLogin: '2024-11-25 09:15 AM'
    },
    {
      id: 3,
      name: 'Payroll Officer',
      email: 'payroll@techcorp.com',
      role: 'Payroll Admin',
      status: 'Active',
      lastLogin: '2024-11-24 04:45 PM'
    }
  ])

  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    role: '',
    password: ''
  })

  const saveCompanySettings = () => {
    toast.success('Company settings updated successfully')
  }

  const savePayrollSettings = () => {
    toast.success('Payroll settings updated successfully')
  }

  const saveSystemSettings = () => {
    toast.success('System settings updated successfully')
  }

  const addUser = () => {
    if (!newUser.name || !newUser.email || !newUser.role) {
      toast.error('Please fill in all required fields')
      return
    }

    const user = {
      id: users.length + 1,
      ...newUser,
      status: 'Active',
      lastLogin: 'Never'
    }

    setUsers(prev => [...prev, user])
    setNewUser({ name: '', email: '', role: '', password: '' })
    toast.success('User added successfully')
  }

  const updateUserStatus = (id, status) => {
    setUsers(prev => 
      prev.map(user => 
        user.id === id ? { ...user, status } : user
      )
    )
    toast.success(`User ${status.toLowerCase()}`)
  }

  const deleteUser = (id) => {
    setUsers(prev => prev.filter(user => user.id !== id))
    toast.success('User deleted successfully')
  }

  const exportData = () => {
    toast.info('Exporting system data...')
  }

  const performBackup = () => {
    toast.info('Creating system backup...')
  }

  const tabs = [
    { id: 'company', label: 'Company', icon: 'Building' },
    { id: 'payroll', label: 'Payroll', icon: 'Calculator' },
    { id: 'users', label: 'Users', icon: 'Users' },
    { id: 'system', label: 'System', icon: 'Settings' }
  ]

  return (
    <div className="min-h-screen">
      {/* Navigation Header */}
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="bg-white/80 glass-effect border-b border-surface-200 sticky top-0 z-50"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center">
                <ApperIcon name="Briefcase" className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gradient">TalentFlow</h1>
                <p className="text-xs text-surface-600">HR Management Platform</p>
              </div>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-1">
              {navItems.map((item, index) => (
                <Link key={item.label} to={item.path}>
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-xl transition-all duration-200 ${
                      location.pathname === item.path
                        ? 'bg-primary text-white shadow-card' 
                        : 'text-surface-600 hover:bg-surface-100'
                    }`}
                  >
                    <ApperIcon name={item.icon} className="w-4 h-4" />
                    <span className="text-sm font-medium">{item.label}</span>
                  </motion.div>
                </Link>
              ))}
            </div>

            <div className="flex items-center space-x-3">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={toggleDarkMode}
                className="p-2 rounded-xl bg-surface-100 hover:bg-surface-200 transition-colors"
              >
                <ApperIcon name={darkMode ? 'Sun' : 'Moon'} className="w-5 h-5 text-surface-600" />
              </motion.button>
              
              <div className="w-8 h-8 bg-gradient-to-br from-secondary to-accent rounded-full flex items-center justify-center">
                <ApperIcon name="User" className="w-4 h-4 text-white" />
              </div>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Navigation */}
      <div className="md:hidden bg-white border-t border-surface-200 fixed bottom-0 left-0 right-0 z-50">
        <div className="grid grid-cols-5 gap-1 p-2">
          {navItems.map((item, index) => (
            <Link key={item.label} to={item.path}>
              <motion.div
                whileTap={{ scale: 0.95 }}
                className={`flex flex-col items-center justify-center py-2 px-1 rounded-xl transition-all duration-200 ${
                  location.pathname === item.path
                    ? 'bg-primary text-white' 
                    : 'text-surface-600 hover:bg-surface-100'
                }`}
              >
                <ApperIcon name={item.icon} className="w-5 h-5 mb-1" />
                <span className="text-xs font-medium">{item.label}</span>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 pb-20 md:pb-6">
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-surface-800 mb-2">
                System Settings
              </h2>
              <p className="text-surface-600">
                Configure your HR system settings and preferences
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={performBackup}
                className="btn-primary flex items-center justify-center space-x-2"
              >
                <ApperIcon name="Database" className="w-5 h-5" />
                <span>Backup Data</span>
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={exportData}
                className="btn-secondary flex items-center justify-center space-x-2"
              >
                <ApperIcon name="Download" className="w-5 h-5" />
                <span>Export Data</span>
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Tab Navigation */}
        <div className="card-neu p-2 mb-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {tabs.map((tab) => (
              <motion.button
                key={tab.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center justify-center space-x-2 p-3 rounded-xl transition-all duration-200 ${
                  activeTab === tab.id
                    ? 'bg-primary text-white shadow-card'
                    : 'text-surface-600 hover:bg-surface-100'
                }`}
              >
                <ApperIcon name={tab.icon} className="w-5 h-5" />
                <span className="font-medium">{tab.label}</span>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === 'company' && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="card-neu p-6 lg:p-8"
          >
            <h4 className="text-lg font-semibold text-surface-800 mb-6">Company Information</h4>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <label className="label-text">Company Name</label>
                <input
                  type="text"
                  value={companySettings.name}
                  onChange={(e) => setCompanySettings(prev => ({ ...prev, name: e.target.value }))}
                  className="input-field"
                />
              </div>

              <div>
                <label className="label-text">Phone Number</label>
                <input
                  type="tel"
                  value={companySettings.phone}
                  onChange={(e) => setCompanySettings(prev => ({ ...prev, phone: e.target.value }))}
                  className="input-field"
                />
              </div>

              <div className="lg:col-span-2">
                <label className="label-text">Company Address</label>
                <textarea
                  value={companySettings.address}
                  onChange={(e) => setCompanySettings(prev => ({ ...prev, address: e.target.value }))}
                  className="input-field"
                  rows="3"
                />
              </div>

              <div>
                <label className="label-text">Email Address</label>
                <input
                  type="email"
                  value={companySettings.email}
                  onChange={(e) => setCompanySettings(prev => ({ ...prev, email: e.target.value }))}
                  className="input-field"
                />
              </div>

              <div>
                <label className="label-text">Website</label>
                <input
                  type="url"
                  value={companySettings.website}
                  onChange={(e) => setCompanySettings(prev => ({ ...prev, website: e.target.value }))}
                  className="input-field"
                />
              </div>

              <div>
                <label className="label-text">GST Number</label>
                <input
                  type="text"
                  value={companySettings.taxId}
                  onChange={(e) => setCompanySettings(prev => ({ ...prev, taxId: e.target.value }))}
                  className="input-field"
                />
              </div>

              <div>
                <label className="label-text">PAN Number</label>
                <input
                  type="text"
                  value={companySettings.panNumber}
                  onChange={(e) => setCompanySettings(prev => ({ ...prev, panNumber: e.target.value }))}
                  className="input-field"
                />
              </div>

              <div>
                <label className="label-text">PF Number</label>
                <input
                  type="text"
                  value={companySettings.pfNumber}
                  onChange={(e) => setCompanySettings(prev => ({ ...prev, pfNumber: e.target.value }))}
                  className="input-field"
                />
              </div>

              <div>
                <label className="label-text">ESI Number</label>
                <input
                  type="text"
                  value={companySettings.esiNumber}
                  onChange={(e) => setCompanySettings(prev => ({ ...prev, esiNumber: e.target.value }))}
                  className="input-field"
                />
              </div>
            </div>

            <div className="flex justify-end mt-6">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={saveCompanySettings}
                className="btn-primary flex items-center space-x-2"
              >
                <ApperIcon name="Save" className="w-5 h-5" />
                <span>Save Changes</span>
              </motion.button>
            </div>
          </motion.div>
        )}

        {activeTab === 'payroll' && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="card-neu p-6 lg:p-8"
          >
            <h4 className="text-lg font-semibold text-surface-800 mb-6">Payroll Configuration</h4>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <label className="label-text">PF Rate (%)</label>
                <input
                  type="number"
                  value={payrollSettings.pfRate}
                  onChange={(e) => setPayrollSettings(prev => ({ ...prev, pfRate: parseFloat(e.target.value) }))}
                  className="input-field"
                  step="0.1"
                />
              </div>

              <div>
                <label className="label-text">ESI Rate (%)</label>
                <input
                  type="number"
                  value={payrollSettings.esiRate}
                  onChange={(e) => setPayrollSettings(prev => ({ ...prev, esiRate: parseFloat(e.target.value) }))}
                  className="input-field"
                  step="0.01"
                />
              </div>

              <div>
                <label className="label-text">TDS Threshold (Annual)</label>
                <input
                  type="number"
                  value={payrollSettings.tdsThreshold}
                  onChange={(e) => setPayrollSettings(prev => ({ ...prev, tdsThreshold: parseInt(e.target.value) }))}
                  className="input-field"
                />
              </div>

              <div>
                <label className="label-text">HRA Rate (%)</label>
                <input
                  type="number"
                  value={payrollSettings.hraRate}
                  onChange={(e) => setPayrollSettings(prev => ({ ...prev, hraRate: parseFloat(e.target.value) }))}
                  className="input-field"
                  step="0.1"
                />
              </div>

              <div>
                <label className="label-text">DA Rate (%)</label>
                <input
                  type="number"
                  value={payrollSettings.daRate}
                  onChange={(e) => setPayrollSettings(prev => ({ ...prev, daRate: parseFloat(e.target.value) }))}
                  className="input-field"
                  step="0.1"
                />
              </div>

              <div>
                <label className="label-text">Payroll Frequency</label>
                <select
                  value={payrollSettings.payrollFrequency}
                  onChange={(e) => setPayrollSettings(prev => ({ ...prev, payrollFrequency: e.target.value }))}
                  className="input-field"
                >
                  <option value="monthly">Monthly</option>
                  <option value="bi-weekly">Bi-weekly</option>
                  <option value="weekly">Weekly</option>
                </select>
              </div>

              <div>
                <label className="label-text">Pay Day of Month</label>
                <input
                  type="number"
                  value={payrollSettings.payDay}
                  onChange={(e) => setPayrollSettings(prev => ({ ...prev, payDay: parseInt(e.target.value) }))}
                  className="input-field"
                  min="1"
                  max="31"
                />
              </div>
            </div>

            <div className="flex justify-end mt-6">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={savePayrollSettings}
                className="btn-primary flex items-center space-x-2"
              >
                <ApperIcon name="Save" className="w-5 h-5" />
                <span>Save Changes</span>
              </motion.button>
            </div>
          </motion.div>
        )}

        {activeTab === 'users' && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="card-neu p-6">
                <h4 className="text-lg font-semibold text-surface-800 mb-6">Add New User</h4>
                
                <div className="space-y-4">
                  <div>
                    <label className="label-text">Full Name</label>
                    <input
                      type="text"
                      value={newUser.name}
                      onChange={(e) => setNewUser(prev => ({ ...prev, name: e.target.value }))}
                      className="input-field"
                      placeholder="Enter full name"
                    />
                  </div>

                  <div>
                    <label className="label-text">Email Address</label>
                    <input
                      type="email"
                      value={newUser.email}
                      onChange={(e) => setNewUser(prev => ({ ...prev, email: e.target.value }))}
                      className="input-field"
                      placeholder="Enter email address"
                    />
                  </div>

                  <div>
                    <label className="label-text">Role</label>
                    <select
                      value={newUser.role}
                      onChange={(e) => setNewUser(prev => ({ ...prev, role: e.target.value }))}
                      className="input-field"
                    >
                      <option value="">Select Role</option>
                      <option value="Super Admin">Super Admin</option>
                      <option value="HR Admin">HR Admin</option>
                      <option value="Payroll Admin">Payroll Admin</option>
                      <option value="Manager">Manager</option>
                      <option value="Employee">Employee</option>
                    </select>
                  </div>

                  <div>
                    <label className="label-text">Password</label>
                    <input
                      type="password"
                      value={newUser.password}
                      onChange={(e) => setNewUser(prev => ({ ...prev, password: e.target.value }))}
                      className="input-field"
                      placeholder="Enter password"
                    />
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={addUser}
                    className="btn-primary w-full flex items-center justify-center space-x-2"
                  >
                    <ApperIcon name="UserPlus" className="w-5 h-5" />
                    <span>Add User</span>
                  </motion.button>
                </div>
              </div>

              <div className="card-neu p-6">
                <h4 className="text-lg font-semibold text-surface-800 mb-6">User Roles & Permissions</h4>
                
                <div className="space-y-4">
                  {[
                    { role: 'Super Admin', permissions: 'Full system access' },
                    { role: 'HR Admin', permissions: 'Employee, Recruitment, Attendance' },
                    { role: 'Payroll Admin', permissions: 'Payroll, Reports' },
                    { role: 'Manager', permissions: 'Team management, Reports' },
                    { role: 'Employee', permissions: 'View own data' }
                  ].map((roleInfo, index) => (
                    <div key={index} className="p-3 bg-surface-50 rounded-xl">
                      <div className="font-medium text-surface-800">{roleInfo.role}</div>
                      <div className="text-sm text-surface-600">{roleInfo.permissions}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="card-neu p-6">
              <h4 className="text-lg font-semibold text-surface-800 mb-6">System Users</h4>
              
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-surface-200">
                      <th className="text-left py-3 px-4 font-semibold text-surface-700">User</th>
                      <th className="text-left py-3 px-4 font-semibold text-surface-700">Role</th>
                      <th className="text-left py-3 px-4 font-semibold text-surface-700">Status</th>
                      <th className="text-left py-3 px-4 font-semibold text-surface-700">Last Login</th>
                      <th className="text-left py-3 px-4 font-semibold text-surface-700">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user) => (
                      <tr key={user.id} className="border-b border-surface-100 hover:bg-surface-50">
                        <td className="py-3 px-4">
                          <div>
                            <div className="font-medium text-surface-800">{user.name}</div>
                            <div className="text-sm text-surface-600">{user.email}</div>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <span className="px-2 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary">
                            {user.role}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                            user.status === 'Active' 
                              ? 'bg-emerald-100 text-emerald-700'
                              : 'bg-red-100 text-red-700'
                          }`}>
                            {user.status}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <div className="text-sm text-surface-600">{user.lastLogin}</div>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex space-x-2">
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => updateUserStatus(user.id, user.status === 'Active' ? 'Inactive' : 'Active')}
                              className="p-2 rounded-lg text-amber-600 hover:bg-amber-50"
                            >
                              <ApperIcon name={user.status === 'Active' ? 'UserX' : 'UserCheck'} className="w-4 h-4" />
                            </motion.button>
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => deleteUser(user.id)}
                              className="p-2 rounded-lg text-red-600 hover:bg-red-50"
                            >
                              <ApperIcon name="Trash2" className="w-4 h-4" />
                            </motion.button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'system' && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <div className="card-neu p-6 lg:p-8">
              <h4 className="text-lg font-semibold text-surface-800 mb-6">System Preferences</h4>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <label className="label-text">Date Format</label>
                  <select
                    value={systemSettings.dateFormat}
                    onChange={(e) => setSystemSettings(prev => ({ ...prev, dateFormat: e.target.value }))}
                    className="input-field"
                  >
                    <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                    <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                    <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                  </select>
                </div>

                <div>
                  <label className="label-text">Time Format</label>
                  <select
                    value={systemSettings.timeFormat}
                    onChange={(e) => setSystemSettings(prev => ({ ...prev, timeFormat: e.target.value }))}
                    className="input-field"
                  >
                    <option value="24hr">24 Hour</option>
                    <option value="12hr">12 Hour</option>
                  </select>
                </div>

                <div>
                  <label className="label-text">Currency</label>
                  <select
                    value={systemSettings.currency}
                    onChange={(e) => setSystemSettings(prev => ({ ...prev, currency: e.target.value }))}
                    className="input-field"
                  >
                    <option value="INR">Indian Rupee (₹)</option>
                    <option value="USD">US Dollar ($)</option>
                    <option value="EUR">Euro (€)</option>
                  </select>
                </div>

                <div>
                  <label className="label-text">Timezone</label>
                  <select
                    value={systemSettings.timezone}
                    onChange={(e) => setSystemSettings(prev => ({ ...prev, timezone: e.target.value }))}
                    className="input-field"
                  >
                    <option value="Asia/Kolkata">Asia/Kolkata</option>
                    <option value="Asia/Mumbai">Asia/Mumbai</option>
                    <option value="UTC">UTC</option>
                  </select>
                </div>

                <div>
                  <label className="label-text">Language</label>
                  <select
                    value={systemSettings.language}
                    onChange={(e) => setSystemSettings(prev => ({ ...prev, language: e.target.value }))}
                    className="input-field"
                  >
                    <option value="en">English</option>
                    <option value="hi">Hindi</option>
                    <option value="ta">Tamil</option>
                  </select>
                </div>

                <div>
                  <label className="label-text">Backup Frequency</label>
                  <select
                    value={systemSettings.backupFrequency}
                    onChange={(e) => setSystemSettings(prev => ({ ...prev, backupFrequency: e.target.value }))}
                    className="input-field"
                  >
                    <option value="daily">Daily</option>
                    <option value="weekly">Weekly</option>
                    <option value="monthly">Monthly</option>
                  </select>
                </div>
              </div>

              <div className="mt-6 space-y-4">
                <h5 className="font-medium text-surface-800">Notification Settings</h5>
                
                <div className="flex items-center justify-between p-4 bg-surface-50 rounded-xl">
                  <div>
                    <div className="font-medium text-surface-800">Email Notifications</div>
                    <div className="text-sm text-surface-600">Receive notifications via email</div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={systemSettings.emailNotifications}
                      onChange={(e) => setSystemSettings(prev => ({ ...prev, emailNotifications: e.target.checked }))}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-surface-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary" />
                  </label>
                </div>

                <div className="flex items-center justify-between p-4 bg-surface-50 rounded-xl">
                  <div>
                    <div className="font-medium text-surface-800">SMS Notifications</div>
                    <div className="text-sm text-surface-600">Receive notifications via SMS</div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={systemSettings.smsNotifications}
                      onChange={(e) => setSystemSettings(prev => ({ ...prev, smsNotifications: e.target.checked }))}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-surface-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary" />
                  </label>
                </div>
              </div>

              <div className="flex justify-end mt-6">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={saveSystemSettings}
                  className="btn-primary flex items-center space-x-2"
                >
                  <ApperIcon name="Save" className="w-5 h-5" />
                  <span>Save Changes</span>
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </main>
    </div>
  )
}

export default Settings