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
                refresh()
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

document.getElementById('buy_premium').onclick = async function (e) {
    try {
        console.log(1)
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:4000/expense/premiumMembership', {
            headers: {
                'Authorization': token
            }
        })
        console.log(2)
        var options = {
            'key': response.data.key_id,
            'order_id': response.data.order.id,
            'handler': async function (response) {
                await axios.post('http://localhost:4000/updateTransactionStatus', {
                    order_id: options.order_id,
                    payment_id: response.razorpay_payment_id
                }, { headers: { 'Authorization': token } })
                alert('You are Premium member Now')
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