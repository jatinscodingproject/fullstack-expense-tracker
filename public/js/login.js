const form = document.getElementById('form');
const emailId = document.querySelector('#emailId');
const password = document.querySelector('#password');

form.addEventListener('submit', checkUserCredentials);

async function userExists(emailId, password) {
    try {
        const response = await axios.post('http://localhost:4000/expense/login', {
            emailId: emailId,
            password: password
        });
        return response.status;
    } catch (err) {
        return err.response.status;
    }
}

async function checkUserCredentials(e) {
    e.preventDefault();
    try {
        const statusCode = await userExists(emailId.value, password.value);
        if (statusCode === 200) {
            alert('Logging Successfully');
            window.location.href = "http://localhost:4000/expense"
        } else if (statusCode === 401) {
            alert('Wrong credentials');
        } else if (statusCode === 404) {
            alert('User not found');
        } else {
            alert('An error occurred. Please try again later.');
        }
    } catch (err) {
        console.error(err);
        alert('An error occurred. Please try again later.');
    }
}
