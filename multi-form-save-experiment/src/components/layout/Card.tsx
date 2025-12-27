import type { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  as?: 'div' | 'section' | 'article';
  'data-testid'?: string;
}

export function Card({
  children,
  className = '',
  as: Component = 'div',
  'data-testid': testId,
}: CardProps) {
  return (
    <Component
      className={`rounded-lg border border-gray-200 bg-white p-6 shadow-sm ${className}`}
      data-testid={testId}
    >
      {children}
    </Component>
  );
}

interface CardHeaderProps {
  title: string;
  description?: string;
  actions?: ReactNode;
}

export function CardHeader({ title, description, actions }: CardHeaderProps) {
  return (
    <div className="mb-6 flex items-start justify-between">
      <div>
        <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
        {description && <p className="mt-1 text-sm text-gray-500">{description}</p>}
      </div>
      {actions && <div className="ml-4">{actions}</div>}
    </div>
  );
}
