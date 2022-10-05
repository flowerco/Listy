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

export const validateJwtCookie = async () => {
	let output = 'LOGOUT';
	try {
		const response = await fetch('http://localhost:3030/validate', {credentials: "include"});
		if (response.status === 200) {
			const data = await response.json();
			output = data.userId;
		}
		return output;
	} catch (err) {
		console.log('Err in frontend cookie validation: ', err);
	}
}

export const removeJwtCookie = async() => {
	try {
		await fetch('http://localhost:3030/remove', {credentials: "include"});
	} catch (err) {
		console.log('Error removing Jwt cookie: ', err);
	}
}

