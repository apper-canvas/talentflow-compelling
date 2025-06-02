import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { toast } from 'react-toastify'
import ApperIcon from './ApperIcon'

const MainFeature = () => {
  const [activeTab, setActiveTab] = useState('directory')
  const [employees, setEmployees] = useState([
    {
      id: 'EMP001',
      name: 'Rajesh Kumar',
      designation: 'Senior Software Engineer',
      department: 'Development',
      email: 'rajesh.kumar@company.com',
      phone: '+91 9876543210',
      salary: 850000,
      experience: '5 years',
      status: 'Active',
      joinDate: '2019-03-15'
    },
    {
      id: 'EMP002',
      name: 'Priya Sharma',
      designation: 'Product Manager',
      department: 'Product',
      email: 'priya.sharma@company.com',
      phone: '+91 9876543211',
      salary: 1200000,
      experience: '7 years',
      status: 'Active',
      joinDate: '2018-07-22'
    },
    {
      id: 'EMP003',
      name: 'Arjun Patel',
      designation: 'UI/UX Designer',
      department: 'Design',
      email: 'arjun.patel@company.com',
      phone: '+91 9876543212',
      salary: 650000,
      experience: '3 years',
      status: 'Active',
      joinDate: '2021-01-10'
    }
  ])

  const [payrollData, setPayrollData] = useState({
    employeeId: '',
    basicSalary: '',
    hra: '',
    da: '',
    pf: '',
    esi: '',
    tds: ''
  })

  const [newEmployee, setNewEmployee] = useState({
    name: '',
    designation: '',
    department: '',
    email: '',
    phone: '',
    salary: '',
    experience: ''
  })

  const [searchTerm, setSearchTerm] = useState('')
  const [selectedDepartment, setSelectedDepartment] = useState('All')

  const departments = ['All', 'Development', 'Product', 'Design', 'Marketing', 'HR', 'Finance']

  const calculatePayroll = () => {
    const basic = parseFloat(payrollData.basicSalary) || 0
    const hra = basic * 0.4 // 40% of basic
    const da = basic * 0.1 // 10% of basic
    const grossSalary = basic + hra + da
    
    const pf = basic * 0.12 // 12% of basic
    const esi = grossSalary * 0.0075 // 0.75% of gross (if gross < 21000)
    const tds = grossSalary > 250000 ? grossSalary * 0.1 : 0 // 10% if annual > 2.5L
    
    const totalDeductions = pf + (grossSalary < 21000 ? esi : 0) + tds
    const netSalary = grossSalary - totalDeductions

    setPayrollData(prev => ({
      ...prev,
      hra: hra.toFixed(2),
      da: da.toFixed(2),
      pf: pf.toFixed(2),
      esi: esi.toFixed(2),
      tds: tds.toFixed(2)
    }))

    toast.success(`Payroll calculated! Net Salary: ₹${netSalary.toLocaleString('en-IN')}`)
  }

  const addEmployee = () => {
    if (!newEmployee.name || !newEmployee.email || !newEmployee.designation) {
      toast.error('Please fill in all required fields')
      return
    }

    const employee = {
      id: `EMP${String(employees.length + 1).padStart(3, '0')}`,
      ...newEmployee,
      status: 'Active',
      joinDate: new Date().toISOString().split('T')[0]
    }

    setEmployees(prev => [...prev, employee])
    setNewEmployee({
      name: '',
      designation: '',
      department: '',
      email: '',
      phone: '',
      salary: '',
      experience: ''
    })
    toast.success('Employee added successfully!')
  }

  const deleteEmployee = (id) => {
    setEmployees(prev => prev.filter(emp => emp.id !== id))
    toast.success('Employee removed successfully!')
  }

  const filteredEmployees = employees.filter(emp => {
    const matchesSearch = emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         emp.designation.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         emp.department.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesDepartment = selectedDepartment === 'All' || emp.department === selectedDepartment
    return matchesSearch && matchesDepartment
  })

  const tabs = [
    { id: 'directory', label: 'Employee Directory', icon: 'Users' },
    { id: 'payroll', label: 'Payroll Calculator', icon: 'Calculator' },
    { id: 'add-employee', label: 'Add Employee', icon: 'UserPlus' }
  ]

  return (
    <div className="space-y-6">
      {/* Tab Navigation */}
      <div className="card-neu p-2">
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
              <span className="font-medium hidden sm:inline">{tab.label}</span>
              <span className="font-medium sm:hidden">{tab.label.split(' ')[0]}</span>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <AnimatePresence mode="wait">
        {activeTab === 'directory' && (
          <motion.div
            key="directory"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            {/* Search and Filter */}
            <div className="card-neu p-4 lg:p-6">
              <div className="flex flex-col lg:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <ApperIcon name="Search" className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-surface-400" />
                    <input
                      type="text"
                      placeholder="Search employees..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="input-field pl-10"
                    />
                  </div>
                </div>
                <div className="lg:w-48">
                  <select
                    value={selectedDepartment}
                    onChange={(e) => setSelectedDepartment(e.target.value)}
                    className="input-field"
                  >
                    {departments.map(dept => (
                      <option key={dept} value={dept}>{dept}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Employee Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredEmployees.map((employee) => (
                <motion.div
                  key={employee.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  whileHover={{ y: -5 }}
                  className="card-neu p-6"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center">
                        <span className="text-white font-bold text-lg">
                          {employee.name.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <h3 className="font-semibold text-surface-800">{employee.name}</h3>
                        <p className="text-sm text-surface-600">{employee.id}</p>
                      </div>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => deleteEmployee(employee.id)}
                      className="p-2 rounded-lg text-red-500 hover:bg-red-50"
                    >
                      <ApperIcon name="Trash2" className="w-4 h-4" />
                    </motion.button>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <ApperIcon name="Briefcase" className="w-4 h-4 text-surface-400" />
                      <span className="text-sm text-surface-600">{employee.designation}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <ApperIcon name="Building" className="w-4 h-4 text-surface-400" />
                      <span className="text-sm text-surface-600">{employee.department}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <ApperIcon name="Mail" className="w-4 h-4 text-surface-400" />
                      <span className="text-sm text-surface-600 truncate">{employee.email}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <ApperIcon name="Phone" className="w-4 h-4 text-surface-400" />
                      <span className="text-sm text-surface-600">{employee.phone}</span>
                    </div>
                    {employee.salary && (
                      <div className="flex items-center space-x-2">
                        <ApperIcon name="IndianRupee" className="w-4 h-4 text-surface-400" />
                        <span className="text-sm font-medium text-secondary">
                          ₹{parseInt(employee.salary).toLocaleString('en-IN')}/year
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="mt-4 pt-4 border-t border-surface-200">
                    <div className="flex items-center justify-between">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                        employee.status === 'Active' 
                          ? 'bg-emerald-100 text-emerald-700' 
                          : 'bg-red-100 text-red-700'
                      }`}>
                        {employee.status}
                      </span>
                      <span className="text-xs text-surface-500">
                        Joined: {new Date(employee.joinDate).toLocaleDateString('en-IN')}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {activeTab === 'payroll' && (
          <motion.div
            key="payroll"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="card-neu p-6 lg:p-8"
          >
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-surface-800 mb-2">Payroll Calculator</h3>
                <p className="text-surface-600">Calculate salary with Indian tax compliance</p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Input Form */}
                <div className="space-y-6">
                  <h4 className="text-lg font-semibold text-surface-800">Salary Components</h4>
                  
                  <div>
                    <label className="label-text">Employee ID</label>
                    <select
                      value={payrollData.employeeId}
                      onChange={(e) => setPayrollData(prev => ({ ...prev, employeeId: e.target.value }))}
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
                    <span>Calculate Payroll</span>
                  </motion.button>
                </div>

                {/* Results */}
                <div className="space-y-6">
                  <h4 className="text-lg font-semibold text-surface-800">Calculation Results</h4>
                  
                  <div className="space-y-4">
                    <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4">
                      <h5 className="font-medium text-emerald-800 mb-3">Allowances</h5>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm">HRA (40%)</span>
                          <span className="font-medium">₹{payrollData.hra || '0'}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm">DA (10%)</span>
                          <span className="font-medium">₹{payrollData.da || '0'}</span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                      <h5 className="font-medium text-red-800 mb-3">Deductions</h5>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm">PF (12%)</span>
                          <span className="font-medium">₹{payrollData.pf || '0'}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm">ESI (0.75%)</span>
                          <span className="font-medium">₹{payrollData.esi || '0'}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm">TDS (10%)</span>
                          <span className="font-medium">₹{payrollData.tds || '0'}</span>
                        </div>
                      </div>
                    </div>

                    {payrollData.basicSalary && (
                      <div className="bg-primary text-white rounded-xl p-4">
                        <div className="flex justify-between items-center">
                          <span className="font-medium">Net Salary</span>
                          <span className="text-xl font-bold">
                            ₹{(
                              parseFloat(payrollData.basicSalary) + 
                              parseFloat(payrollData.hra || 0) + 
                              parseFloat(payrollData.da || 0) - 
                              parseFloat(payrollData.pf || 0) - 
                              parseFloat(payrollData.esi || 0) - 
                              parseFloat(payrollData.tds || 0)
                            ).toLocaleString('en-IN')}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'add-employee' && (
          <motion.div
            key="add-employee"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="card-neu p-6 lg:p-8"
          >
            <div className="max-w-2xl mx-auto">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-surface-800 mb-2">Add New Employee</h3>
                <p className="text-surface-600">Complete the form to onboard a new team member</p>
              </div>

              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="label-text">Full Name *</label>
                    <input
                      type="text"
                      value={newEmployee.name}
                      onChange={(e) => setNewEmployee(prev => ({ ...prev, name: e.target.value }))}
                      className="input-field"
                      placeholder="Enter full name"
                    />
                  </div>

                  <div>
                    <label className="label-text">Designation *</label>
                    <input
                      type="text"
                      value={newEmployee.designation}
                      onChange={(e) => setNewEmployee(prev => ({ ...prev, designation: e.target.value }))}
                      className="input-field"
                      placeholder="e.g. Software Engineer"
                    />
                  </div>

                  <div>
                    <label className="label-text">Department</label>
                    <select
                      value={newEmployee.department}
                      onChange={(e) => setNewEmployee(prev => ({ ...prev, department: e.target.value }))}
                      className="input-field"
                    >
                      <option value="">Select Department</option>
                      {departments.filter(d => d !== 'All').map(dept => (
                        <option key={dept} value={dept}>{dept}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="label-text">Experience</label>
                    <input
                      type="text"
                      value={newEmployee.experience}
                      onChange={(e) => setNewEmployee(prev => ({ ...prev, experience: e.target.value }))}
                      className="input-field"
                      placeholder="e.g. 3 years"
                    />
                  </div>

                  <div>
                    <label className="label-text">Email *</label>
                    <input
                      type="email"
                      value={newEmployee.email}
                      onChange={(e) => setNewEmployee(prev => ({ ...prev, email: e.target.value }))}
                      className="input-field"
                      placeholder="email@company.com"
                    />
                  </div>

                  <div>
                    <label className="label-text">Phone</label>
                    <input
                      type="tel"
                      value={newEmployee.phone}
                      onChange={(e) => setNewEmployee(prev => ({ ...prev, phone: e.target.value }))}
                      className="input-field"
                      placeholder="+91 9876543210"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="label-text">Annual Salary (₹)</label>
                    <input
                      type="number"
                      value={newEmployee.salary}
                      onChange={(e) => setNewEmployee(prev => ({ ...prev, salary: e.target.value }))}
                      className="input-field"
                      placeholder="Enter annual salary"
                    />
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 pt-6">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={addEmployee}
                    className="btn-primary flex items-center justify-center space-x-2 flex-1"
                  >
                    <ApperIcon name="UserPlus" className="w-5 h-5" />
                    <span>Add Employee</span>
                  </motion.button>
                  
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setNewEmployee({
                      name: '',
                      designation: '',
                      department: '',
                      email: '',
                      phone: '',
                      salary: '',
                      experience: ''
                    })}
                    className="btn-secondary flex items-center justify-center space-x-2"
                  >
                    <ApperIcon name="RotateCcw" className="w-5 h-5" />
                    <span>Reset</span>
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default MainFeature