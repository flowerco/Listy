export const verifyUser = async (
	email: FormDataEntryValue | null,
	password: FormDataEntryValue | null
) => {
	try {
		const response = await fetch('http://localhost:3030/login', {
			method: 'POST',
			headers: { 'Content-type': 'application/json' },
			credentials: "include",
			body: JSON.stringify({ email, password }),
		});
		const data = await response.json();
		return data;
	} catch (error) {
		console.log('LOGIN SERVICE ERROR: ', error);
		return new Error('Failed to Login at service');
	}
};
