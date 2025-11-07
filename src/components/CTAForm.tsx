import { useEffect, useMemo, useState } from 'react';
import type { ColorOption, LeadPayload, Trim } from '../types/car';
import { submitLead } from '../api/cars';

interface CTAFormProps {
  trims: Trim[];
  exteriorColors: ColorOption[];
  interiorColors: ColorOption[];
  selectedTrimCode?: string;
  selectedExterior?: string;
  selectedInterior?: string;
}

const emptyErrors = {
  fullName: '',
  phone: '',
  email: '',
  city: '',
};

const CTAForm = ({
  trims,
  exteriorColors,
  interiorColors,
  selectedTrimCode,
  selectedExterior,
  selectedInterior,
}: CTAFormProps) => {
  const [intent, setIntent] = useState<LeadPayload['intent']>('test-drive');
  const [formState, setFormState] = useState({
    fullName: '',
    phone: '',
    email: '',
    city: '',
    preferredDealer: '',
    preferredDate: '',
    preferredTime: '',
    notes: '',
    selectedTrimCode: selectedTrimCode ?? trims[0]?.code ?? '',
    exteriorColorCode: selectedExterior ?? exteriorColors[0]?.code ?? '',
    interiorColorCode: selectedInterior ?? interiorColors[0]?.code ?? '',
  });
  const [errors, setErrors] = useState(emptyErrors);
  const [submitting, setSubmitting] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    setFormState((prev) => ({
      ...prev,
      selectedTrimCode: selectedTrimCode ?? prev.selectedTrimCode,
      exteriorColorCode: selectedExterior ?? prev.exteriorColorCode,
      interiorColorCode: selectedInterior ?? prev.interiorColorCode,
    }));
  }, [selectedTrimCode, selectedExterior, selectedInterior]);

  const selectedTrim = useMemo(
    () => trims.find((trim) => trim.code === formState.selectedTrimCode),
    [trims, formState.selectedTrimCode]
  );

  const updateField = (field: keyof typeof formState, value: string) => {
    setFormState((prev) => ({ ...prev, [field]: value }));
  };

  const validate = () => {
    const nextErrors = { ...emptyErrors };
    if (!formState.fullName.trim()) nextErrors.fullName = 'Required';
    if (!formState.phone.trim()) nextErrors.phone = 'Required';
    if (!formState.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) nextErrors.email = 'Invalid email';
    if (!formState.city.trim()) nextErrors.city = 'Required';
    setErrors(nextErrors);
    return Object.values(nextErrors).every((value) => value === '');
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    const payload: LeadPayload = {
      intent,
      fullName: formState.fullName.trim(),
      phone: formState.phone.trim(),
      email: formState.email.trim(),
      city: formState.city.trim(),
      preferredDealer: formState.preferredDealer || undefined,
      preferredDate: formState.preferredDate || undefined,
      preferredTime: formState.preferredTime || undefined,
      selectedTrimCode: formState.selectedTrimCode,
      exteriorColorCode: formState.exteriorColorCode,
      interiorColorCode: formState.interiorColorCode,
      notes: formState.notes || undefined,
    };

    console.log('[cta-form] payload', payload);
    try {
      await submitLead(payload); // TODO integrate real endpoint.
      setToast('We received your request. Our consultant will contact you shortly.');
    } catch (err) {
      console.error('[cta-form] submit failed', err);
      setToast('Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
      setTimeout(() => setToast(null), 4000);
    }
  };

  const fieldClasses = 'w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 focus:border-brand-accent focus:outline-none focus:ring-1 focus:ring-brand-accent/60';

  return (
    <section className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-2xl font-semibold">Book a test drive or pre-order</h2>
          {selectedTrim && (
            <p className="text-sm text-slate-500">
              {selectedTrim.name}
              {selectedTrim.powertrain ? ` � ${selectedTrim.powertrain}` : ''}
            </p>
          )}
        </div>
        <div className="flex rounded-full bg-slate-100 p-1">
          {(['test-drive', 'pre-order'] as LeadPayload['intent'][]).map((mode) => (
            <button
              key={mode}
              type="button"
              onClick={() => setIntent(mode)}
              className={`rounded-full px-4 py-2 text-sm font-semibold capitalize ${
                intent === mode ? 'bg-white text-brand-accent shadow' : 'text-slate-500'
              }`}
            >
              {mode.replace('-', ' ')}
            </button>
          ))}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5" noValidate>
        {toast && (
          <div className="rounded-2xl border border-brand-accent/30 bg-brand-accent/10 px-4 py-3 text-sm text-brand">
            {toast}
          </div>
        )}
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="text-sm font-medium text-slate-600">Full name</label>
            <input className={fieldClasses} value={formState.fullName} onChange={(event) => updateField('fullName', event.target.value)} />
            {errors.fullName && <p className="mt-1 text-xs text-warning">{errors.fullName}</p>}
          </div>
          <div>
            <label className="text-sm font-medium text-slate-600">Phone</label>
            <input className={fieldClasses} value={formState.phone} onChange={(event) => updateField('phone', event.target.value)} />
            {errors.phone && <p className="mt-1 text-xs text-warning">{errors.phone}</p>}
          </div>
          <div>
            <label className="text-sm font-medium text-slate-600">Email</label>
            <input type="email" className={fieldClasses} value={formState.email} onChange={(event) => updateField('email', event.target.value)} />
            {errors.email && <p className="mt-1 text-xs text-warning">{errors.email}</p>}
          </div>
          <div>
            <label className="text-sm font-medium text-slate-600">City</label>
            <input className={fieldClasses} value={formState.city} onChange={(event) => updateField('city', event.target.value)} />
            {errors.city && <p className="mt-1 text-xs text-warning">{errors.city}</p>}
          </div>
          <div>
            <label className="text-sm font-medium text-slate-600">Preferred dealer</label>
            <input
              className={fieldClasses}
              placeholder="VinFast Landmark 81"
              value={formState.preferredDealer}
              onChange={(event) => updateField('preferredDealer', event.target.value)}
            />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="text-sm font-medium text-slate-600">Preferred date</label>
              <input type="date" className={fieldClasses} value={formState.preferredDate} onChange={(event) => updateField('preferredDate', event.target.value)} />
            </div>
            <div>
              <label className="text-sm font-medium text-slate-600">Preferred time</label>
              <input type="time" className={fieldClasses} value={formState.preferredTime} onChange={(event) => updateField('preferredTime', event.target.value)} />
            </div>
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          <div>
            <label className="text-sm font-medium text-slate-600">Trim</label>
            <select className={fieldClasses} value={formState.selectedTrimCode} onChange={(event) => updateField('selectedTrimCode', event.target.value)}>
              {trims.map((trim) => (
                <option key={trim.code} value={trim.code}>
                  {trim.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-sm font-medium text-slate-600">Exterior color</label>
            <select className={fieldClasses} value={formState.exteriorColorCode} onChange={(event) => updateField('exteriorColorCode', event.target.value)}>
              {exteriorColors.map((color) => (
                <option key={color.code} value={color.code}>
                  {color.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-sm font-medium text-slate-600">Interior color</label>
            <select className={fieldClasses} value={formState.interiorColorCode} onChange={(event) => updateField('interiorColorCode', event.target.value)}>
              {interiorColors.map((color) => (
                <option key={color.code} value={color.code}>
                  {color.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div>
          <label className="text-sm font-medium text-slate-600">Notes</label>
          <textarea rows={4} className={fieldClasses} placeholder="Any special request?" value={formState.notes} onChange={(event) => updateField('notes', event.target.value)} />
        </div>
        <button type="submit" disabled={submitting} className="w-full rounded-2xl bg-brand-accent px-4 py-3 text-base font-semibold text-white transition hover:bg-brand-accent/90 disabled:cursor-not-allowed disabled:opacity-60">
          {submitting ? 'Sending...' : intent === 'test-drive' ? 'Book a test drive' : 'Reserve your VF 8'}
        </button>
      </form>
      <p className="text-xs text-slate-400">TODO: connect this form to the VinFast lead management API for automated follow-up.</p>
    </section>
  );
};

export default CTAForm;
