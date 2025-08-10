import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  User,
  LogOut,
  Plus,
  Edit3,
  Trash2,
  Briefcase,
  MapPin,
  Calendar,
  AlertCircle,
  Loader2,
  TrendingUp,
} from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { apiService } from '../services/api';
import type { Job, JobCreate, JobUpdate } from '../types';
import JobModal from './JobModal';
import ConfirmationModal from './ConfirmationModal';

const Dashboard: React.FC = () => {
  const { user, logout } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingJob, setEditingJob] = useState<Job | null>(null);
  const [deletingJobId, setDeletingJobId] = useState<number | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>('All');

  const queryClient = useQueryClient();

  const {
    data: jobs = [],
    isLoading,
    isError,
    error,
  } = useQuery<Job[], Error>({
    queryKey: ['jobs', statusFilter],
    queryFn: () =>
      apiService.getJobs(statusFilter === 'All' ? undefined : statusFilter),
  });

  const deleteJobMutation = useMutation({
    mutationFn: apiService.deleteJob,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['jobs'] });
    },
  });

  const createJobMutation = useMutation({
    mutationFn: apiService.createJob,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['jobs'] });
      setIsModalOpen(false);
    },
  });

  const updateJobMutation = useMutation({
    mutationFn: (variables: { jobId: number; jobData: JobUpdate }) =>
      apiService.updateJob(variables.jobId, variables.jobData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['jobs'] });
      setIsModalOpen(false);
    },
  });

  const handleSaveJob = (jobData: JobCreate | JobUpdate) => {
    if (editingJob) {
      updateJobMutation.mutate({ jobId: editingJob.id, jobData });
    } else {
      createJobMutation.mutate(jobData as JobCreate);
    }
  };

  const handleDeleteConfirm = () => {
    if (deletingJobId !== null) {
      deleteJobMutation.mutate(deletingJobId);
      setDeletingJobId(null);
    }
  };

  const getStatusColor = (status: string) => {
    const colors: { [key: string]: string } = {
      Applied:
        'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300',
      Interviewing:
        'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300',
      Offer:
        'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300',
      Rejected: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300',
    };
    return colors[status] || colors['Applied'];
  };

  // --- FIX: This function now correctly uses the 'jobs' data from useQuery ---
  const getJobStats = () => {
    const stats = jobs.reduce(
      (acc, job) => {
        acc[job.status] = (acc[job.status] || 0) + 1;
        return acc;
      },
      {} as Record<string, number>
    );

    return {
      total: jobs.length,
      applied: stats['Applied'] || 0,
      interviewing: stats['Interviewing'] || 0,
      offers: stats['Offer'] || 0,
      rejected: stats['Rejected'] || 0,
    };
  };

  // Call the function to get the stats object
  const stats = getJobStats();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-12 w-12 animate-spin text-blue-500" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <AlertCircle className="h-12 w-12 text-red-500" />
        <p className="mt-4 text-red-600">
          Error fetching data: {error.message}
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 space-y-8">
      {/* Header */}
      <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
            Dashboard
          </h1>
          <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400 mt-1">
            <User className="h-4 w-4" />
            <span>Welcome, {user?.firstName}</span>
          </div>
        </div>
        <button
          onClick={logout}
          className="px-6 py-3 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl border border-gray-200 dark:border-gray-700 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center space-x-2 transition-all duration-200 hover:scale-105 shadow-lg"
        >
          <LogOut className="h-4 w-4" />
          <span>Logout</span>
        </button>
      </header>

      {/* Stats Cards - This JSX now uses the 'stats' object correctly */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl rounded-2xl p-6 shadow-xl border border-gray-200/50 dark:border-gray-700/50">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Total Applications
              </p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">
                {stats.total}
              </p>
            </div>
            <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-xl">
              <Briefcase className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
        </div>
        <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl rounded-2xl p-6 shadow-xl border border-gray-200/50 dark:border-gray-700/50">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Interviewing
              </p>
              <p className="text-3xl font-bold text-yellow-600 dark:text-yellow-400">
                {stats.interviewing}
              </p>
            </div>
            <div className="p-3 bg-yellow-100 dark:bg-yellow-900/30 rounded-xl">
              <User className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
            </div>
          </div>
        </div>
        <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl rounded-2xl p-6 shadow-xl border border-gray-200/50 dark:border-gray-700/50">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Offers
              </p>
              <p className="text-3xl font-bold text-green-600 dark:text-green-400">
                {stats.offers}
              </p>
            </div>
            <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-xl">
              <TrendingUp className="h-6 w-6 text-green-600 dark:text-green-400" />
            </div>
          </div>
        </div>
        <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl rounded-2xl p-6 shadow-xl border border-gray-200/50 dark:border-gray-700/50">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Rejected
              </p>
              <p className="text-3xl font-bold text-red-600 dark:text-red-400">
                {stats.rejected}
              </p>
            </div>
            <div className="p-3 bg-red-100 dark:bg-red-900/30 rounded-xl">
              <TrendingUp className="h-6 w-6 text-red-600 dark:text-red-400" />
            </div>
          </div>
        </div>
      </div>

      {/* Jobs Table */}
      <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl rounded-2xl shadow-xl border border-gray-200/50 dark:border-gray-700/50 overflow-hidden">
        <div className="p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0 border-b border-gray-200 dark:border-gray-700">
          <div>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
              Job Applications
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Track and manage your applications
            </p>
          </div>

          <div className="flex items-center space-x-4">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-3 text-sm font-medium bg-gray-50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            >
              <option value="All">All</option>
              <option value="Applied">Applied</option>
              <option value="Interviewing">Interviewing</option>
              <option value="Offer">Offer</option>
              <option value="Rejected">Rejected</option>
            </select>
          </div>

          <button
            onClick={() => {
              setEditingJob(null);
              setIsModalOpen(true);
            }}
            className="px-6 py-3 text-sm font-medium text-white bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl hover:from-blue-600 hover:to-purple-700 flex items-center space-x-2 transition-all duration-200 hover:scale-105 shadow-lg"
          >
            <Plus className="h-4 w-4" />
            <span>Add Application</span>
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-gray-50/50 dark:bg-gray-700/50">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white">
                  Company
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white">
                  Position
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white">
                  Date Applied
                </th>
                <th className="px-6 py-4 text-right text-sm font-semibold text-gray-900 dark:text-white">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {jobs.length > 0 ? (
                jobs.map((job) => (
                  <tr
                    key={job.id}
                    className="hover:bg-gray-50/50 dark:hover:bg-gray-700/30 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="font-semibold text-gray-900 dark:text-white">
                        {job.company}
                      </div>
                      {job.location && (
                        <div className="flex items-center space-x-1 text-gray-600 dark:text-gray-400 text-sm">
                          <MapPin className="h-4 w-4" />
                          <span>{job.location}</span>
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 text-gray-700 dark:text-gray-300">
                      {job.title}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full ${getStatusColor(job.status)}`}
                      >
                        {job.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-1 text-gray-600 dark:text-gray-400">
                        <Calendar className="h-4 w-4" />
                        <span className="text-sm">
                          {new Date(job.date_applied).toLocaleDateString()}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end space-x-2">
                        <button
                          onClick={() => {
                            setEditingJob(job);
                            setIsModalOpen(true);
                          }}
                          className="p-2 text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all"
                          aria-label="Edit job"
                        >
                          <Edit3 className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => setDeletingJobId(job.id)}
                          className="p-2 text-gray-500 hover:text-red-600 dark:text-gray-400 dark:hover:text-red-400 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-all"
                          aria-label="Delete job"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="text-center py-16">
                    <div className="space-y-4">
                      <Briefcase className="h-12 w-12 text-gray-400 mx-auto" />
                      <div>
                        <p className="text-lg font-medium text-gray-900 dark:text-white">
                          No applications yet
                        </p>
                        <p className="text-gray-600 dark:text-gray-400 mt-1">
                          Start by adding your first job application!
                        </p>
                      </div>
                      <button
                        onClick={() => {
                          setEditingJob(null);
                          setIsModalOpen(true);
                        }}
                        className="mt-4 px-6 py-3 text-sm font-medium text-white bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl hover:from-blue-600 hover:to-purple-700 flex items-center space-x-2 mx-auto transition-all duration-200 hover:scale-105 shadow-lg"
                      >
                        <Plus className="h-4 w-4" />
                        <span>Add Your First Application</span>
                      </button>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modals */}
      {isModalOpen && (
        <JobModal
          job={editingJob}
          onClose={() => setIsModalOpen(false)}
          // Pass the form data directly to the mutation
          onSave={handleSaveJob}
          // Pass down the loading state from the mutations
          isLoading={createJobMutation.isPending || updateJobMutation.isPending}
        />
      )}

      <ConfirmationModal
        isOpen={deletingJobId !== null}
        onClose={() => setDeletingJobId(null)}
        onConfirm={handleDeleteConfirm}
        title="Delete Application"
        message="Are you sure you want to permanently delete this job application? This action cannot be undone."
      />
    </div>
  );
};

export default Dashboard;
