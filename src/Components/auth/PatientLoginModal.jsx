import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
  CircularProgress,
} from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';

const rightImage =
  'https://images.pexels.com/photos/356040/pexels-photo-356040.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1';

const benefitList = [
  'Book appointments instantly',
  'Access your medical history',
  'Get reminders for checkups',
  'Chat securely with doctors',
  'Save your insurance details',
  'Track prescriptions & test reports',
];

const PatientAuthModal = ({ onClose }) => {
  const { login, register } = useAuth();

  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const toggleMode = () => {
    setError(null);
    setIsLogin(!isLogin);
  };

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    if (isLogin) {
      const result = await login(formData.email, formData.password);
      if (!result.success) setError(result.error || 'Login failed');
      else {
        if (location.pathname === '/login' || location.pathname === '/signup') {
          navigate('/');
        } else {
          window.location.reload();
        }
      }
    } else {
      if (formData.password !== formData.password_confirmation) {
        setError('Passwords do not match');
        setLoading(false);
        return;
      }
      const userData = { ...formData };
      const result = await register(userData);
      if (!result.success) setError(result.error || 'Registration failed');
      else {
        if (location.pathname === '/login' || location.pathname === '/signup') {
          navigate('/');
        } else {
          window.location.reload();
        }
      }
    }
    setLoading(false);
  };

  return (
    <Modal
      open={true}
      onClose={onClose}
      aria-labelledby="auth-modal-title"
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'auto',
        p: 2,
      }}
    >
      <Box
        className="flex flex-col md:flex-row w-full max-w-5xl max-h-[90vh] rounded-2xl shadow-2xl bg-white relative overflow-hidden m-auto my-10"
      >
        {/* Close Button */}
        <Button
          onClick={onClose}
          sx={{
            position: 'absolute',
            top: 10,
            right: 10,
            color: 'white',
            fontSize: 24,
            fontWeight: 'bold',
            zIndex: 10,
            textShadow: '0 0 5px #000',
          }}
        >
          ×
        </Button>

        {/* Left Panel (Login / Signup Form) */}
        <Box
          sx={{
            width: { xs: '100%', md: '65%' },
            p: { xs: 4, md: 6 },
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            overflowY: 'auto',
          }}
        >
          <Typography variant="overline" color="text.secondary">
            HOME &gt; {isLogin ? 'LOGIN' : 'SIGN UP'}
          </Typography>
          <Typography variant="h4" fontWeight="bold" mb={3}>
            {isLogin ? 'LOGIN' : 'CREATE ACCOUNT'}
          </Typography>

          {error && (
            <Typography
              color="error"
              align="center"
              sx={{ mb: 2, fontWeight: 'bold' }}
            >
              {error}
            </Typography>
          )}

          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            {!isLogin && (
              <TextField
                label="Full Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                fullWidth
                required
                variant="outlined"
              />
            )}
            <TextField
              label="Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              fullWidth
              required
              variant="outlined"
              type="email"
            />
            <TextField
              label="Password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              fullWidth
              required
              type="password"
              variant="outlined"
            />
            {!isLogin && (
              <TextField
                label="Confirm Password"
                name="password_confirmation"
                value={formData.password_confirmation}
                onChange={handleChange}
                fullWidth
                required
                type="password"
                variant="outlined"
              />
            )}

            {isLogin && (
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <FormControlLabel control={<Checkbox color="success" />} label="Remember me" />
                <Typography
                  component="a"
                  href="#"
                  sx={{ color: 'success.main', textDecoration: 'none', fontWeight: 500 }}
                >
                  Forgot Password?
                </Typography>
              </Box>
            )}

            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="success"
              sx={{ py: 1.5, fontWeight: 'bold', fontSize: '1rem' }}
              disabled={loading}
            >
              {loading ? (
                <CircularProgress size={24} color="inherit" />
              ) : isLogin ? (
                'SIGN IN'
              ) : (
                'SIGN UP'
              )}
            </Button>
          </Box>
        </Box>

        {/* Right Panel (Benefits + Image) */}
        <Box
          sx={{
            display: { xs: 'none', md: 'flex' },
            width: { md: '35%' },
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            backgroundColor: 'success.dark',
          }}
        >
          <Box
            component="img"
            src={rightImage}
            alt="Medical background"
            sx={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              filter: 'brightness(0.75)',
            }}
          />
          <Box sx={{ position: 'relative', zIndex: 2, color: 'white', p: 4 }}>
            <Typography variant="h6" fontWeight="bold" mb={1}>
              NEW TO HMS?
            </Typography>
            <Typography variant="body2" mb={2}>
              Create an account and enjoy the benefits like:
            </Typography>
            <ul style={{ marginBottom: '1.5rem', paddingLeft: '1rem' }}>
              {benefitList.map((item, idx) => (
                <li key={idx} style={{ marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span style={{ color: '#90ee90', fontWeight: 'bold' }}>✔</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <Button
              fullWidth
              variant="contained"
              color="success"
              onClick={toggleMode}
              sx={{ fontWeight: 'bold' }}
            >
              {isLogin ? 'CREATE ACCOUNT' : 'ALREADY HAVE AN ACCOUNT'}
            </Button>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};

export default PatientAuthModal;
