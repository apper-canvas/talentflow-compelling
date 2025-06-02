import { useState } from 'react'
import { motion } from 'framer-motion'
import { Link, useLocation } from 'react-router-dom'
import { toast } from 'react-toastify'
import ApperIcon from '../components/ApperIcon'

const Recruitment = () => {
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

  const [activeTab, setActiveTab] = useState('jobs')
  const [jobForm, setJobForm] = useState({
    title: '',
    department: '',
    location: '',
    type: '',
    experience: '',
    salary: '',
    description: ''
  })

  const [jobPostings, setJobPostings] = useState([
    {
      id: 1,
      title: 'Senior React Developer',
      department: 'Development',
      location: 'Bangalore',
      type: 'Full-time',
      experience: '3-5 years',
      salary: '₹8-12 LPA',
      status: 'Active',
      applications: 15,
      postedDate: '2024-11-20'
    },
    {
      id: 2,
      title: 'UI/UX Designer',
      department: 'Design',
      location: 'Mumbai',
      type: 'Full-time', 
      experience: '2-4 years',
      salary: '₹6-9 LPA',
      status: 'Active',
      applications: 8,
      postedDate: '2024-11-18'
    },
    {
      id: 3,
      title: 'Product Manager',
      department: 'Product',
      location: 'Delhi',
      type: 'Full-time',
      experience: '5-8 years',
      salary: '₹15-20 LPA',
      status: 'Draft',
      applications: 0,
      postedDate: '2024-11-25'
    }
  ])

  const [candidates, setCandidates] = useState([
    {
      id: 1,
      name: 'Amit Sharma',
      email: 'amit.sharma@email.com',
      phone: '+91 9876543210',
      position: 'Senior React Developer',
      experience: '4 years',
      skills: ['React', 'Node.js', 'TypeScript', 'MongoDB'],
      status: 'Interview Scheduled',
      applicationDate: '2024-11-22',
      resumeUrl: '#'
    },
    {
      id: 2,
      name: 'Neha Gupta',
      email: 'neha.gupta@email.com',
      phone: '+91 9876543211',
      position: 'UI/UX Designer',
      experience: '3 years',
      skills: ['Figma', 'Adobe XD', 'Prototyping', 'User Research'],
      status: 'Under Review',
      applicationDate: '2024-11-21',
      resumeUrl: '#'
    },
    {
      id: 3,
      name: 'Rohit Singh',
      email: 'rohit.singh@email.com',
      phone: '+91 9876543212',
      position: 'Senior React Developer',
      experience: '5 years',
      skills: ['React', 'Vue.js', 'Python', 'AWS'],
      status: 'Offer Extended',
      applicationDate: '2024-11-20',
      resumeUrl: '#'
    }
  ])

  const [interviews, setInterviews] = useState([
    {
      id: 1,
      candidateId: 1,
      candidateName: 'Amit Sharma',
      position: 'Senior React Developer',
      interviewer: 'Rajesh Kumar',
      date: '2024-11-28',
      time: '10:00 AM',
      type: 'Technical',
      status: 'Scheduled'
    },
    {
      id: 2,
      candidateId: 2,
      candidateName: 'Neha Gupta',
      position: 'UI/UX Designer',
      interviewer: 'Priya Sharma',
      date: '2024-11-27',
      time: '2:00 PM',
      type: 'Portfolio Review',
      status: 'Completed'
    }
  ])

  const createJobPosting = () => {
    if (!jobForm.title || !jobForm.department || !jobForm.location) {
      toast.error('Please fill in all required fields')
      return
    }

    const newJob = {
      id: jobPostings.length + 1,
      ...jobForm,
      status: 'Active',
      applications: 0,
      postedDate: new Date().toISOString().split('T')[0]
    }

    setJobPostings(prev => [newJob, ...prev])
    toast.success('Job posting created successfully')
    
    setJobForm({
      title: '',
      department: '',
      location: '',
      type: '',
      experience: '',
      salary: '',
      description: ''
    })
  }

  const updateJobStatus = (id, status) => {
    setJobPostings(prev => 
      prev.map(job => 
        job.id === id ? { ...job, status } : job
      )
    )
    toast.success(`Job posting ${status.toLowerCase()}`)
  }

  const updateCandidateStatus = (id, status) => {
    setCandidates(prev => 
      prev.map(candidate => 
        candidate.id === id ? { ...candidate, status } : candidate
      )
    )
    toast.success(`Candidate status updated to ${status}`)
  }

  const scheduleInterview = (candidate) => {
    const newInterview = {
      id: interviews.length + 1,
      candidateId: candidate.id,
      candidateName: candidate.name,
      position: candidate.position,
      interviewer: 'TBD',
      date: '',
      time: '',
      type: 'Technical',
      status: 'Scheduled'
    }
    
    setInterviews(prev => [newInterview, ...prev])
    updateCandidateStatus(candidate.id, 'Interview Scheduled')
    toast.success('Interview scheduled successfully')
  }

  const tabs = [
    { id: 'jobs', label: 'Job Postings', icon: 'Briefcase' },
    { id: 'candidates', label: 'Candidates', icon: 'Users' },
    { id: 'interviews', label: 'Interviews', icon: 'Calendar' },
    { id: 'onboarding', label: 'Onboarding', icon: 'UserCheck' }
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
                Recruitment & Hiring
              </h2>
              <p className="text-surface-600">
                Manage job postings, candidates, and streamline your hiring process
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="btn-primary flex items-center justify-center space-x-2"
              >
                <ApperIcon name="Plus" className="w-5 h-5" />
                <span>Post Job</span>
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="btn-secondary flex items-center justify-center space-x-2"
              >
                <ApperIcon name="Download" className="w-5 h-5" />
                <span>Export Report</span>
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
            { label: 'Active Jobs', value: jobPostings.filter(j => j.status === 'Active').length.toString(), icon: 'Briefcase', color: 'from-blue-500 to-blue-600' },
            { label: 'Total Applications', value: jobPostings.reduce((sum, job) => sum + job.applications, 0).toString(), icon: 'FileText', color: 'from-emerald-500 to-emerald-600' },
            { label: 'Interviews Scheduled', value: interviews.filter(i => i.status === 'Scheduled').length.toString(), icon: 'Calendar', color: 'from-purple-500 to-purple-600' },
            { label: 'Offers Extended', value: candidates.filter(c => c.status === 'Offer Extended').length.toString(), icon: 'Award', color: 'from-amber-500 to-amber-600' }
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
                <span className="font-medium text-sm">{tab.label}</span>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === 'jobs' && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="card-neu p-6 lg:p-8">
                <h4 className="text-lg font-semibold text-surface-800 mb-6">Create Job Posting</h4>
                
                <div className="space-y-4">
                  <div>
                    <label className="label-text">Job Title *</label>
                    <input
                      type="text"
                      value={jobForm.title}
                      onChange={(e) => setJobForm(prev => ({ ...prev, title: e.target.value }))}
                      className="input-field"
                      placeholder="e.g. Senior React Developer"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="label-text">Department *</label>
                      <select
                        value={jobForm.department}
                        onChange={(e) => setJobForm(prev => ({ ...prev, department: e.target.value }))}
                        className="input-field"
                      >
                        <option value="">Select Department</option>
                        <option value="Development">Development</option>
                        <option value="Design">Design</option>
                        <option value="Product">Product</option>
                        <option value="Marketing">Marketing</option>
                        <option value="HR">HR</option>
                        <option value="Finance">Finance</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="label-text">Location *</label>
                      <select
                        value={jobForm.location}
                        onChange={(e) => setJobForm(prev => ({ ...prev, location: e.target.value }))}
                        className="input-field"
                      >
                        <option value="">Select Location</option>
                        <option value="Bangalore">Bangalore</option>
                        <option value="Mumbai">Mumbai</option>
                        <option value="Delhi">Delhi</option>
                        <option value="Hyderabad">Hyderabad</option>
                        <option value="Remote">Remote</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="label-text">Job Type</label>
                      <select
                        value={jobForm.type}
                        onChange={(e) => setJobForm(prev => ({ ...prev, type: e.target.value }))}
                        className="input-field"
                      >
                        <option value="">Select Type</option>
                        <option value="Full-time">Full-time</option>
                        <option value="Part-time">Part-time</option>
                        <option value="Contract">Contract</option>
                        <option value="Internship">Internship</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="label-text">Experience</label>
                      <input
                        type="text"
                        value={jobForm.experience}
                        onChange={(e) => setJobForm(prev => ({ ...prev, experience: e.target.value }))}
                        className="input-field"
                        placeholder="e.g. 3-5 years"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="label-text">Salary Range</label>
                    <input
                      type="text"
                      value={jobForm.salary}
                      onChange={(e) => setJobForm(prev => ({ ...prev, salary: e.target.value }))}
                      className="input-field"
                      placeholder="e.g. ₹8-12 LPA"
                    />
                  </div>

                  <div>
                    <label className="label-text">Job Description</label>
                    <textarea
                      value={jobForm.description}
                      onChange={(e) => setJobForm(prev => ({ ...prev, description: e.target.value }))}
                      className="input-field"
                      rows="4"
                      placeholder="Enter job description, requirements, and responsibilities"
                    />
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={createJobPosting}
                    className="btn-primary w-full flex items-center justify-center space-x-2"
                  >
                    <ApperIcon name="Plus" className="w-5 h-5" />
                    <span>Create Job Posting</span>
                  </motion.button>
                </div>
              </div>

              <div className="card-neu p-6 lg:p-8">
                <h4 className="text-lg font-semibold text-surface-800 mb-6">Hiring Pipeline</h4>
                
                <div className="space-y-4">
                  {[
                    { stage: 'Applications Received', count: 23, color: 'bg-blue-100 text-blue-700' },
                    { stage: 'Phone Screening', count: 12, color: 'bg-purple-100 text-purple-700' },
                    { stage: 'Technical Interview', count: 8, color: 'bg-amber-100 text-amber-700' },
                    { stage: 'Final Round', count: 3, color: 'bg-emerald-100 text-emerald-700' },
                    { stage: 'Offer Extended', count: 1, color: 'bg-green-100 text-green-700' }
                  ].map((stage, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-surface-50 rounded-xl">
                      <div>
                        <div className="font-medium text-surface-800">{stage.stage}</div>
                        <div className="text-sm text-surface-600">Active candidates in this stage</div>
                      </div>
                      <div className={`px-3 py-1 rounded-full text-sm font-medium ${stage.color}`}>
                        {stage.count}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="card-neu p-6">
              <h4 className="text-lg font-semibold text-surface-800 mb-6">Job Postings</h4>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {jobPostings.map((job) => (
                  <motion.div
                    key={job.id}
                    whileHover={{ y: -5 }}
                    className="card-neu p-6"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h5 className="font-semibold text-surface-800">{job.title}</h5>
                        <p className="text-sm text-surface-600">{job.department}</p>
                      </div>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                        job.status === 'Active' 
                          ? 'bg-emerald-100 text-emerald-700'
                          : 'bg-amber-100 text-amber-700'
                      }`}>
                        {job.status}
                      </span>
                    </div>

                    <div className="space-y-2 mb-4">
                      <div className="flex items-center space-x-2">
                        <ApperIcon name="MapPin" className="w-4 h-4 text-surface-400" />
                        <span className="text-sm text-surface-600">{job.location}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <ApperIcon name="Clock" className="w-4 h-4 text-surface-400" />
                        <span className="text-sm text-surface-600">{job.type}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <ApperIcon name="Briefcase" className="w-4 h-4 text-surface-400" />
                        <span className="text-sm text-surface-600">{job.experience}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <ApperIcon name="IndianRupee" className="w-4 h-4 text-surface-400" />
                        <span className="text-sm font-medium text-secondary">{job.salary}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-surface-200">
                      <div className="text-sm text-surface-600">
                        {job.applications} applications
                      </div>
                      <div className="flex space-x-2">
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="p-2 rounded-lg text-primary hover:bg-primary/10"
                        >
                          <ApperIcon name="Eye" className="w-4 h-4" />
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => updateJobStatus(job.id, job.status === 'Active' ? 'Paused' : 'Active')}
                          className="p-2 rounded-lg text-surface-600 hover:bg-surface-100"
                        >
                          <ApperIcon name={job.status === 'Active' ? 'Pause' : 'Play'} className="w-4 h-4" />
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'candidates' && (
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
                      <th className="text-left py-3 px-4 font-semibold text-surface-700">Candidate</th>
                      <th className="text-left py-3 px-4 font-semibold text-surface-700">Position</th>
                      <th className="text-left py-3 px-4 font-semibold text-surface-700">Experience</th>
                      <th className="text-left py-3 px-4 font-semibold text-surface-700">Skills</th>
                      <th className="text-left py-3 px-4 font-semibold text-surface-700">Status</th>
                      <th className="text-left py-3 px-4 font-semibold text-surface-700">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {candidates.map((candidate) => (
                      <tr key={candidate.id} className="border-b border-surface-100 hover:bg-surface-50">
                        <td className="py-3 px-4">
                          <div>
                            <div className="font-medium text-surface-800">{candidate.name}</div>
                            <div className="text-sm text-surface-600">{candidate.email}</div>
                            <div className="text-sm text-surface-600">{candidate.phone}</div>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <div className="text-surface-800">{candidate.position}</div>
                        </td>
                        <td className="py-3 px-4">
                          <div className="text-surface-800">{candidate.experience}</div>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex flex-wrap gap-1">
                            {candidate.skills.slice(0, 3).map((skill, index) => (
                              <span key={index} className="px-2 py-1 text-xs bg-primary/10 text-primary rounded-full">
                                {skill}
                              </span>
                            ))}
                            {candidate.skills.length > 3 && (
                              <span className="px-2 py-1 text-xs bg-surface-100 text-surface-600 rounded-full">
                                +{candidate.skills.length - 3}
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                            candidate.status === 'Offer Extended' 
                              ? 'bg-emerald-100 text-emerald-700'
                              : candidate.status === 'Interview Scheduled'
                              ? 'bg-blue-100 text-blue-700'
                              : 'bg-amber-100 text-amber-700'
                          }`}>
                            {candidate.status}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex space-x-2">
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              className="p-2 rounded-lg text-primary hover:bg-primary/10"
                            >
                              <ApperIcon name="Eye" className="w-4 h-4" />
                            </motion.button>
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => scheduleInterview(candidate)}
                              className="p-2 rounded-lg text-blue-600 hover:bg-blue-50"
                            >
                              <ApperIcon name="Calendar" className="w-4 h-4" />
                            </motion.button>
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => updateCandidateStatus(candidate.id, 'Offer Extended')}
                              className="p-2 rounded-lg text-emerald-600 hover:bg-emerald-50"
                            >
                              <ApperIcon name="Check" className="w-4 h-4" />
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

        {activeTab === 'interviews' && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <div className="card-neu p-6">
              <h4 className="text-lg font-semibold text-surface-800 mb-6">Interview Schedule</h4>
              
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-surface-200">
                      <th className="text-left py-3 px-4 font-semibold text-surface-700">Candidate</th>
                      <th className="text-left py-3 px-4 font-semibold text-surface-700">Position</th>
                      <th className="text-left py-3 px-4 font-semibold text-surface-700">Interviewer</th>
                      <th className="text-left py-3 px-4 font-semibold text-surface-700">Date & Time</th>
                      <th className="text-left py-3 px-4 font-semibold text-surface-700">Type</th>
                      <th className="text-left py-3 px-4 font-semibold text-surface-700">Status</th>
                      <th className="text-left py-3 px-4 font-semibold text-surface-700">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {interviews.map((interview) => (
                      <tr key={interview.id} className="border-b border-surface-100 hover:bg-surface-50">
                        <td className="py-3 px-4">
                          <div className="font-medium text-surface-800">{interview.candidateName}</div>
                        </td>
                        <td className="py-3 px-4">
                          <div className="text-surface-800">{interview.position}</div>
                        </td>
                        <td className="py-3 px-4">
                          <div className="text-surface-800">{interview.interviewer}</div>
                        </td>
                        <td className="py-3 px-4">
                          <div className="text-surface-800">
                            {interview.date && new Date(interview.date).toLocaleDateString('en-IN')}
                            {interview.time && `, ${interview.time}`}
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <div className="text-surface-800">{interview.type}</div>
                        </td>
                        <td className="py-3 px-4">
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                            interview.status === 'Completed' 
                              ? 'bg-emerald-100 text-emerald-700'
                              : interview.status === 'Scheduled'
                              ? 'bg-blue-100 text-blue-700'
                              : 'bg-amber-100 text-amber-700'
                          }`}>
                            {interview.status}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex space-x-2">
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              className="p-2 rounded-lg text-primary hover:bg-primary/10"
                            >
                              <ApperIcon name="Edit" className="w-4 h-4" />
                            </motion.button>
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              className="p-2 rounded-lg text-emerald-600 hover:bg-emerald-50"
                            >
                              <ApperIcon name="Video" className="w-4 h-4" />
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

        {activeTab === 'onboarding' && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="card-neu p-6">
                <h4 className="text-lg font-semibold text-surface-800 mb-6">Onboarding Checklist</h4>
                
                <div className="space-y-4">
                  {[
                    { task: 'Document Verification', completed: true },
                    { task: 'IT Equipment Assignment', completed: true },
                    { task: 'Office Tour & Introduction', completed: false },
                    { task: 'HR Orientation Session', completed: false },
                    { task: 'Department Introduction', completed: false },
                    { task: 'Project Assignment', completed: false }
                  ].map((item, index) => (
                    <div key={index} className="flex items-center space-x-3 p-3 bg-surface-50 rounded-xl">
                      <div className={`w-5 h-5 rounded-full flex items-center justify-center ${
                        item.completed ? 'bg-emerald-500' : 'bg-surface-300'
                      }`}>
                        {item.completed && <ApperIcon name="Check" className="w-3 h-3 text-white" />}
                      </div>
                      <span className={`flex-1 ${item.completed ? 'text-surface-600 line-through' : 'text-surface-800'}`}>
                        {item.task}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="card-neu p-6">
                <h4 className="text-lg font-semibold text-surface-800 mb-6">New Hires</h4>
                
                <div className="space-y-4">
                  {[
                    { name: 'Rohit Singh', position: 'Senior React Developer', startDate: '2024-12-01', progress: 30 },
                    { name: 'Ankita Verma', position: 'Product Designer', startDate: '2024-12-15', progress: 0 }
                  ].map((hire, index) => (
                    <div key={index} className="p-4 bg-surface-50 rounded-xl">
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <div className="font-medium text-surface-800">{hire.name}</div>
                          <div className="text-sm text-surface-600">{hire.position}</div>
                        </div>
                        <div className="text-sm text-surface-600">
                          Start: {new Date(hire.startDate).toLocaleDateString('en-IN')}
                        </div>
                      </div>
                      <div className="w-full bg-surface-200 rounded-full h-2">
                        <div 
                          className="bg-primary h-2 rounded-full transition-all duration-300"
                          style={{ width: `${hire.progress}%` }}
                        />
                      </div>
                      <div className="text-xs text-surface-600 mt-1">{hire.progress}% Complete</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </main>
    </div>
  )
}

export default Recruitment