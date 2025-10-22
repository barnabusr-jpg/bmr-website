import React from 'react';
import clsx from 'clsx';

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'primary'|'secondary' };
export function Button({ className, variant='primary', ...props }: Props) {
  const base = 'inline-flex items-center justify-center px-4 py-2 font-medium rounded-2xl shadow-sm transition';
  const styles =
  variant === "secondary"
    ? "bg-gray-100 text-gray-900 hover:bg-gray-200"
    : "bg-teal-600 text-white hover:bg-teal-700 active:bg-teal-800";
  return <button className={clsx(base, styles, className)} {...props} />;
}
export default Button;
