const download_report = document.getElementById('download_btn');

download_report.addEventListener('click', downloadReport);

async function downloadReport(e){
    e.preventDefault();
    try{
        const token = localStorage.getItem('token');
        const res = await axios.get('http://localhost:4000/User/report/download',{
            headers:{
                'Authorization':token
            }
        })
        const allfiles = await axios.get('http://localhost:4000/User/allfilesDownloaded',{
            headers:{
                'Authorization':token
            }
        })
        console.log(allfiles)
        showDownloadedFiles(allfiles.data)

    }catch(err){
        console.log(err)
    }
}

function showDownloadedFiles(allfiles){
    const fileUrlContainer = document.getElementById('fileurl');
    const ul = document.createElement('ul');
    allfiles.forEach(files => {
        const newLi = document.createElement('li');
        newLi.textContent = files.FileUrl;
        ul.appendChild(newLi);
    });
    fileUrlContainer.appendChild(ul);                                                                                                                                                                                                                   
}

async function generate_report_data(){
    const page = 1
    const token = localStorage.getItem('token')
    const res = await axios.get(`http://localhost:4000/User/report/generation?pages=${page}`,{
        headers:{
            'Authorization':token
        }
    })
    console.log(res.data)
    generateReport(res.data.expenses)
    showPagination(res.data)
}

async function generateReport(data){
    const daily_report = document.getElementById('Daily_report')

    data.forEach(expensedata => {
        const tr  = document.createElement('tr')
        const td1 = document.createElement('td')
        const td2 = document.createElement('td')
        const td3 = document.createElement('td')
        const td4 = document.createElement('td')
        const td5 = document.createElement('td')

        td1.textContent = `${expensedata.updatedAt.split('T')[0]}`
        td2.textContent = `${expensedata.description}`
        td3.textContent = `${expensedata.category}`
        td4.textContent = `not specified`
        td5.textContent = `${expensedata.amount}`

        td1.style.backgroundColor = 'rgb(218, 218, 241)'
        td2.style.backgroundColor = 'rgb(218, 218, 241)'
        td3.style.backgroundColor = 'rgb(218, 218, 241)'
        td4.style.backgroundColor = 'rgb(218, 218, 241)'
        td5.style.backgroundColor = 'rgb(218, 218, 241)'

        tr.appendChild(td1)
        tr.appendChild(td2)
        tr.appendChild(td3)
        tr.appendChild(td4)
        tr.appendChild(td5)
        
        daily_report.appendChild(tr)
    })    
}

function showPagination({
    currentPage,
    hasNextPage,
    nextPage,
    hasPreviousPage,
    previousPage,
    lastPage
}){
    const pagination = document.getElementById('pagination')
    pagination.innerHTML = '';

    if(hasPreviousPage){
        const btn2 = document.createElement('button');
        btn2.innerHTML = previousPage
        btn2.addEventListener('click', () => generateReportPage())
        pagination.appendChild(btn2)
    }
    const btn1 = document.createElement('button')
    btn1.innerHTML = `<h3>${currentPage}</h3>`
    btn1.addEventListener('click',() => generateReportPage())
    pagination.appendChild(btn1)
    if(hasNextPage){
        const btn3 = document.createElement('button')
        btn3.innerHTML = nextPage
        btn3.addEventListener('click', () => generateReportPage())
        pagination.appendChild(btn3)
    }
}

function generateReportPage(){
    
}

document.addEventListener('DOMContentLoaded', generate_report_data)































