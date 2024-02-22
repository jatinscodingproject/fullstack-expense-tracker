const form = document.getElementById('form');
const Username = document.querySelector('#Username');
const emailId = document.querySelector('#emailId');
const password = document.querySelector('#password');
const loginbtn = document.querySelector('#login_btn')

form.addEventListener('submit', adduserDetails);

async function userExists(emailId) {
    const response = await axios.get(`http://localhost:4000/expense/signup/data/exists?emailId=${emailId}`);
    return response.data.exists;
}

async function adduserDetails(e) {
    e.preventDefault();
    const UserDetails = {
        Username: Username.value,
        emailId: emailId.value,
        password: password.value
    }
    try {
        const exists = await userExists(emailId.value);
        if (exists) {
            alert('Email ID has already been used.');
        } else {
            await axios.post(`http://localhost:4000/expense/signup`, UserDetails);
            console.log('User Added Successfully');
            // Username.value = ``
            // emailId.value = ``
            // password.value = ``
        }
        window.location.href = '../views/login.html'
    } catch (err) {
        console.log(err);
    }
}

loginbtn.addEventListener('click',loginpage)

function loginpage(e){
    e.preventDefault();
    window.location.href = `../views/login.html`
}