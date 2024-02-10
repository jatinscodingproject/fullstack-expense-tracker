const form = document.getElementById('form');
const emailId = document.querySelector('#emailId');
const password = document.querySelector('#password');

form.addEventListener('submit',checkUserCredentials)

async function userExists(emailId,Password) {
    const response = await axios.get(`http://localhost:4000/expense/login`);
    return response.data.exists;
}

async function checkUserCredentials(e) {
    e.preventDefault();
    try {
        const exists = await userExists(emailId.value,password.value);
        if (exists) {
            alert('Logging Succesfully');
        } else {
            alert('wrong credentials')
        }
    } catch (err) {
        console.log(err);
    }
}
