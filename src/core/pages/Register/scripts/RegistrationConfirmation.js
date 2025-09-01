import { ref, onMounted, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';

import html2canvas from 'html2canvas';
import { resetForm } from '../composables';
import { mobileHeaderTitle } from 'src/core/composables/Triggers';
import { PersonalQRCode } from '../../../composables/UserManagement';
export default {
  setup() {
    const router = useRouter();
    // Empty Form for QR-Code Value
    const qrLink = ref({
      format: '',
    });

    const getImagePath = (logo) => {
      return require(`../../../../assets/img/${logo}`);
    };

    onMounted(() => {
      mobileHeaderTitle.value = 'Personal Account Registration';
    });

    const downloadQRCode = () => {
      // Select the HTML element to be converted to an image
      const element = document.getElementById('qr_code');

      // Use html2canvas to convert the element to an image
      html2canvas(element).then(function (canvas) {
        // Create a temporary link to download the image
        const a = document.createElement('a');
        a.href = canvas.toDataURL('image/png');
        a.download = 'personal_qr_code.png';
        a.style.display = 'none';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      });
    };

    /**
     * Unmounted Function
     *  - Reset Form once leave on page
     */
    onUnmounted(() => {
      resetForm();
    });

    return {
      getImagePath,
      router,
      downloadQRCode,
      PersonalQRCode
    };
  },
};
