"use client";
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import '../../admin/style.css';

function Text({ name, label, value, onChange, type = 'text' }: any) {
  const reqNames = (globalThis as any).__REQ__ as string[] | undefined;
  const req = Array.isArray(reqNames) ? reqNames.includes(name) : false;
  return (
    <div style={{ display: 'grid', gap: 6 }}>
      <label style={{ fontSize: 12, color: '#9aa3b2' }}>{label}{req ? ' *' : ''}</label>
      <input className="adm-input" type={type} value={value} onChange={e => onChange(e.target.value)} required={req} />
    </div>
  );
}

function Select({ name, label, value, onChange, options, disabled }: any) {
  const reqNames = (globalThis as any).__REQ__ as string[] | undefined;
  const req = Array.isArray(reqNames) ? reqNames.includes(name) : false;
  return (
    <div style={{ display: 'grid', gap: 6 }}>
      <label style={{ fontSize: 12, color: '#9aa3b2' }}>{label}{req ? ' *' : ''}</label>
      <select className="adm-input" value={value} onChange={e => onChange(e.target.value)} required={req} disabled={disabled}>
        {options.map((o: any) => (<option key={o} value={o}>{o}</option>))}
      </select>
    </div>
  );
}

function Section({ title, children }: any) {
  const [open, setOpen] = useState(true);
  return (
    <div className="adm-card">
      <div className="adm-card-head">
        <div className="adm-user">{title}</div>
        <button className="adm-btn" onClick={() => setOpen(!open)}>{open ? 'Hide' : 'Show'}</button>
      </div>
      {open && <div className="adm-card-body">{children}</div>}
    </div>
  );
}

async function uploadFile(f: File): Promise<string | null> {
  const fd = new FormData();
  fd.append('file', f);
  const res = await fetch('/api/upload', { method: 'POST', body: fd });
  const json = await res.json();
  if (!res.ok || !json.ok) throw new Error(json.error || 'upload_failed');
  return json.url || null;
}

function Uploader({ label, value, onChange }: any) {
  const [busy, setBusy] = useState(false);
  return (
    <div style={{ display: 'grid', gap: 6 }}>
      <label style={{ fontSize: 12, color: '#9aa3b2' }}>{label}</label>
      <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
        <input className="adm-input" type="file" accept="image/*" onChange={async e => {
          const file = e.target.files?.[0];
          if (!file) return;
          setBusy(true);
          try {
            const url = await uploadFile(file);
            if (url) onChange(url);
          } catch {}
          setBusy(false);
        }} />
        {busy && <span style={{ fontSize: 12, color: '#9aa3b2' }}>Uploading…</span>}
      </div>
      {value && (
        <div style={{ display: 'grid', gap: 6 }}>
          <img src={value} alt="preview" style={{ maxWidth: '100%', borderRadius: 8, border: '1px solid rgba(255,255,255,0.12)' }} />
        </div>
      )}
    </div>
  );
}

export default function OnboardingPage() {
  const params = useParams();
  const token = String(params?.token || '');
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [ok, setOk] = useState(false);

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [data, setData] = useState<any>({
    fullLegalName: '', preferredName: '', personalEmail: '', phoneNumber: '',
    idNumber: '', dateOfBirth: '', homeAddress: '', emergencyContactName: '', emergencyContactRelation: '', emergencyContactPhone: '',
    bankName: '', bankAccountTitle: '', bankAccountNumberOrIban: '', bankBranchCode: '', bankCity: '',
    roleJoining: '', department: '', salaryMonthly: '', workingDays: '', workingHours: '', workMode: 'remote',
    laptopSpecs: '', companyAssetsChecklist: '', socialLinks: '', cvUrl: '', portfolioLink: '', pastExperienceSummary: '',
    taxStatusOrNTN: '', medicalConditions: '', tshirtSize: '', profilePictureUrl: '', preferredCompanyEmailUsername: '',
    toolsRequired: [], accessLevel: 'staff', heardAboutJob: '', availabilityToStart: '', expectedGrowthPath: '',
  });

  const REQUIRED: string[] = [
    'fullLegalName', 'personalEmail', 'phoneNumber', 'idNumber', 'dateOfBirth', 'homeAddress',
    'emergencyContactName', 'emergencyContactPhone', 'bankName', 'bankAccountTitle', 'bankAccountNumberOrIban', 'bankBranchCode',
    'roleJoining', 'workMode'
  ];
  (globalThis as any).__REQ__ = REQUIRED;
  const missingRequired = REQUIRED.filter((k) => {
    const v = k === 'workMode' ? (data[k] ?? '') : String(data[k] ?? '').trim();
    return !v;
  });

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/onboarding/${token}`);
        const json = await res.json();
        if (!res.ok || !json.ok) throw new Error(json.error || 'Invalid link');
        setOk(true);
      } catch (e: any) {
        setError(e?.message || 'Invalid link');
      } finally {
        setLoading(false);
      }
    })();
  }, [token]);

  async function submit() {
    setLoading(true);
    setError(null);
    try {
      if (!password) throw new Error('Password required');
      if (password !== confirmPassword) throw new Error('Passwords do not match');
      const payload = { password, onboarding: { ...data, salaryMonthly: data.salaryMonthly ? Number(data.salaryMonthly) : undefined } };
      const res = await fetch(`/api/onboarding/${token}`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
      const json = await res.json();
      if (!res.ok || !json.ok) throw new Error(json.error || 'Failed to submit');
      router.replace('/login');
    } catch (e: any) {
      setError(e?.message || 'Failed to submit');
    } finally {
      setLoading(false);
    }
  }


  if (loading) return <div style={{ padding: 16 }}>Loading…</div>;
  if (error) return <div style={{ padding: 16, color: '#ffd27a' }}>{error}</div>;
  if (!ok) return null;

  return (
    <div className="admin-wrap">
      <div className="admin-hero">
        <div className="tag-pill">Onboarding</div>
        <h1 className="admin-title">Complete your details</h1>
        <p className="admin-sub">Fill the sections below to activate your account.</p>
      </div>

      <div className="admin-grid">
        <Section title="Identity">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(240px,1fr))', gap: 12 }}>
            <Text name={'fullLegalName'} label={'Full legal name'} value={data.fullLegalName} onChange={(v: any) => setData({ ...data, fullLegalName: v })} />
            <Text name={'preferredName'} label={'Preferred name'} value={data.preferredName} onChange={(v: any) => setData({ ...data, preferredName: v })} />
            <Text name={'dateOfBirth'} label={'Date of birth'} value={data.dateOfBirth} type={'date'} onChange={(v: any) => setData({ ...data, dateOfBirth: v })} />
            <Uploader label={'Profile picture'} value={data.profilePictureUrl} onChange={(v: any) => setData({ ...data, profilePictureUrl: v })} />
          </div>
        </Section>

        <Section title="Contact">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(240px,1fr))', gap: 12 }}>
            <Text name={'personalEmail'} label={'Personal email'} value={data.personalEmail} onChange={(v: any) => setData({ ...data, personalEmail: v })} />
            <Text name={'phoneNumber'} label={'Phone (WhatsApp)'} value={data.phoneNumber} onChange={(v: any) => setData({ ...data, phoneNumber: v })} />
            <Text name={'homeAddress'} label={'Full home address'} value={data.homeAddress} onChange={(v: any) => setData({ ...data, homeAddress: v })} />
          </div>
        </Section>

        <Section title="Government ID">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(240px,1fr))', gap: 12 }}>
            <Text name={'idNumber'} label={'CNIC/Passport number'} value={data.idNumber} onChange={(v: any) => setData({ ...data, idNumber: v })} />
            <Uploader label={'ID front'} value={data.idFrontUrl} onChange={(v: any) => setData({ ...data, idFrontUrl: v })} />
            <Uploader label={'ID back'} value={data.idBackUrl} onChange={(v: any) => setData({ ...data, idBackUrl: v })} />
          </div>
        </Section>

        <Section title="Emergency Contact">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(240px,1fr))', gap: 12 }}>
            <Text name={'emergencyContactName'} label={'Name'} value={data.emergencyContactName} onChange={(v: any) => setData({ ...data, emergencyContactName: v })} />
            <Text name={'emergencyContactRelation'} label={'Relation'} value={data.emergencyContactRelation} onChange={(v: any) => setData({ ...data, emergencyContactRelation: v })} />
            <Text name={'emergencyContactPhone'} label={'Phone'} value={data.emergencyContactPhone} onChange={(v: any) => setData({ ...data, emergencyContactPhone: v })} />
          </div>
        </Section>

        <Section title="Banking">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(240px,1fr))', gap: 12 }}>
            <Text name={'bankName'} label={'Bank name'} value={data.bankName} onChange={(v: any) => setData({ ...data, bankName: v })} />
            <Text name={'bankAccountTitle'} label={'Account title'} value={data.bankAccountTitle} onChange={(v: any) => setData({ ...data, bankAccountTitle: v })} />
            <Text name={'bankAccountNumberOrIban'} label={'Account number / IBAN'} value={data.bankAccountNumberOrIban} onChange={(v: any) => setData({ ...data, bankAccountNumberOrIban: v })} />
            <Text name={'bankBranchCode'} label={'Branch code'} value={data.bankBranchCode} onChange={(v: any) => setData({ ...data, bankBranchCode: v })} />
            <Text name={'bankCity'} label={'City of bank'} value={data.bankCity} onChange={(v: any) => setData({ ...data, bankCity: v })} />
          </div>
        </Section>

        

        <Section title="Links">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(240px,1fr))', gap: 12 }}>
            <Text name={'socialLinks'} label={'Social links'} value={data.socialLinks} onChange={(v: any) => setData({ ...data, socialLinks: v })} />
            <Text name={'cvUrl'} label={'CV URL'} value={data.cvUrl} onChange={(v: any) => setData({ ...data, cvUrl: v })} />
            <Text name={'portfolioLink'} label={'Portfolio link'} value={data.portfolioLink} onChange={(v: any) => setData({ ...data, portfolioLink: v })} />
          </div>
        </Section>

        <Section title="Background">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(240px,1fr))', gap: 12 }}>
            <Text name={'pastExperienceSummary'} label={'Past experience summary'} value={data.pastExperienceSummary} onChange={(v: any) => setData({ ...data, pastExperienceSummary: v })} />
            <Text name={'medicalConditions'} label={'Medical conditions'} value={data.medicalConditions} onChange={(v: any) => setData({ ...data, medicalConditions: v })} />
            <Text name={'taxStatusOrNTN'} label={'Tax status / NTN'} value={data.taxStatusOrNTN} onChange={(v: any) => setData({ ...data, taxStatusOrNTN: v })} />
            <Text name={'tshirtSize'} label={'T-shirt size'} value={data.tshirtSize} onChange={(v: any) => setData({ ...data, tshirtSize: v })} />
          </div>
        </Section>

        <Section title="Access & Tools">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(240px,1fr))', gap: 12 }}>
            <Text name={'preferredCompanyEmailUsername'} label={'Preferred MarQ email username'} value={data.preferredCompanyEmailUsername} onChange={(v: any) => setData({ ...data, preferredCompanyEmailUsername: v })} />
            <Select name={'accessLevel'} label={'Access level'} value={data.accessLevel} onChange={(v: any) => setData({ ...data, accessLevel: v })} options={['staff', 'team_lead', 'admin']} disabled />
            <Text name={'toolsRequired'} label={'Tools required (comma-separated)'} value={(data.toolsRequired || []).join(', ')} onChange={(v: any) => setData({ ...data, toolsRequired: v.split(',').map((s: string) => s.trim()).filter(Boolean) })} />
          </div>
        </Section>

        <Section title="Preferences">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(240px,1fr))', gap: 12 }}>
            <Text name={'heardAboutJob'} label={'How they heard about the job'} value={data.heardAboutJob} onChange={(v: any) => setData({ ...data, heardAboutJob: v })} />
            <Text name={'availabilityToStart'} label={'Availability to start'} value={data.availabilityToStart} onChange={(v: any) => setData({ ...data, availabilityToStart: v })} />
            <Text name={'expectedGrowthPath'} label={'Expected growth path (6–12 months)'} value={data.expectedGrowthPath} onChange={(v: any) => setData({ ...data, expectedGrowthPath: v })} />
          </div>
        </Section>

        <Section title="Password">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(240px,1fr))', gap: 12 }}>
            <Text name={'password'} label={'Set your password'} value={password} onChange={setPassword} type={'password'} />
            <Text name={'confirmPassword'} label={'Confirm password'} value={confirmPassword} onChange={setConfirmPassword} type={'password'} />
          </div>
        </Section>

        <div className="adm-card" style={{ gridColumn: '1/-1' }}>
          <div className="adm-card-body" style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
            <button className="adm-btn primary" disabled={loading || !password || password !== confirmPassword} onClick={submit}>Submit and activate</button>
          </div>
        </div>
      </div>
    </div>
  );
}
