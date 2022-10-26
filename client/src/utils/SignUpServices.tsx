export const createUser = async (
	email: FormDataEntryValue | null,
	password: FormDataEntryValue | null,
	username: FormDataEntryValue | null,
) => {
	try {
		const response = await fetch(`http://localhost:${process.env.REACT_APP_PORT}/register`, {
			method: 'POST',
			credentials: 'include',
			headers: { 'Content-type': 'application/json' },
			body: JSON.stringify({ email, password, username }),
		});
		const data = await response.json();
		return data;
	} catch (err) {
		console.log('SignUp CreateUser error:', err);
		return new Error('Failed to create user');
	}
};

export const getUser = async (
	userId: string
) => {
	try {
		const response = await fetch(`http://localhost:${process.env.REACT_APP_PORT}/api/users`, {
			method: 'POST',
			credentials: 'include',
			headers: { 'Content-type': 'application/json' },
			body: JSON.stringify({ userId }),
		});
		const data = await response.json();
		return data;
	} catch (err) {
		console.log('SignUp getUser error:', err);
		return new Error('Failed to fetch user data');
	}
};

