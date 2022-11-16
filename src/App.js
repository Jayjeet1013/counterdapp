import { useState } from 'react';
import {ethers} from 'ethers';
import './App.css';
import Counter from './artifacts/contracts/Counter.sol/Counter.json';

const counterAddress = '0x5FbDB2315678afecb367f032d93F642f64180aa3';

const provider = new ethers.providers.Web3Provider(window.ethereum); // with metamask
const signer = provider.getSigner();
const contract = new ethers.Contract(counterAddress,Counter.abi,signer);




function App() {

  const [count,setCount] = useState(0);
  const [counter,setCounter] = useState(0);
  
 const setCountHandler = async () =>{
  const result = await contract.setCount(count);
  result.wait();
  console.log(result);
 }

 const getCountHandler = async () =>{
  const result = await contract.count();
  setCounter(parseInt(result));
  console.log(`current count is  ${parseInt(result)}`)

 }

  return (
    <div className="App">
      <header className="App-header">
     <h1>COunter Dapp</h1>
     <input placeholder='Enter counter value'  type='number' onChange={(event)=> setCount(event.target.value)} />
     <button onClick={setCountHandler}>Set count</button>
     <br/>
     <button onClick={getCountHandler}>GEt COunt</button>  
     <p> counter value is {counter}</p>
      </header>
    </div>
  );
}

export default App;
