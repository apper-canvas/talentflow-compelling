import { useState } from 'react'
import { motion } from 'framer-motion'
import { Link, useLocation } from 'react-router-dom'
import { toast } from 'react-toastify'
import ApperIcon from '../components/ApperIcon'

const Attendance = () => {
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

  const [activeTab, setActiveTab] = useState('clock')
  const [selectedEmployee, setSelectedEmployee] = useState('')
  const [leaveForm, setLeaveForm] = useState({
    employeeId: '',
    leaveType: '',
    startDate: '',
    endDate: '',
    reason: ''
  })

  const [attendanceRecords, setAttendanceRecords] = useState([
    {
      id: 1,
      employeeId: 'EMP001',
      employeeName: 'Rajesh Kumar',
      date: '2024-11-25',
      clockIn: '09:15',
      clockOut: '18:30',
      totalHours: '9h 15m',
      status: 'Present'
    },
    {
      id: 2,
      employeeId: 'EMP002',
      employeeName: 'Priya Sharma',
      date: '2024-11-25',
      clockIn: '09:00',
      clockOut: '18:00',
      totalHours: '9h 00m',
      status: 'Present'
    },
    {
      id: 3,
      employeeId: 'EMP003',
      employeeName: 'Arjun Patel',
      date: '2024-11-25',
      clockIn: '10:30',
      clockOut: '19:30',
      totalHours: '9h 00m',
      status: 'Late'
    }
  ])

  const [leaveRequests, setLeaveRequests] = useState([
    {
      id: 1,
      employeeId: 'EMP001',
      employeeName: 'Rajesh Kumar',
      leaveType: 'Sick Leave',
      startDate: '2024-11-28',
      endDate: '2024-11-29',
      days: 2,
      reason: 'Medical checkup',
      status: 'Pending',
      appliedDate: '2024-11-25'
    },
    {
      id: 2,
      employeeId: 'EMP002', 
      employeeName: 'Priya Sharma',
      leaveType: 'Annual Leave',
      startDate: '2024-12-15',
      endDate: '2024-12-20',
      days: 6,
      reason: 'Family vacation',
      status: 'Approved',
      appliedDate: '2024-11-20'
    }
  ])

  const employees = [
    { id: 'EMP001', name: 'Rajesh Kumar', department: 'Development' },
    { id: 'EMP002', name: 'Priya Sharma', department: 'Product' },
    { id: 'EMP003', name: 'Arjun Patel', department: 'Design' }
  ]

  const clockIn = () => {
    if (!selectedEmployee) {
      toast.error('Please select an employee')
      return
    }

    const employee = employees.find(emp => emp.id === selectedEmployee)
    const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    const today = new Date().toISOString().split('T')[0]

    const existingRecord = attendanceRecords.find(
      record => record.employeeId === selectedEmployee && record.date === today
    )

    if (existingRecord) {
      toast.warning('Employee already clocked in today')
      return
    }

    const newRecord = {
      id: attendanceRecords.length + 1,
      employeeId: selectedEmployee,
      employeeName: employee.name,
      date: today,
      clockIn: currentTime,
      clockOut: '',
      totalHours: '',
      status: currentTime > '09:30' ? 'Late' : 'Present'
    }

    setAttendanceRecords(prev => [newRecord, ...prev])
    toast.success(`${employee.name} clocked in at ${currentTime}`)
    setSelectedEmployee('')
  }

  const clockOut = () => {
    if (!selectedEmployee) {
      toast.error('Please select an employee')
      return
    }

    const employee = employees.find(emp => emp.id === selectedEmployee)
    const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    const today = new Date().toISOString().split('T')[0]

    const recordIndex = attendanceRecords.findIndex(
      record => record.employeeId === selectedEmployee && record.date === today && !record.clockOut
    )

    if (recordIndex === -1) {
      toast.error('No clock-in record found for today')
      return
    }

    const updatedRecords = [...attendanceRecords]
    const record = updatedRecords[recordIndex]
    
    const clockInTime = new Date(`2024-01-01 ${record.clockIn}`)
    const clockOutTime = new Date(`2024-01-01 ${currentTime}`)
    const diffMs = clockOutTime - clockInTime
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60))
    const diffMinutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60))

    record.clockOut = currentTime
    record.totalHours = `${diffHours}h ${diffMinutes}m`

    setAttendanceRecords(updatedRecords)
    toast.success(`${employee.name} clocked out at ${currentTime}`)
    setSelectedEmployee('')
  }

  const submitLeaveRequest = () => {
    if (!leaveForm.employeeId || !leaveForm.leaveType || !leaveForm.startDate || !leaveForm.endDate) {
      toast.error('Please fill in all required fields')
      return
    }

    const employee = employees.find(emp => emp.id === leaveForm.employeeId)
    const startDate = new Date(leaveForm.startDate)
    const endDate = new Date(leaveForm.endDate)
    const days = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24)) + 1

    const newRequest = {
      id: leaveRequests.length + 1,
      employeeId: leaveForm.employeeId,
      employeeName: employee.name,
      leaveType: leaveForm.leaveType,
      startDate: leaveForm.startDate,
      endDate: leaveForm.endDate,
      days,
      reason: leaveForm.reason,
      status: 'Pending',
      appliedDate: new Date().toISOString().split('T')[0]
    }

    setLeaveRequests(prev => [newRequest, ...prev])
    toast.success('Leave request submitted successfully')
    
    setLeaveForm({
      employeeId: '',
      leaveType: '',
      startDate: '',
      endDate: '',
      reason: ''
    })
  }

  const updateLeaveStatus = (id, status) => {
    setLeaveRequests(prev => 
      prev.map(request => 
        request.id === id ? { ...request, status } : request
      )
    )
    toast.success(`Leave request ${status.toLowerCase()}`)
  }

  const tabs = [
    { id: 'clock', label: 'Clock In/Out', icon: 'Clock' },
    { id: 'records', label: 'Attendance Records', icon: 'Calendar' },
    { id: 'leave', label: 'Leave Management', icon: 'CalendarDays' }
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
                Attendance Management
              </h2>
              <p className="text-surface-600">
                Track employee attendance and manage leave requests
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="btn-primary flex items-center justify-center space-x-2"
              >
                <ApperIcon name="Download" className="w-5 h-5" />
                <span>Export Report</span>
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="btn-secondary flex items-center justify-center space-x-2"
              >
                <ApperIcon name="Calendar" className="w-5 h-5" />
                <span>View Calendar</span>
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Stats Cards */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
        >
          {[
            { label: 'Present Today', value: attendanceRecords.filter(r => r.date === new Date().toISOString().split('T')[0] && r.status !== 'Absent').length.toString(), icon: 'CheckCircle', color: 'from-emerald-500 to-emerald-600' },
            { label: 'Late Arrivals', value: attendanceRecords.filter(r => r.status === 'Late').length.toString(), icon: 'Clock', color: 'from-amber-500 to-amber-600' },
            { label: 'On Leave', value: leaveRequests.filter(r => r.status === 'Approved' && new Date(r.startDate) <= new Date() && new Date(r.endDate) >= new Date()).length.toString(), icon: 'CalendarDays', color: 'from-blue-500 to-blue-600' },
            { label: 'Pending Requests', value: leaveRequests.filter(r => r.status === 'Pending').length.toString(), icon: 'AlertCircle', color: 'from-purple-500 to-purple-600' }
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              whileHover={{ scale: 1.02 }}
              className="card-neu p-4 lg:p-6"
            >
              <div className="flex items-center justify-between mb-3">
                <div className={`w-10 h-10 lg:w-12 lg:h-12 bg-gradient-to-br ${stat.color} rounded-xl flex items-center justify-center`}>
                  <ApperIcon name={stat.icon} className="w-5 h-5 lg:w-6 lg:h-6 text-white" />
                </div>
              </div>
              <div>
                <div className="text-2xl lg:text-3xl font-bold text-surface-800">{stat.value}</div>
                <div className="text-sm text-surface-600">{stat.label}</div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Tab Navigation */}
        <div className="card-neu p-2 mb-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
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
        {activeTab === 'clock' && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-6"
          >
            <div className="card-neu p-6 lg:p-8">
              <h4 className="text-lg font-semibold text-surface-800 mb-6">Clock In/Out</h4>
              
              <div className="space-y-6">
                <div>
                  <label className="label-text">Select Employee</label>
                  <select
                    value={selectedEmployee}
                    onChange={(e) => setSelectedEmployee(e.target.value)}
                    className="input-field"
                  >
                    <option value="">Choose Employee</option>
                    {employees.map(emp => (
                      <option key={emp.id} value={emp.id}>
                        {emp.id} - {emp.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="text-center py-6">
                  <div className="text-4xl font-bold text-primary mb-2">
                    {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </div>
                  <div className="text-surface-600">
                    {new Date().toLocaleDateString('en-IN', { 
                      weekday: 'long', 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={clockIn}
                    className="btn-primary flex items-center justify-center space-x-2 py-4"
                  >
                    <ApperIcon name="LogIn" className="w-5 h-5" />
                    <span>Clock In</span>
                  </motion.button>
                  
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={clockOut}
                    className="btn-secondary flex items-center justify-center space-x-2 py-4"
                  >
                    <ApperIcon name="LogOut" className="w-5 h-5" />
                    <span>Clock Out</span>
                  </motion.button>
                </div>
              </div>
            </div>

            <div className="card-neu p-6 lg:p-8">
              <h4 className="text-lg font-semibold text-surface-800 mb-6">Today's Status</h4>
              
              <div className="space-y-4">
                {employees.map((employee) => {
                  const todayRecord = attendanceRecords.find(
                    record => record.employeeId === employee.id && 
                    record.date === new Date().toISOString().split('T')[0]
                  )
                  
                  return (
                    <div key={employee.id} className="flex items-center justify-between p-4 bg-surface-50 rounded-xl">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center">
                          <span className="text-white font-bold text-sm">
                            {employee.name.charAt(0)}
                          </span>
                        </div>
                        <div>
                          <div className="font-medium text-surface-800">{employee.name}</div>
                          <div className="text-sm text-surface-600">{employee.department}</div>
                        </div>
                      </div>
                      
                      <div className="text-right">
                        {todayRecord ? (
                          <div>
                            <div className="text-sm font-medium text-surface-800">
                              {todayRecord.clockIn} - {todayRecord.clockOut || 'Working'}
                            </div>
                            <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                              todayRecord.status === 'Present' 
                                ? 'bg-emerald-100 text-emerald-700'
                                : todayRecord.status === 'Late'
                                ? 'bg-amber-100 text-amber-700'
                                : 'bg-red-100 text-red-700'
                            }`}>
                              {todayRecord.status}
                            </span>
                          </div>
                        ) : (
                          <span className="px-2 py-1 text-xs font-medium rounded-full bg-surface-200 text-surface-600">
                            Not Clocked In
                          </span>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'records' && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="card-neu p-6"
          >
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-surface-200">
                    <th className="text-left py-3 px-4 font-semibold text-surface-700">Employee</th>
                    <th className="text-left py-3 px-4 font-semibold text-surface-700">Date</th>
                    <th className="text-left py-3 px-4 font-semibold text-surface-700">Clock In</th>
                    <th className="text-left py-3 px-4 font-semibold text-surface-700">Clock Out</th>
                    <th className="text-left py-3 px-4 font-semibold text-surface-700">Total Hours</th>
                    <th className="text-left py-3 px-4 font-semibold text-surface-700">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {attendanceRecords.map((record) => (
                    <tr key={record.id} className="border-b border-surface-100 hover:bg-surface-50">
                      <td className="py-3 px-4">
                        <div>
                          <div className="font-medium text-surface-800">{record.employeeName}</div>
                          <div className="text-sm text-surface-600">{record.employeeId}</div>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="text-surface-800">{new Date(record.date).toLocaleDateString('en-IN')}</div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="text-surface-800">{record.clockIn}</div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="text-surface-800">{record.clockOut || '-'}</div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="text-surface-800">{record.totalHours || '-'}</div>
                      </td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                          record.status === 'Present' 
                            ? 'bg-emerald-100 text-emerald-700'
                            : record.status === 'Late'
                            ? 'bg-amber-100 text-amber-700'
                            : 'bg-red-100 text-red-700'
                        }`}>
                          {record.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}

        {activeTab === 'leave' && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="card-neu p-6 lg:p-8">
                <h4 className="text-lg font-semibold text-surface-800 mb-6">Submit Leave Request</h4>
                
                <div className="space-y-4">
                  <div>
                    <label className="label-text">Employee</label>
                    <select
                      value={leaveForm.employeeId}
                      onChange={(e) => setLeaveForm(prev => ({ ...prev, employeeId: e.target.value }))}
                      className="input-field"
                    >
                      <option value="">Select Employee</option>
                      {employees.map(emp => (
                        <option key={emp.id} value={emp.id}>
                          {emp.id} - {emp.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="label-text">Leave Type</label>
                    <select
                      value={leaveForm.leaveType}
                      onChange={(e) => setLeaveForm(prev => ({ ...prev, leaveType: e.target.value }))}
                      className="input-field"
                    >
                      <option value="">Select Leave Type</option>
                      <option value="Sick Leave">Sick Leave</option>
                      <option value="Annual Leave">Annual Leave</option>
                      <option value="Casual Leave">Casual Leave</option>
                      <option value="Maternity Leave">Maternity Leave</option>
                      <option value="Paternity Leave">Paternity Leave</option>
                    </select>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="label-text">Start Date</label>
                      <input
                        type="date"
                        value={leaveForm.startDate}
                        onChange={(e) => setLeaveForm(prev => ({ ...prev, startDate: e.target.value }))}
                        className="input-field"
                      />
                    </div>
                    <div>
                      <label className="label-text">End Date</label>
                      <input
                        type="date"
                        value={leaveForm.endDate}
                        onChange={(e) => setLeaveForm(prev => ({ ...prev, endDate: e.target.value }))}
                        className="input-field"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="label-text">Reason</label>
                    <textarea
                      value={leaveForm.reason}
                      onChange={(e) => setLeaveForm(prev => ({ ...prev, reason: e.target.value }))}
                      className="input-field"
                      rows="3"
                      placeholder="Enter reason for leave"
                    />
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={submitLeaveRequest}
                    className="btn-primary w-full flex items-center justify-center space-x-2"
                  >
                    <ApperIcon name="Send" className="w-5 h-5" />
                    <span>Submit Request</span>
                  </motion.button>
                </div>
              </div>

              <div className="card-neu p-6 lg:p-8">
                <h4 className="text-lg font-semibold text-surface-800 mb-6">Leave Balance</h4>
                
                <div className="space-y-4">
                  {employees.map((employee) => (
                    <div key={employee.id} className="p-4 bg-surface-50 rounded-xl">
                      <div className="font-medium text-surface-800 mb-2">{employee.name}</div>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <div className="text-surface-600">Annual Leave</div>
                          <div className="font-medium">18/21 days</div>
                        </div>
                        <div>
                          <div className="text-surface-600">Sick Leave</div>
                          <div className="font-medium">10/12 days</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="card-neu p-6">
              <h4 className="text-lg font-semibold text-surface-800 mb-6">Leave Requests</h4>
              
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-surface-200">
                      <th className="text-left py-3 px-4 font-semibold text-surface-700">Employee</th>
                      <th className="text-left py-3 px-4 font-semibold text-surface-700">Leave Type</th>
                      <th className="text-left py-3 px-4 font-semibold text-surface-700">Dates</th>
                      <th className="text-left py-3 px-4 font-semibold text-surface-700">Days</th>
                      <th className="text-left py-3 px-4 font-semibold text-surface-700">Status</th>
                      <th className="text-left py-3 px-4 font-semibold text-surface-700">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {leaveRequests.map((request) => (
                      <tr key={request.id} className="border-b border-surface-100 hover:bg-surface-50">
                        <td className="py-3 px-4">
                          <div>
                            <div className="font-medium text-surface-800">{request.employeeName}</div>
                            <div className="text-sm text-surface-600">{request.employeeId}</div>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <div className="text-surface-800">{request.leaveType}</div>
                        </td>
                        <td className="py-3 px-4">
                          <div className="text-surface-800">
                            {new Date(request.startDate).toLocaleDateString('en-IN')} - {new Date(request.endDate).toLocaleDateString('en-IN')}
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <div className="text-surface-800">{request.days} days</div>
                        </td>
                        <td className="py-3 px-4">
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                            request.status === 'Approved' 
                              ? 'bg-emerald-100 text-emerald-700'
                              : request.status === 'Rejected'
                              ? 'bg-red-100 text-red-700'
                              : 'bg-amber-100 text-amber-700'
                          }`}>
                            {request.status}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          {request.status === 'Pending' && (
                            <div className="flex space-x-2">
                              <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => updateLeaveStatus(request.id, 'Approved')}
                                className="p-2 rounded-lg text-emerald-600 hover:bg-emerald-50"
                              >
                                <ApperIcon name="Check" className="w-4 h-4" />
                              </motion.button>
                              <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => updateLeaveStatus(request.id, 'Rejected')}
                                className="p-2 rounded-lg text-red-600 hover:bg-red-50"
                              >
                                <ApperIcon name="X" className="w-4 h-4" />
                              </motion.button>
                            </div>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        )}
      </main>
    </div>
  )
}

export default Attendance