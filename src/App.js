import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [name,setName]=useState('');
  //defaukt name and setname 
  const [datetime,setDatetime]=useState('');
  const [description,setDescription]=useState('');
  const [transactions,setTransactions]=useState([]);
  //use state for the transaction
  //now getting the usestate for the current transaction and displaying it  
  useEffect(() =>{
    getTransactions().then(setTransactions);
  },[]);
  async function getTransactions(){
    const url=process.env.REACT_APP_API_URL+'/transactions';
    const response=await fetch(url);//by default it is get
    const json=await response.json();
    return json;
  }
  
  function addNewTransaction(ev){
    ev.preventDefault();//to prevent refreshing on reload of data
    const url=process.env.REACT_APP_API_URL + '/transaction';
    const price=name.split(' ')[0];
    //fetch(url);
    fetch(url,{
      method:'POST',
      headers:{'Content-type':'application/json'},
      body:JSON.stringify({
        price,
        name:name.substring(price.length+1),
        description,
        datetime,
      })
    }).then(response=>{
      response.json().then(json =>{
        setName('');
        setDatetime('');
        setDescription('');
        console.log('result',json);
      });
    });
    //console.log(url);
  }
  //calculating the total balance 
  let balance=0;
  for(const transaction of transactions){
    balance=balance+transaction.price;
  }
  balance=balance.toFixed(2);//2 decimal places 
  const fraction=balance.split('.')[1];
  balance=balance.split('.')[0];


  return (
    <main>
      <h1>{balance}</h1>
      <form onSubmit={addNewTransaction}>
        <div className="basic">
        <input type="text" 
        value={name}
        onChange={ev=>setName(ev.target.value)} //ev is the event 
        placeholder={'+200 nwe samsung tv'} />
        <input value={datetime}
        onChange={ev=>setDatetime(ev.target.value)} 
        type="datetime-local" />
        </div>
        <div className="description">
        <input type="text" 
        value={description}
        onChange={ev=>setDescription(ev.target.value)}
        placeholder={'description'} />
        </div>
        <button type="submit">Add new transaction</button>
      </form>
      <div className="transactions">
        {transactions.length>0 && transactions.map(transaction => (
          <div className="transaction">
          <div className="left">
            <div className="name">{transaction.name}</div>
            <div className="description">{transaction.description}</div>
          </div>
          <div className="right">
            <div className={"price "+ (transaction.price<0 ?'red':'green')}>
              {transaction.price}</div>
            <div className="datetime">2022-04-20</div>
          </div>
        </div>
        ))}
      </div>
    </main>
  );
}

export default App;
