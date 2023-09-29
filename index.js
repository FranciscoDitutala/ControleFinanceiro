const transactionUL = document.getElementById('transactions')
const totalBalance = document.getElementById('total')
const totalIncome = document.getElementById('income')
const totalExpense = document.getElementById('expense')
const form = document.querySelector('form')
const amountInput = document.querySelector('#amount')
const nameInput = document.getElementById('name_transaction')


const localStorageTransactions  = JSON.parse(localStorage
    .getItem('transactions')) 
let transactions = localStorage
    .getItem('transactions') != null ? localStorageTransactions : []

const removeTransaction = ID =>{
    transactions = transactions
    .filter(transaction => transaction.id != ID)
    updateLocalStorage()
    init()
}
const addTransactionIntoDom = transaction =>{
    const operator = transaction.amount < 0 ? '-' : '+'
    const CSSClass = transaction.amount < 0 ?'minus' : 'plus'
    const amountWithoutOperator = Math.abs(transaction.amount)
    const li = document.createElement('li')
    li.classList.add(CSSClass)
    li.innerHTML =` 
    ${transaction.name}
     <span> ${operator} R$ ${ amountWithoutOperator}</span>
    <button type="submit" class="delete-btn" onClick="removeTransaction(${transaction.id})">
    x
     </button>
    `
    transactionUL.append(li)
    console.log(li)

}

const updateBalanceValues = ()=>{
    const transactionsAmount = transactions.map(transaction =>transaction.amount )
    const total = transactionsAmount
    .reduce((accumulator , transaction) => accumulator + transaction, 0)
    .toFixed(2)

    const income =  transactionsAmount
    .filter(value1 => value1 > 0)
    .reduce((accumulator,  transaction) => accumulator+transaction, 0)
    .toFixed(2)
    const expense =  Math.abs(
        transactionsAmount.filter(value1 => value1 < 0)
        .reduce((accumulator,  transaction) => accumulator+transaction, 0)
    ).toFixed(2)

    totalBalance.textContent = `
    R$ ${total}
    `
    totalIncome.textContent = `
    R$ ${income}
    ` 
    totalExpense.textContent = `
    R$ ${expense}
    `
}

const init=()=>{
    transactionUL.innerHTML=''
    transactions.forEach(addTransactionIntoDom)
    updateBalanceValues()
}
init()
const  updateLocalStorage = () =>{
    localStorage.setItem('transactions', JSON.stringify(transactions))
}
const generateID = Math.round(Math.random()*1000)

const cleanInput =()=>{
    nameInput.value=''
    amountInput.value=''
}

const addToTransactionArray=(transactionName, transactionAmount)=>{
    
    transactions.push({ 
        id:generateID,
         name : transactionName, 
         amount:Number(transactionAmount) 
     })
    
}
const handleFormSubmit = event => {
    event.preventDefault()
    const  transactionName = nameInput.value.trim()
    const transactionAmount = amountInput.value.trim()

    if (transactionName==='' || transactionAmount ==='') {
        alert('Preencha todos campos obrigatorio')
        return   
    }
        addToTransactionArray(transactionName, transactionAmount)    
        init()
        updateLocalStorage()  
        cleanInput()
  
}
form.addEventListener('submit', handleFormSubmit)