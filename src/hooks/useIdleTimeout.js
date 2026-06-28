import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import { eraseCookie, getCookie } from '../utils/cookies';

export function useIdleTimeout(timeoutMinutes = 15) {
  const navigate = useNavigate();
  const timeoutIdRef = useRef(null);

  const handleLogout = async () => {
    // Check if token exists before logging out to avoid double logout calls
    if (!getCookie('token')) return;

    try {
      await api.post('/logout');
    } catch (err) {
      console.error('Auto-logout API error:', err);
    }
    
    eraseCookie('token');
    eraseCookie('role');
    
    // Redirect to login with query param reason=expired
    navigate('/login?reason=expired');
  };

  const resetTimer = () => {
    if (timeoutIdRef.current) {
      clearTimeout(timeoutIdRef.current);
    }
    timeoutIdRef.current = setTimeout(handleLogout, timeoutMinutes * 60 * 1000);
  };

  useEffect(() => {
    // Only set up listeners if the user is logged in
    const token = getCookie('token');
    if (!token) return;

    const events = ['mousemove', 'keydown', 'scroll', 'click', 'mousedown', 'touchstart'];

    // Initialize timer
    resetTimer();

    // Add event listeners
    events.forEach(event => {
      window.addEventListener(event, resetTimer);
    });

    // Cleanup
    return () => {
      if (timeoutIdRef.current) {
        clearTimeout(timeoutIdRef.current);
      }
      events.forEach(event => {
        window.removeEventListener(event, resetTimer);
      });
    };
  }, [navigate, timeoutMinutes]);
}
