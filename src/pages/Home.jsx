import { useState } from 'react'
import { motion } from 'framer-motion'
import MainFeature from '../components/MainFeature'
import ApperIcon from '../components/ApperIcon'

const Home = () => {
  const [darkMode, setDarkMode] = useState(false)

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
    document.documentElement.classList.toggle('dark')
  }

  const navItems = [
    { icon: 'Users', label: 'Employees', active: true },
    { icon: 'Calculator', label: 'Payroll' },
    { icon: 'Calendar', label: 'Attendance' },
    { icon: 'UserPlus', label: 'Recruitment' },
    { icon: 'Settings', label: 'Settings' }
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
                <motion.button
                  key={item.label}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-xl transition-all duration-200 ${
                    item.active 
                      ? 'bg-primary text-white shadow-card' 
                      : 'text-surface-600 hover:bg-surface-100'
                  }`}
                >
                  <ApperIcon name={item.icon} className="w-4 h-4" />
                  <span className="text-sm font-medium">{item.label}</span>
                </motion.button>
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
                Employee Management
              </h2>
              <p className="text-surface-600">
                Manage your workforce with powerful HR tools designed for Indian IT companies
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="btn-primary flex items-center justify-center space-x-2"
              >
                <ApperIcon name="UserPlus" className="w-5 h-5" />
                <span>Add Employee</span>
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="btn-secondary flex items-center justify-center space-x-2"
              >
                <ApperIcon name="Download" className="w-5 h-5" />
                <span>Export Data</span>
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
            { label: 'Total Employees', value: '248', icon: 'Users', color: 'from-blue-500 to-blue-600' },
            { label: 'Present Today', value: '231', icon: 'CheckCircle', color: 'from-emerald-500 to-emerald-600' },
            { label: 'On Leave', value: '12', icon: 'Calendar', color: 'from-amber-500 to-amber-600' },
            { label: 'New Recruits', value: '5', icon: 'UserPlus', color: 'from-purple-500 to-purple-600' }
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

        {/* Main Feature Component */}
        <MainFeature />
      </main>
    </div>
  )
}

export default Home