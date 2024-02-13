const form = document.getElementById('form');
const emailId = document.querySelector('#emailId');
const password = document.querySelector('#password');

form.addEventListener('submit', checkUserCredentials);

async function userExists(email, password) {
    try {
        const token = localStorage.getItem('token')
        const response = await axios.post('http://localhost:4000/expense/login', {
            emailId: email,
            password: password,
            token:token
        });
        return { status: response.status, user: response.data };
    } catch (err) {
        return { status: err.response.status };
    }
}

async function checkUserCredentials(e) {
    e.preventDefault();
    try {
        const { status, user } = await userExists(emailId.value, password.value);
        if (status === 200) {
            alert('Logging in successfully');
            const User = user.token
            console.log(User)
            localStorage.setItem('token',JSON.stringify(User))
            window.location.href = "../views/index.html";
        } else if (status === 401) {
            alert('Wrong credentials');
        } else if (status === 404) {
            alert('User not found');
        } else {
            alert('An error occurred. Please try again later.');
        }
    } catch (err) {
        console.error(err);
        alert('An error occurred. Please try again later.');
    }
}
