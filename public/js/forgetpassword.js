const form = document.getElementById('form');
const emailId = document.getElementById('emailId');
console.log(1)
form.addEventListener('submit',sendpasswordreset);

async function sendpasswordreset(e){
    try{
        e.preventDefault();
        console.log(2)
        const UserDetails = {
            emailId:emailId.value
        }
        await axios.post('http://localhost:4000/password/forgetPasswordlink',UserDetails);
    }catch(err){
        console.log(err)
    }
}