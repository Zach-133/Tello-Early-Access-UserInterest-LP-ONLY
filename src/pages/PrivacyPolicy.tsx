import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export function PrivacyPolicy() {
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
        }}>Privacy Policy</h1>
        <p style={{ fontSize: 13, color: 'hsl(25 15% 55%)', fontFamily: 'Inter, sans-serif', marginBottom: 48 }}>
          Last updated: March 2026
        </p>

        <Section title="Who we are">
          <p>Tello is an AI-powered mock interview platform. For the purposes of UK data protection law, Tello is the data controller responsible for your personal data.</p>
          <p>Contact: <a href="mailto:hello@tello.zach13.com" style={{ color: 'hsl(18 65% 55%)' }}>hello@tello.zach13.com</a></p>
        </Section>

        <Section title="What data we collect">
          <p>When you sign up for early access, we collect:</p>
          <ul style={{ paddingLeft: '1.25rem', listStyleType: 'disc' }}>
            <li>Your name</li>
            <li>Your email address</li>
            <li>The date and time of your sign-up</li>
          </ul>
        </Section>

        <Section title="Why we collect it and our lawful basis">
          <p>We collect your name and email solely to notify you when Tello early access opens in April 2026. Our lawful basis for processing is your <strong>consent</strong> (Article 6(1)(a) UK GDPR), given when you tick the consent box on the sign-up form.</p>
          <p>You can withdraw your consent at any time by emailing us at the address above. Withdrawal does not affect the lawfulness of processing before withdrawal.</p>
        </Section>

        <Section title="How long we keep your data">
          <p>We will retain your data until early access has launched and initial communications have been sent, after which we will delete it unless you have become an active user of the platform. You may request deletion at any time.</p>
        </Section>

        <Section title="Who we share your data with">
          <p>We do not sell or share your data with third parties for marketing purposes. Your data is processed by the following service providers acting on our behalf:</p>
          <ul style={{ paddingLeft: '1.25rem', listStyleType: 'disc' }}>
            <li><strong>Supabase</strong> — secure database storage</li>
            <li><strong>n8n</strong> — workflow automation for email delivery</li>
          </ul>
          <p>These providers may process your data outside the United Kingdom. Where this occurs, we ensure appropriate safeguards are in place in accordance with UK GDPR requirements.</p>
        </Section>

        <Section title="Your rights">
          <p>Under UK GDPR, you have the right to:</p>
          <ul style={{ paddingLeft: '1.25rem', listStyleType: 'disc' }}>
            <li><strong>Access</strong> — request a copy of the personal data we hold about you</li>
            <li><strong>Rectification</strong> — ask us to correct inaccurate data</li>
            <li><strong>Erasure</strong> — ask us to delete your data</li>
            <li><strong>Restriction</strong> — ask us to limit how we use your data</li>
            <li><strong>Portability</strong> — receive your data in a portable format</li>
            <li><strong>Object</strong> — object to our processing in certain circumstances</li>
            <li><strong>Withdraw consent</strong> — at any time, without affecting prior processing</li>
          </ul>
          <p>To exercise any of these rights, email us at <a href="mailto:hello@tello.zach13.com" style={{ color: 'hsl(18 65% 55%)' }}>hello@tello.zach13.com</a>. We will respond within one calendar month.</p>
        </Section>

        <Section title="Right to complain">
          <p>If you believe we have not handled your data lawfully, you have the right to lodge a complaint with the UK's supervisory authority:</p>
          <p><strong>Information Commissioner's Office (ICO)</strong><br />
          Website: <a href="https://ico.org.uk" target="_blank" rel="noopener noreferrer" style={{ color: 'hsl(18 65% 55%)' }}>ico.org.uk</a><br />
          Phone: 0303 123 1113</p>
        </Section>

        <Section title="Changes to this policy">
          <p>We may update this policy from time to time. Any changes will be posted on this page with an updated date.</p>
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
