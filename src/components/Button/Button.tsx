import React from 'react';

type ButtonProps = {
	children: React.ReactNode;
	style?: React.CSSProperties;
	className?: string;
	onClick?: () => void;
	type?: 'button' | 'submit' | 'reset';
	disabled?: boolean;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

function Button({ children, style, className = '', onClick, type = 'button', disabled = false }: ButtonProps) {
	return (
		<button type={type} className={className} style={style} onClick={onClick} disabled={disabled}>
			{children}
		</button>
	);
}

export default Button;
