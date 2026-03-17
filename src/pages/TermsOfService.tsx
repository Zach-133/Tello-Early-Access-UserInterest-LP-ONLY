import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export function TermsOfService() {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div style={{ background: 'hsl(30 25% 97%)', minHeight: '100vh' }}>
      <div style={{ maxWidth: 680, margin: '0 auto', padding: 'clamp(40px, 8vw, 80px) clamp(20px, 5vw, 40px)' }}>

        <Link to="/" style={{
          display: 'inline-flex', alignItems: 'center', gap: 6,
          fontSize: 13, color: 'hsl(25 25% 45%)', textDecoration: 'none',
          marginBottom: 40, fontFamily: 'Inter, sans-serif',
        }}>
          <ArrowLeft size={14} /> Back to home
        </Link>

        <h1 style={{
          fontFamily: 'DM Serif Display, Georgia, serif',
          fontSize: 'clamp(1.75rem, 4vw, 2.5rem)',
          fontWeight: 400, color: 'hsl(25 45% 12%)',
          letterSpacing: '-0.02em', lineHeight: 1.15,
          marginBottom: 8,
        }}>Terms of Service</h1>
        <p style={{ fontSize: 13, color: 'hsl(25 15% 55%)', fontFamily: 'Inter, sans-serif', marginBottom: 48 }}>
          Last updated: March 2026
        </p>

        <Section title="About this page">
          <p>This page is an early access interest sign-up for Tello, an AI-powered mock interview platform. By submitting your name and email address, you are expressing interest in early access — you are not entering into a contract for services, and no payment is taken.</p>
        </Section>

        <Section title="What you are signing up for">
          <p>By submitting the form, you agree to be contacted by Tello at the email address provided when early access opens. You will receive:</p>
          <ul style={{ paddingLeft: '1.25rem', listStyleType: 'disc' }}>
            <li>A notification email when early access launches in April 2026</li>
            <li>Occasional product updates related to Tello</li>
          </ul>
          <p>You may unsubscribe from these communications at any time by emailing <a href="mailto:hello@tello.zach13.com" style={{ color: 'hsl(18 65% 55%)' }}>hello@tello.zach13.com</a>.</p>
        </Section>

        <Section title="No guarantees">
          <p>Tello makes no guarantee regarding the launch date, availability, or features of the platform. Early access is offered on a best-efforts basis. We reserve the right to modify or cancel the early access programme at any time.</p>
        </Section>

        <Section title="Acceptable use">
          <p>You must not submit false or misleading information when signing up. Each sign-up should represent one individual.</p>
        </Section>

        <Section title="Governing law">
          <p>These terms are governed by the laws of England and Wales. Any disputes will be subject to the exclusive jurisdiction of the courts of England and Wales.</p>
        </Section>

        <Section title="Contact">
          <p>For any questions regarding these terms, contact us at <a href="mailto:hello@tello.zach13.com" style={{ color: 'hsl(18 65% 55%)' }}>hello@tello.zach13.com</a>.</p>
        </Section>

      </div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: 36 }}>
      <h2 style={{
        fontFamily: 'DM Serif Display, Georgia, serif',
        fontSize: '1.15rem', fontWeight: 400,
        color: 'hsl(25 40% 18%)', marginBottom: 12, letterSpacing: '-0.01em',
      }}>{title}</h2>
      <div style={{
        fontSize: 14, lineHeight: 1.75,
        color: 'hsl(25 20% 35%)',
        fontFamily: 'Inter, sans-serif',
        display: 'flex', flexDirection: 'column', gap: 10,
      }}>
        {children}
      </div>
    </div>
  );
}
