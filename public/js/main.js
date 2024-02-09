const form = document.getElementById('form');
const amount = document.querySelector('#amount');
const description = document.querySelector('#description');
const category = document.querySelector('#category');

form.addEventListener('submit',sendData);


function showDetails(expenseData){
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

        delbtn.addEventListener('click', async function(){
            const dId = delbtn.id
            console.log(dId)
            try{
                await axios.get(`http://localhost:4000/expense/delete/${dId}`)
                refresh()
            }catch(err){
                console.log(err)
            }
        })

        editbtn.addEventListener('click', async function(){
            const eId = editbtn.id
            console.log(eId)
            try{
                const response = await axios.get(`http://localhost:4000/expense/edit/${eId}`);
                const expenseDetails = {
                    amount:response.data.amount,
                    description:response.data.description,
                    category:response.data.category
                }
                amount.value = expenseDetails.amount
                description.value = expenseDetails.description
                category.value = expenseDetails.category

                await axios.get(`http://localhost:4000/expense/delete/${eId}`)
                refresh()
            }catch(err){
                console.log(err)
            }
        })
    });
    expenseDetails.appendChild(ultag)
}

async function sendData(e){
    e.preventDefault()
    const expenseDetails = {
        amount:amount.value,
        description:description.value,
        category:category.value
    }
    try{
        let response = await axios.post('http://localhost:4000/expense',expenseDetails)
        console.log(response.data)
        let arr = []
        arr.push(response.data)
        showDetails(arr)
    }catch(err){
        console.log(err)
    }
}

async function refresh(){
    try{
        const response = await axios.get('http://localhost:4000/expense/data')
        showDetails(response.data)
    }catch(err){
        console.log(err)
    }
}
document.addEventListener('DOMContentLoaded',refresh())