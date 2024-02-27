const form = document.getElementById('form');
const amount = document.querySelector('#amount');
const description = document.querySelector('#description');
const category = document.querySelector('#category');

form.addEventListener('submit', sendData);


function showDetails(expenseData) {
    const expenseDetails = document.getElementById('expense_details');
    const ultag = document.createElement('ul');
    expenseData.forEach(expensedata => {
        const litag = document.createElement('li');
        const delbtn = document.createElement('button');
        const editbtn = document.createElement('button');

        delbtn.className = 'btn btn-danger';
        editbtn.className = 'btn btn-success';

        editbtn.textContent = 'edit';
        delbtn.textContent = 'delete';

        delbtn.id = expensedata.id
        editbtn.id = expensedata.id

        litag.textContent = `${expensedata.amount}-${expensedata.description}-${expensedata.category}`

        litag.appendChild(delbtn);
        litag.appendChild(editbtn);
        ultag.appendChild(litag);

        delbtn.addEventListener('click', async function () {
            const dId = delbtn.id
            console.log(dId)
            try {
                const token = localStorage.getItem('token');
                await axios.get(`http://localhost:4000/expense/delete/${dId}`, {
                    headers: {
                        'Authorization': token
                    }
                })
            } catch (err) {
                console.log(err)
            }
        })

        editbtn.addEventListener('click', async function () {
            const eId = editbtn.id
            console.log(eId)
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get(`http://localhost:4000/expense/edit/${eId}`, {
                    headers: {
                        'Authorization': token
                    }
                });
                const expenseDetails = {
                    amount: response.data.amount,
                    description: response.data.description,
                    category: response.data.category,
                }
                amount.value = expenseDetails.amount
                description.value = expenseDetails.description
                category.value = expenseDetails.category

                await axios.get(`http://localhost:4000/expense/delete/${eId}`, {
                    headers: {
                        'Authorization': token
                    }
                })
                refresh()
            } catch (err) {
                console.log(err)
            }
        })
    });
    expenseDetails.appendChild(ultag)
}

async function sendData(e) {
    e.preventDefault()
    const expenseDetails = {
        amount: amount.value,
        description: description.value,
        category: category.value,
    }
    try {
        const token = localStorage.getItem('token')
        let response = await axios.post('http://localhost:4000/expense', expenseDetails, {
            headers: {
                'Authorization': token
            }
        })
        console.log(response.data)
        let arr = []
        arr.push(response.data)
        showDetails(arr)
    } catch (err) {
        console.log(err)
    }
}

async function refresh() {
    try {
        const token = localStorage.getItem('token')
        console.log(token)
        const decodedtoken = parseJwt(token)
        console.log(decodedtoken)
        const IsPremium = decodedtoken.IsPremiumUser
        if(IsPremium){
            showMessage()
        }
        const response = await axios.get('http://localhost:4000/expense/data', {
            headers: {
                'Authorization': token
            }
        })
        showDetails(response.data)
    } catch (err) {
        console.log(err)
    }
}
document.addEventListener('DOMContentLoaded', refresh())

function parseJwt (token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
}

function showMessage(){
    const button = document.getElementById('buy_premium');
    const new_button = document.createElement('button');
    
    button.style.display = 'none'
    button.insertAdjacentText('afterend','You are Premium User');
    showLeaderboard()
}

document.getElementById('buy_premium').onclick = async function (e) {
    try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:4000/expense/premiumMembership', {
            headers: {
                'Authorization': token
            }
        })
        var options = {
            'key': response.data.key_id,
            'order_id': response.data.order.id,
            'handler': async function (response) {
                const res = await axios.post('http://localhost:4000/updateTransactionStatus', {
                    order_id: options.order_id,
                    payment_id: response.razorpay_payment_id
                }, { headers: { 'Authorization': token } })
                alert('You are Premium member Now')
                const button = document.getElementById('buy_premium');
                
                button.style.display = 'none'
                button.insertAdjacentText('afterend','You are Premium User');
                console.log(res.data.token)
                localStorage.setItem('token',res.data.token);
                showLeaderboard()
            }
        }
        const rzp1 = new Razorpay(options);
        rzp1.open();
        e.preventDefault();

        rzp1.on('payment.failed', function (response) {
            console.log(response);
            alert('Your transaction failed')
        })
    }catch(err){
        console.log(err)
    }
}

async function showLeaderboard(){
    const container = document.getElementById('booking_field');
    const leaderboardButton = document.createElement('button');
    const linebreak = document.createElement('br')
    const report_generation = document.createElement('button')

    
    leaderboardButton.setAttribute.type = 'button'
    leaderboardButton.className = 'btn btn-danger'
    leaderboardButton.textContent = 'Show LeaderBoard'
    leaderboardButton.setAttribute.id = 'leaderboard'
    leaderboardButton.style.marginTop = "10px"

    report_generation.setAttribute.type = 'button'
    report_generation.className = 'btn btn-dark'
    report_generation.textContent = 'Generate Report'
    report_generation.style.marginTop = '10px'

    leaderboardButton.onclick = async function(e){
        const token = localStorage.getItem('token');
        console.log(token)
        const responseleaders = await axios.get('http://localhost:4000/leaderboard', {
            headers:{
                'Authorization':token
            }
        })
        console.log(responseleaders.data)
        showLearders(responseleaders.data) 
    }
    container.append(linebreak);
    container.append(leaderboardButton);
    container.append(linebreak);
    container.append(report_generation);

    report_generation.onclick = async function(e){
        //e.preventDefault();
        console.log(1)
        try{
            window.location.href = '../views/report.html'
        }catch(err){
            console.log(err)
        }
    }
}

function showLearders(leaderboard){
    const container = document.getElementById('leaderboard_details')
    const ultag = document.createElement('ul');
    const h1 = document.createElement('h1');
    h1.textContent = 'LeaderBoard'
    console.log(leaderboard)
    leaderboard.forEach(leaders => {
        const litag = document.createElement('li');
        litag.textContent = `Name:-${leaders.UserName}  expenses:-${leaders.totalExpense}`
        ultag.appendChild(litag)
    })
    container.appendChild(h1)
    container.appendChild(ultag)
}
