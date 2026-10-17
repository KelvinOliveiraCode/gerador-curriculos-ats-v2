import { useState } from 'react';

/**
 * Campo de formulário com rótulo, input e mensagem de erro inline.
 *
 * O erro é exibido apenas quando existe (não valida em cada pressionamento de
 * tecla), mantendo o foco no preenchimento sem ruído visual.
 */
interface FormFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  placeholder?: string;
  type?: string;
}

export default function FormField({
  label,
  value,
  onChange,
  error,
  placeholder,
  type = 'text',
}: FormFieldProps) {
  const [focused, setFocused] = useState(false);

  return (
    <div className="space-y-1">
      <label
        htmlFor={label.toLowerCase().replace(/\s+/g, '-')}
        className={`text-sm font-medium block ${error ? 'text-red-700' : 'text-muted'}`}
      >
        {label}
      </label>
      <input
        id={label.toLowerCase().replace(/\s+/g, '-')}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={`block w-full rounded border px-3 py-2 text-sm ${
          focused || error ? 'border-ink' : 'border-line'
        } ${error ? 'ring-1 ring-red-700' : ''} focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent`}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
      />
      {error && <span className="text-xs text-red-700">{error}</span>}
    </div>
  );
}
