import React from 'react';

function Header({ isLoggedIn }: { isLoggedIn: boolean }) {
	if (isLoggedIn) {
		return <header>Logged In</header>;
	} else {
		return <header>Not Logged In</header>;
	}
}
