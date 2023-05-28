import { TIMEOUT_SEC } from './config.js';

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

export const AJAX = async function (url, uploadData = undefined) {
  try {
    const fecthPro = uploadData
      ? fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(uploadData)
      })
      : fetch(url);

    const response = await Promise.race([fecthPro, timeout(TIMEOUT_SEC)]);
    const result = await response.json();

    // Handling errors
    if (!response.ok) throw new Error(`${result.messsage}`);
    return result;
  } catch (error) {
    console.error(error);
    throw error;
  };
}

/* export const getJSON = async function (url) {
  try {
    const response = await Promise.race([fetch(url), timeout(TIMEOUT_SEC)]);
    const result = await response.json();

    // Handling errors
    if (!response.ok) throw new Error(`${result.messsage}`);
    return result;
  } catch (error) {
    console.error(error);
    throw error;
  };
};

export const sendJSON = async function (url, upload) {
  try {
    const response = await Promise.race([fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(upload)
    }), timeout(TIMEOUT_SEC)]);
    const result = await response.json();

    // Handling errors
    if (!response.ok) throw new Error(`${result.messsage}`);
    return result;
  } catch (error) {
    console.error(error);
    throw error;
  };
}; */