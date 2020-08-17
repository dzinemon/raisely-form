import axios from 'axios'

const CHECK_URL = 'https://api.raisely.com/v3/check-user';
const SUBMIT_URL = 'https://api.raisely.com/v3/signup';
const campaignUuid = '46aa3270-d2ee-11ea-a9f0-e9a68ccff42a';

let dataToSend = {
  "campaignUuid": campaignUuid,
  "data": {}
}

const submitForm = async ({firstName, lastName, email, password}) => {
  return axios.post(SUBMIT_URL, {
    ...dataToSend,
    data: {
      firstName,
      lastName,
      email,
      password
    }
  })
  .then(response => {
    console.log(response)
  })
  .catch(error => {
    console.log(error)
  })
}

function checkEmail(str) {
  const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (!re.test(str)) {
    return false;
  }
  return true;
}

async function validateEmail(email) {
  return axios.post(CHECK_URL, {
    ...dataToSend,
    data: {
      "email": email
    }
  })
  .then((response) => {
    console.log(response.data.data.status)
    return new Promise((resolve, reject) => {
      if (response.data.data.status === 'EXISTS') {
        reject()
      } else {
        resolve()
      }
    })    
  })
  .catch((error) => {
    console.log(error);
    return error.response.data;
  })
}


export { validateEmail, checkEmail, submitForm };