import React from 'react';
import './Button.scss';

type ButtonProps = {
	children: React.ReactNode;
	className?: string;
	onClick?: () => void;
	type?: 'button' | 'submit' | 'reset';
	disabled?: boolean;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

function Button({ children, className = '', onClick, type = 'button', disabled = false }: ButtonProps) {
	return (
		<button type={type} className={`btn ${className}`} onClick={onClick} disabled={disabled}>
			{children}
		</button>
	);
}

export default Button;
