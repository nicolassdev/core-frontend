import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

import QRious from 'qrious';

import { organizationForm } from '../composables';

export default {
	setup() {
		const router = useRouter();
		// Empty Form for QR-Code Value
		const qrLink = ref({
			format: '',
		});

		onMounted(() => {
			if (organizationForm.value.username && organizationForm.value.password) {
				// setup the value for the QRCode
				const qrValue = {
					username: organizationForm.value.username,
					password: organizationForm.value.password,
				};

				// Convert the qrValue into string/json
				const qrString = JSON.stringify(qrValue);

				qrLink.value = {
					format: qrString,
				};

				new QRious({
					// Quality of QR-Code
					level: 'L',
					// Pixel Size of QR-Code i.e. 200 x 200 pixels
					size: 300,
					// Padding to align
					padding: -1,
					// Putting the QR-Code into canvas with qr-code id
					element: document.getElementById('qr-code'),
					// Value of the QR-Code
					value: qrLink.value.format,
				});
			}
		});

		const getImagePath = (logo) => {
			return require(`../../../../assets/img/${logo}`);
		};

		const downloadQRCode = () => {
			const canvas = document.getElementById('qr-code');
			const qrDataUrl = canvas.toDataURL('image/png');

			const downloadLink = document.createElement('a');
			downloadLink.href = qrDataUrl;
			downloadLink.download = 'qr-code.png';
			downloadLink.click();
		};

		return {
			getImagePath,
			router,
			downloadQRCode,
		};
	},
};
