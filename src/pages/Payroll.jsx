import { useState } from 'react'
import { motion } from 'framer-motion'
import { Link, useLocation } from 'react-router-dom'
import { toast } from 'react-toastify'
import ApperIcon from '../components/ApperIcon'

const Payroll = () => {
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

  const [activeTab, setActiveTab] = useState('calculate')
  const [payrollData, setPayrollData] = useState({
    employeeId: '',
    basicSalary: '',
    month: new Date().getMonth() + 1,
    year: new Date().getFullYear()
  })

  const [employees] = useState([
    {
      id: 'EMP001',
      name: 'Rajesh Kumar',
      designation: 'Senior Software Engineer',
      department: 'Development',
      basicSalary: 70000,
      status: 'Active'
    },
    {
      id: 'EMP002', 
      name: 'Priya Sharma',
      designation: 'Product Manager',
      department: 'Product',
      basicSalary: 100000,
      status: 'Active'
    },
    {
      id: 'EMP003',
      name: 'Arjun Patel',
      designation: 'UI/UX Designer', 
      department: 'Design',
      basicSalary: 55000,
      status: 'Active'
    }
  ])

  const [payrollRecords, setPayrollRecords] = useState([
    {
      id: 1,
      employeeId: 'EMP001',
      employeeName: 'Rajesh Kumar',
      month: 'November',
      year: 2024,
      basicSalary: 70000,
      netSalary: 65450,
      status: 'Processed',
      processedDate: '2024-11-25'
    },
    {
      id: 2,
      employeeId: 'EMP002',
      employeeName: 'Priya Sharma', 
      month: 'November',
      year: 2024,
      basicSalary: 100000,
      netSalary: 93500,
      status: 'Processed',
      processedDate: '2024-11-25'
    }
  ])

  const calculatePayroll = () => {
    if (!payrollData.employeeId || !payrollData.basicSalary) {
      toast.error('Please select employee and enter basic salary')
      return
    }

    const basic = parseFloat(payrollData.basicSalary)
    const hra = basic * 0.4
    const da = basic * 0.1 
    const grossSalary = basic + hra + da
    
    const pf = basic * 0.12
    const esi = grossSalary < 21000 ? grossSalary * 0.0075 : 0
    const tds = grossSalary > 250000/12 ? grossSalary * 0.1 : 0
    
    const totalDeductions = pf + esi + tds
    const netSalary = grossSalary - totalDeductions

    const selectedEmployee = employees.find(emp => emp.id === payrollData.employeeId)
    
    const newRecord = {
      id: payrollRecords.length + 1,
      employeeId: payrollData.employeeId,
      employeeName: selectedEmployee?.name || '',
      month: new Date(payrollData.year, payrollData.month - 1).toLocaleString('en-US', { month: 'long' }),
      year: payrollData.year,
      basicSalary: basic,
      netSalary: Math.round(netSalary),
      status: 'Processed',
      processedDate: new Date().toISOString().split('T')[0]
    }

    setPayrollRecords(prev => [newRecord, ...prev])
    toast.success(`Payroll processed successfully! Net Salary: ₹${netSalary.toLocaleString('en-IN')}`)
    
    setPayrollData({
      employeeId: '',
      basicSalary: '',
      month: new Date().getMonth() + 1,
      year: new Date().getFullYear()
    })
  }

  const generatePayslip = (record) => {
    toast.info(`Generating payslip for ${record.employeeName} - ${record.month} ${record.year}`)
  }

  const processAllPayroll = () => {
    const unprocessedEmployees = employees.filter(emp => 
      !payrollRecords.some(record => 
        record.employeeId === emp.id && 
        record.month === new Date().toLocaleString('en-US', { month: 'long' }) &&
        record.year === new Date().getFullYear()
      )
    )

    if (unprocessedEmployees.length === 0) {
      toast.warning('All employees have been processed for this month')
      return
    }

    const newRecords = unprocessedEmployees.map((emp, index) => {
      const basic = emp.basicSalary
      const hra = basic * 0.4
      const da = basic * 0.1
      const grossSalary = basic + hra + da
      
      const pf = basic * 0.12
      const esi = grossSalary < 21000 ? grossSalary * 0.0075 : 0
      const tds = grossSalary > 250000/12 ? grossSalary * 0.1 : 0
      
      const totalDeductions = pf + esi + tds
      const netSalary = grossSalary - totalDeductions

      return {
        id: payrollRecords.length + index + 1,
        employeeId: emp.id,
        employeeName: emp.name,
        month: new Date().toLocaleString('en-US', { month: 'long' }),
        year: new Date().getFullYear(),
        basicSalary: basic,
        netSalary: Math.round(netSalary),
        status: 'Processed',
        processedDate: new Date().toISOString().split('T')[0]
      }
    })

    setPayrollRecords(prev => [...newRecords, ...prev])
    toast.success(`Bulk payroll processed for ${newRecords.length} employees`)
  }

  const tabs = [
    { id: 'calculate', label: 'Calculate Payroll', icon: 'Calculator' },
    { id: 'records', label: 'Payroll Records', icon: 'FileText' },
    { id: 'reports', label: 'Reports', icon: 'BarChart3' }
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
                Payroll Management
              </h2>
              <p className="text-surface-600">
                Calculate salaries with Indian tax compliance and generate payslips
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={processAllPayroll}
                className="btn-primary flex items-center justify-center space-x-2"
              >
                <ApperIcon name="Calculator" className="w-5 h-5" />
                <span>Process All</span>
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="btn-secondary flex items-center justify-center space-x-2"
              >
                <ApperIcon name="Download" className="w-5 h-5" />
                <span>Export</span>
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
            { label: 'Total Processed', value: payrollRecords.length.toString(), icon: 'CheckCircle', color: 'from-emerald-500 to-emerald-600' },
            { label: 'This Month', value: payrollRecords.filter(r => r.month === new Date().toLocaleString('en-US', { month: 'long' })).length.toString(), icon: 'Calendar', color: 'from-blue-500 to-blue-600' },
            { label: 'Total Amount', value: '₹' + payrollRecords.reduce((sum, r) => sum + r.netSalary, 0).toLocaleString('en-IN'), icon: 'IndianRupee', color: 'from-purple-500 to-purple-600' },
            { label: 'Pending', value: (employees.length - payrollRecords.filter(r => r.month === new Date().toLocaleString('en-US', { month: 'long' })).length).toString(), icon: 'Clock', color: 'from-amber-500 to-amber-600' }
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
                <div className="text-lg lg:text-xl font-bold text-surface-800">{stat.value}</div>
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
        {activeTab === 'calculate' && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="card-neu p-6 lg:p-8"
          >
            <div className="max-w-4xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <h4 className="text-lg font-semibold text-surface-800">Payroll Calculation</h4>
                  
                  <div>
                    <label className="label-text">Employee</label>
                    <select
                      value={payrollData.employeeId}
                      onChange={(e) => {
                        const selectedEmp = employees.find(emp => emp.id === e.target.value)
                        setPayrollData(prev => ({ 
                          ...prev, 
                          employeeId: e.target.value,
                          basicSalary: selectedEmp?.basicSalary || ''
                        }))
                      }}
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

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="label-text">Month</label>
                      <select
                        value={payrollData.month}
                        onChange={(e) => setPayrollData(prev => ({ ...prev, month: parseInt(e.target.value) }))}
                        className="input-field"
                      >
                        {Array.from({ length: 12 }, (_, i) => (
                          <option key={i + 1} value={i + 1}>
                            {new Date(2024, i).toLocaleString('en-US', { month: 'long' })}
                          </option>
                        ))}
                      </select>
                    </div>
                    
                    <div>
                      <label className="label-text">Year</label>
                      <select
                        value={payrollData.year}
                        onChange={(e) => setPayrollData(prev => ({ ...prev, year: parseInt(e.target.value) }))}
                        className="input-field"
                      >
                        {[2024, 2025].map(year => (
                          <option key={year} value={year}>{year}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="label-text">Basic Salary (Monthly)</label>
                    <input
                      type="number"
                      value={payrollData.basicSalary}
                      onChange={(e) => setPayrollData(prev => ({ ...prev, basicSalary: e.target.value }))}
                      className="input-field"
                      placeholder="Enter basic salary"
                    />
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={calculatePayroll}
                    className="btn-primary w-full flex items-center justify-center space-x-2"
                  >
                    <ApperIcon name="Calculator" className="w-5 h-5" />
                    <span>Calculate & Process</span>
                  </motion.button>
                </div>

                <div className="space-y-6">
                  <h4 className="text-lg font-semibold text-surface-800">Salary Breakdown</h4>
                  
                  {payrollData.basicSalary ? (
                    <div className="space-y-4">
                      <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4">
                        <h5 className="font-medium text-emerald-800 mb-3">Earnings</h5>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-sm">Basic Salary</span>
                            <span className="font-medium">₹{parseFloat(payrollData.basicSalary).toLocaleString('en-IN')}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm">HRA (40%)</span>
                            <span className="font-medium">₹{(parseFloat(payrollData.basicSalary) * 0.4).toLocaleString('en-IN')}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm">DA (10%)</span>
                            <span className="font-medium">₹{(parseFloat(payrollData.basicSalary) * 0.1).toLocaleString('en-IN')}</span>
                          </div>
                          <div className="border-t pt-2">
                            <div className="flex justify-between font-semibold">
                              <span>Gross Salary</span>
                              <span>₹{(parseFloat(payrollData.basicSalary) * 1.5).toLocaleString('en-IN')}</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                        <h5 className="font-medium text-red-800 mb-3">Deductions</h5>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-sm">PF (12%)</span>
                            <span className="font-medium">₹{(parseFloat(payrollData.basicSalary) * 0.12).toLocaleString('en-IN')}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm">ESI (0.75%)</span>
                            <span className="font-medium">₹{(parseFloat(payrollData.basicSalary) * 1.5 * 0.0075).toLocaleString('en-IN')}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm">TDS</span>
                            <span className="font-medium">₹{(parseFloat(payrollData.basicSalary) > 20833 ? parseFloat(payrollData.basicSalary) * 1.5 * 0.1 : 0).toLocaleString('en-IN')}</span>
                          </div>
                        </div>
                      </div>

                      <div className="bg-primary text-white rounded-xl p-4">
                        <div className="flex justify-between items-center">
                          <span className="font-medium">Net Salary</span>
                          <span className="text-xl font-bold">
                            ₹{Math.round(parseFloat(payrollData.basicSalary) * 1.5 - parseFloat(payrollData.basicSalary) * 0.12 - parseFloat(payrollData.basicSalary) * 1.5 * 0.0075 - (parseFloat(payrollData.basicSalary) > 20833 ? parseFloat(payrollData.basicSalary) * 1.5 * 0.1 : 0)).toLocaleString('en-IN')}
                          </span>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <ApperIcon name="Calculator" className="w-16 h-16 mx-auto text-surface-300 mb-4" />
                      <p className="text-surface-500">Enter basic salary to see breakdown</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'records' && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <div className="card-neu p-6">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-surface-200">
                      <th className="text-left py-3 px-4 font-semibold text-surface-700">Employee</th>
                      <th className="text-left py-3 px-4 font-semibold text-surface-700">Period</th>
                      <th className="text-left py-3 px-4 font-semibold text-surface-700">Basic Salary</th>
                      <th className="text-left py-3 px-4 font-semibold text-surface-700">Net Salary</th>
                      <th className="text-left py-3 px-4 font-semibold text-surface-700">Status</th>
                      <th className="text-left py-3 px-4 font-semibold text-surface-700">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {payrollRecords.map((record) => (
                      <tr key={record.id} className="border-b border-surface-100 hover:bg-surface-50">
                        <td className="py-3 px-4">
                          <div>
                            <div className="font-medium text-surface-800">{record.employeeName}</div>
                            <div className="text-sm text-surface-600">{record.employeeId}</div>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <div className="text-surface-800">{record.month} {record.year}</div>
                        </td>
                        <td className="py-3 px-4">
                          <div className="text-surface-800">₹{record.basicSalary.toLocaleString('en-IN')}</div>
                        </td>
                        <td className="py-3 px-4">
                          <div className="font-medium text-secondary">₹{record.netSalary.toLocaleString('en-IN')}</div>
                        </td>
                        <td className="py-3 px-4">
                          <span className="px-2 py-1 text-xs font-medium rounded-full bg-emerald-100 text-emerald-700">
                            {record.status}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex space-x-2">
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => generatePayslip(record)}
                              className="p-2 rounded-lg text-primary hover:bg-primary/10"
                            >
                              <ApperIcon name="FileText" className="w-4 h-4" />
                            </motion.button>
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              className="p-2 rounded-lg text-surface-600 hover:bg-surface-100"
                            >
                              <ApperIcon name="Download" className="w-4 h-4" />
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

        {activeTab === 'reports' && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-6"
          >
            <div className="card-neu p-6">
              <h4 className="text-lg font-semibold text-surface-800 mb-4">Monthly Summary</h4>
              <div className="space-y-4">
                {[
                  { month: 'November 2024', processed: 2, amount: 158950 },
                  { month: 'October 2024', processed: 3, amount: 220000 },
                  { month: 'September 2024', processed: 3, amount: 215000 }
                ].map((summary, index) => (
                  <div key={index} className="flex justify-between items-center p-4 bg-surface-50 rounded-xl">
                    <div>
                      <div className="font-medium text-surface-800">{summary.month}</div>
                      <div className="text-sm text-surface-600">{summary.processed} employees processed</div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-primary">₹{summary.amount.toLocaleString('en-IN')}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="card-neu p-6">
              <h4 className="text-lg font-semibold text-surface-800 mb-4">Department Wise</h4>
              <div className="space-y-4">
                {[
                  { department: 'Development', employees: 1, amount: 65450 },
                  { department: 'Product', employees: 1, amount: 93500 },
                  { department: 'Design', employees: 0, amount: 0 }
                ].map((dept, index) => (
                  <div key={index} className="flex justify-between items-center p-4 bg-surface-50 rounded-xl">
                    <div>
                      <div className="font-medium text-surface-800">{dept.department}</div>
                      <div className="text-sm text-surface-600">{dept.employees} employees</div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-secondary">₹{dept.amount.toLocaleString('en-IN')}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </main>
    </div>
  )
}

export default Payroll