import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Shield, ArrowRight, Lock, Mail, CheckCircle2, Building, Users } from 'lucide-react';

export const LoginPage: React.FC = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState('ceo@demo.com');
  const [password, setPassword] = useState('••••••••••••');
  const [rememberMe, setRememberMe] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(email);
  };

  const handleQuickDemo = (role: 'ceo' | 'hr') => {
    if (role === 'ceo') {
      setEmail('ceo@demo.com');
      login('ceo@demo.com', 'ceo');
    } else {
      setEmail('hr@demo.com');
      login('hr@demo.com', 'hr');
    }
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: '#0F172A',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px 16px',
        color: '#F8FAFC',
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '440px',
          backgroundColor: '#1E293B',
          borderRadius: 'var(--radius-lg)',
          border: '1px solid #334155',
          padding: '32px 28px',
          boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.5), 0 8px 10px -6px rgba(0, 0, 0, 0.5)',
        }}
      >
        {/* Brand Header */}
        <div style={{ textAlign: 'center', marginBottom: 24 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
            <span
              style={{
                backgroundColor: 'var(--brand-primary)',
                color: '#FFFFFF',
                padding: '4px 10px',
                borderRadius: 'var(--radius-xs)',
                fontWeight: 800,
                fontSize: 13,
                letterSpacing: '0.08em',
              }}
            >
              KANVTECH
            </span>
            <span style={{ fontSize: 13, fontWeight: 700, color: '#E2E8F0', letterSpacing: '0.04em' }}>
              OPERATIONS
            </span>
          </div>
          <h1 style={{ fontSize: 20, fontWeight: 700, color: '#FFFFFF', letterSpacing: '-0.02em' }}>
            Business Operations Platform
          </h1>
          <p style={{ fontSize: 12, color: '#94A3B8', marginTop: 4 }}>
            KANVTECH FACILITIES & SERVICES • Enterprise Portal
          </p>
        </div>

        {/* Demo Fast Login Cards */}
        <div style={{ marginBottom: 20 }}>
          <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', color: '#94A3B8', letterSpacing: '0.05em', marginBottom: 8 }}>
            Instant Demo Access
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
            <button
              onClick={() => handleQuickDemo('ceo')}
              style={{
                padding: '10px 12px',
                borderRadius: 'var(--radius-sm)',
                backgroundColor: '#0F766E',
                border: '1px solid #14B8A6',
                color: '#FFFFFF',
                textAlign: 'left',
                cursor: 'pointer',
                transition: 'all 0.15s ease',
              }}
            >
              <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', color: '#CCFBF1' }}>
                CEO Cockpit
              </div>
              <div style={{ fontSize: 12, fontWeight: 600, marginTop: 2 }}>Rajesh Verma</div>
              <div style={{ fontSize: 10, color: '#CCFBF1', marginTop: 1 }}>ceo@demo.com</div>
            </button>

            <button
              onClick={() => handleQuickDemo('hr')}
              style={{
                padding: '10px 12px',
                borderRadius: 'var(--radius-sm)',
                backgroundColor: '#334155',
                border: '1px solid #475569',
                color: '#FFFFFF',
                textAlign: 'left',
                cursor: 'pointer',
                transition: 'all 0.15s ease',
              }}
            >
              <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', color: '#94A3B8' }}>
                HR Head
              </div>
              <div style={{ fontSize: 12, fontWeight: 600, marginTop: 2 }}>Priya Nair</div>
              <div style={{ fontSize: 10, color: '#CBD5E1', marginTop: 1 }}>hr@demo.com</div>
            </button>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 10, margin: '18px 0' }}>
          <div style={{ flex: 1, height: 1, backgroundColor: '#334155' }} />
          <span style={{ fontSize: 11, color: '#64748B', textTransform: 'uppercase' }}>Or Sign In With Work Email</span>
          <div style={{ flex: 1, height: 1, backgroundColor: '#334155' }} />
        </div>

        {/* Credentials Form */}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div>
            <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#CBD5E1', marginBottom: 4 }}>
              Work Email Address
            </label>
            <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
              <Mail size={15} style={{ position: 'absolute', left: 10, color: '#64748B' }} />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{
                  width: '100%',
                  padding: '8px 12px 8px 34px',
                  fontSize: 13,
                  borderRadius: 'var(--radius-sm)',
                  backgroundColor: '#0F172A',
                  border: '1px solid #334155',
                  color: '#FFFFFF',
                  outline: 'none',
                }}
              />
            </div>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#CBD5E1', marginBottom: 4 }}>
              Password
            </label>
            <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
              <Lock size={15} style={{ position: 'absolute', left: 10, color: '#64748B' }} />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{
                  width: '100%',
                  padding: '8px 12px 8px 34px',
                  fontSize: 13,
                  borderRadius: 'var(--radius-sm)',
                  backgroundColor: '#0F172A',
                  border: '1px solid #334155',
                  color: '#FFFFFF',
                  outline: 'none',
                }}
              />
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 12 }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#94A3B8', cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                style={{ accentColor: 'var(--brand-primary)' }}
              />
              Remember this device
            </label>
            <a href="#forgot" style={{ color: '#2DD4BF', fontSize: 12 }}>
              Forgot password?
            </a>
          </div>

          <button
            type="submit"
            style={{
              width: '100%',
              padding: '10px',
              backgroundColor: 'var(--brand-primary)',
              color: '#FFFFFF',
              fontWeight: 700,
              fontSize: 13,
              borderRadius: 'var(--radius-sm)',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 8,
              marginTop: 4,
            }}
          >
            <span>Sign In to Executive Dashboard</span>
            <ArrowRight size={15} />
          </button>
        </form>

        {/* Company Scale Bar */}
        <div
          style={{
            marginTop: 24,
            paddingTop: 16,
            borderTop: '1px solid #334155',
            display: 'flex',
            justifyContent: 'space-around',
            textAlign: 'center',
            fontSize: 11,
            color: '#94A3B8',
          }}
        >
          <div>
            <div className="font-mono" style={{ color: '#FFFFFF', fontWeight: 700 }}>428</div>
            <div>Workforce</div>
          </div>
          <div>
            <div className="font-mono" style={{ color: '#FFFFFF', fontWeight: 700 }}>86</div>
            <div>Customers</div>
          </div>
          <div>
            <div className="font-mono" style={{ color: '#FFFFFF', fontWeight: 700 }}>₹18.7 Cr</div>
            <div>Active ACV</div>
          </div>
        </div>
      </div>
    </div>
  );
};
