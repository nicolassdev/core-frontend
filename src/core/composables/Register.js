import { httpGet, httpPost, httpPut, httpDel } from 'boot/axios';
import { ref, readonly } from 'vue';
import axios from 'axios';

/**
 * Send sms to any mobile numbers
 * @param {*} object
 */
const SendOTP = (payload) => {
  return new Promise((resolve, reject) => {
    httpPost('core/validateMobileNumber/', payload, {
      success(response) {
        resolve(response.data);
      },
      catch(response) {
        reject(response);
      },
    });
  });
};

const ValidateOTP = (payload) => {
  return new Promise((resolve, reject) => {
    httpGet(
      `core/validateMobileNumber`,
      {
        success(response) {
          resolve(response.data);
        },
        catch(response) {
          reject(response);
        },
      },
      payload
    );
  });
};


export { SendOTP, ValidateOTP };
