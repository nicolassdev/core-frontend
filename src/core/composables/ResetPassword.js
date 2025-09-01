import { httpPut } from 'boot/axios';

const ResetPassword = (payload) => {
	return new Promise((resolve, reject) => {
		httpPut(`core/ResetPassword/${payload.id}`, payload, {
			success: (response) => {
				resolve(response.data);
			},
			catch: (response) => {
				reject(response.data);
			},
		});
	});
};

export { ResetPassword };
