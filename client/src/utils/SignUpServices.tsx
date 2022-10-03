const createUser = async (email: string, password: string) => {
	try {
		await fetch('http://localhost:3030/register', {
			method: 'POST',
			headers: { 'Content-type': 'application/json' },
			body: JSON.stringify({ email, password }),
		});
	} catch (err) {
		console.log('SignUp CreateUser error:', err);
	}
};
