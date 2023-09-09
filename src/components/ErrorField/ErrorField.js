import clsx from 'clsx';
import './ErrorField.css';

export default function ErrorField({ isActive, children }) {
    return <span className={clsx('error-field', isActive && 'error-field_active')}>{children}</span>;
}