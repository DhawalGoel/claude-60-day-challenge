import React, { useState } from 'react';
import { CheckCircle2, Clock, AlertCircle, Heart, FileText, Users, Home } from 'lucide-react';

export default function HospitalAdmissionSimulator() {
  const [stage, setStage] = useState(0);
  const [formData, setFormData] = useState({
    fullName: '',
    age: '',
    condition: '',
    medications: '',
    documents: false,
    insurance: false,
    emergency: false
  });
  const [completedStages, setCompletedStages] = useState([]);
  const [readinessScore, setReadinessScore] = useState(0);

  const stages = [
    {
      id: 0,
      title: 'Pre-Admission Checklist',
      icon: <Home className="w-6 h-6" />,
      description: 'Prepare for hospital arrival'
    },
    {
      id: 1,
      title: 'Personal Information',
      icon: <Users className="w-6 h-6" />,
      description: 'Enter your details'
    },
    {
      id: 2,
      title: 'Medical History',
      icon: <Heart className="w-6 h-6" />,
      description: 'Share health information'
    },
    {
      id: 3,
      title: 'Documents & Insurance',
      icon: <FileText className="w-6 h-6" />,
      description: 'Verify documents'
    },
    {
      id: 4,
      title: 'Admission Complete',
      icon: <CheckCircle2 className="w-6 h-6" />,
      description: 'Ready for admission'
    }
  ];

  const checklist = [
    { id: 1, text: 'Identification documents', status: 'required' },
    { id: 2, text: 'Insurance card', status: 'required' },
    { id: 3, text: 'Current medications list', status: 'required' },
    { id: 4, text: 'Medical reports & prescriptions', status: 'important' },
    { id: 5, text: 'Emergency contact information', status: 'required' },
    { id: 6, text: 'Hospital pre-authorization', status: 'important' }
  ];

  const handleNext = () => {
    if (stage < stages.length - 1) {
      if (!completedStages.includes(stage)) {
        setCompletedStages([...completedStages, stage]);
      }
      setStage(stage + 1);
      updateReadinessScore(stage + 1);
    }
  };

  const handlePrevious = () => {
    if (stage > 0) {
      setStage(stage - 1);
    }
  };

  const updateReadinessScore = (currentStage) => {
    let score = (currentStage / stages.length) * 100;
    setReadinessScore(Math.round(score));
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const renderStageContent = () => {
    switch (stage) {
      case 0:
        return (
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-lg border border-blue-200">
              <h3 className="text-lg font-semibold text-blue-900 mb-4 flex items-center gap-2">
                <Clock className="w-5 h-5" />
                Pre-Admission Checklist
              </h3>
              <div className="space-y-3">
                {checklist.map((item) => (
                  <div key={item.id} className="flex items-start gap-3 p-3 bg-white rounded border border-blue-100">
                    <input
                      type="checkbox"
                      defaultChecked
                      className="mt-1 w-4 h-4 accent-blue-600"
                    />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-800">{item.text}</p>
                      <span className={`text-xs mt-1 inline-block px-2 py-1 rounded ${
                        item.status === 'required' 
                          ? 'bg-red-100 text-red-700' 
                          : 'bg-yellow-100 text-yellow-700'
                      }`}>
                        {item.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="p-4 bg-blue-50 border-l-4 border-blue-500 rounded">
              <p className="text-sm text-blue-900">
                ℹ️ <strong>Tip:</strong> Gather all documents and medications before arrival. This speeds up the admission process.
              </p>
            </div>
          </div>
        );

      case 1:
        return (
          <div className="space-y-4">
            <div className="grid gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  placeholder="John Doe"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Age *</label>
                <input
                  type="number"
                  name="age"
                  value={formData.age}
                  onChange={handleInputChange}
                  placeholder="45"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Emergency Contact</label>
                <input
                  type="checkbox"
                  name="emergency"
                  checked={formData.emergency}
                  onChange={handleInputChange}
                  className="mt-2"
                />
                <label className="ml-2 text-sm text-gray-600">Yes, I have provided emergency contact</label>
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Primary Condition/Reason for Admission *</label>
              <select
                name="condition"
                value={formData.condition}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Select condition...</option>
                <option value="surgery">Planned Surgery</option>
                <option value="cardiac">Cardiac Care</option>
                <option value="respiratory">Respiratory Issues</option>
                <option value="orthopedic">Orthopedic Surgery</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Current Medications *</label>
              <textarea
                name="medications"
                value={formData.medications}
                onChange={handleInputChange}
                placeholder="E.g., Aspirin 100mg daily, Metformin 500mg..."
                rows="4"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div className="p-4 bg-amber-50 border-l-4 border-amber-500 rounded">
              <p className="text-sm text-amber-900">
                ⚠️ <strong>Important:</strong> Provide an accurate list of all medications, including supplements and OTC drugs.
              </p>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-4">
            <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-medium text-green-900">Required Documents</h4>
                  <p className="text-sm text-green-800 mt-1">All documents verified</p>
                </div>
              </div>
            </div>

            <div className="grid gap-3">
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded border border-gray-200">
                <input
                  type="checkbox"
                  name="documents"
                  checked={formData.documents}
                  onChange={handleInputChange}
                  className="w-4 h-4 accent-green-600"
                />
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-800">ID & Medical Records Submitted</p>
                </div>
                {formData.documents && <CheckCircle2 className="w-5 h-5 text-green-600" />}
              </div>

              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded border border-gray-200">
                <input
                  type="checkbox"
                  name="insurance"
                  checked={formData.insurance}
                  onChange={handleInputChange}
                  className="w-4 h-4 accent-green-600"
                />
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-800">Insurance & Authorization Verified</p>
                </div>
                {formData.insurance && <CheckCircle2 className="w-5 h-5 text-green-600" />}
              </div>
            </div>

            {formData.documents && formData.insurance && (
              <div className="p-4 bg-green-50 border-l-4 border-green-500 rounded">
                <p className="text-sm text-green-900">
                  ✓ <strong>All clear!</strong> You're ready to proceed to admission.
                </p>
              </div>
            )}
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-8 rounded-lg border-2 border-green-300 text-center">
              <CheckCircle2 className="w-16 h-16 text-green-600 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-green-900 mb-2">Admission Ready!</h2>
              <p className="text-green-800 mb-4">
                {formData.fullName || 'Patient'}, your admission process is complete.
              </p>
              
              <div className="bg-white rounded-lg p-4 mt-6 space-y-3 text-left">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Readiness Score:</span>
                  <span className="text-2xl font-bold text-green-600">100%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Status:</span>
                  <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                    Ready for Admission
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Next Step:</span>
                  <span className="text-sm text-gray-700 font-medium">Proceed to Hospital Registration</span>
                </div>
              </div>
            </div>

            <div className="p-4 bg-blue-50 border-l-4 border-blue-500 rounded">
              <p className="text-sm text-blue-900">
                📋 <strong>Reminder:</strong> Arrive 15-30 minutes early with all original documents. Your estimated admission time is 9:00 AM.
              </p>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
            <Heart className="w-8 h-8 text-blue-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Hospital Admission Simulator</h1>
          <p className="text-gray-600 mt-2">Experience the complete admission workflow</p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-medium text-gray-700">Progress</span>
            <span className="text-sm font-bold text-blue-600">{readinessScore}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${readinessScore}%` }}
            />
          </div>
        </div>

        {/* Stage Indicators */}
        <div className="grid grid-cols-5 gap-2 mb-8">
          {stages.map((s) => (
            <button
              key={s.id}
              onClick={() => s.id <= stage && setStage(s.id)}
              className={`p-3 rounded-lg text-center transition-all ${
                s.id === stage
                  ? 'bg-blue-600 text-white shadow-lg scale-105'
                  : s.id < stage
                  ? 'bg-green-500 text-white'
                  : 'bg-gray-200 text-gray-600'
              } ${s.id <= stage ? 'cursor-pointer' : 'cursor-not-allowed'}`}
            >
              <div className="text-xl mb-1">{s.icon}</div>
              <p className="text-xs font-semibold hidden sm:block">{s.title.split(' ')[0]}</p>
            </button>
          ))}
        </div>

        {/* Main Content Card */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <div className="mb-6">
            <div className="flex items-center gap-3 mb-2">
              {stages[stage].icon}
              <h2 className="text-2xl font-bold text-gray-900">{stages[stage].title}</h2>
            </div>
            <p className="text-gray-600">{stages[stage].description}</p>
          </div>

          <hr className="my-6" />

          {/* Stage Content */}
          <div className="mb-8">
            {renderStageContent()}
          </div>

          {/* Navigation Buttons */}
          <div className="flex gap-4 justify-between mt-8">
            <button
              onClick={handlePrevious}
              disabled={stage === 0}
              className="px-6 py-2 bg-gray-200 text-gray-800 rounded-lg font-medium hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              ← Previous
            </button>
            <button
              onClick={handleNext}
              disabled={stage === stages.length - 1}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              Next →
            </button>
          </div>
        </div>

        {/* Footer Info */}
        <div className="text-center text-sm text-gray-600 space-y-2">
          <p>Stage {stage + 1} of {stages.length}</p>
          <p className="text-xs">This is an educational simulator for understanding hospital admission processes</p>
        </div>
      </div>
    </div>
  );
}
