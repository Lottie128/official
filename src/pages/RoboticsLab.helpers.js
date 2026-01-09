// Helper exports used by QuotePrint and RoboticsLab
export const TRAINING_PLANS = [
  { key: 'none', label: 'No trainer required', fee: 0 },
  { key: '1d', label: '1 day / week (full-day)', fee: 50000 },
  { key: '3d', label: '3 days / week (full-day)', fee: 150000 },
  { key: '5d', label: '5 days / week (full-day)', fee: 240000 }
];

export const TEACHER_TRAINING = [
  { key: 'none', label: 'No teacher training', fee: 0 },
  { key: 'no_cert', label: 'Teacher Training (no IBM cert)', fee: 15000 },
  { key: 'with_cert', label: 'Teacher Training (with IBM cert)', fee: 35000 }
];

export const formatINR = (value) => `₹\u00A0${Number(value || 0).toLocaleString('en-IN')}`;
