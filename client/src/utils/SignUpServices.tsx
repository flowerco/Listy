export const createUser = async (
	email: FormDataEntryValue | null,
	password: FormDataEntryValue | null
) => {
	try {
		const response = await fetch('http://localhost:3030/register', {
			method: 'POST',
			headers: { 'Content-type': 'application/json' },
			body: JSON.stringify({ email, password }),
		});
		const data = await response.json();
		return data;
	} catch (err) {
		console.log('SignUp CreateUser error:', err);
		return new Error('Failed to create user');
	}
};
