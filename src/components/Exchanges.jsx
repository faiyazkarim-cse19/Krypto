import React, { useState } from 'react';
 
import { AiFillFilter, AiFillPlayCircle } from "react-icons/ai";
import { BsInfoCircle } from "react-icons/bs";
import { Select, Col, Avatar } from 'antd';
import icon from '../images/cryptocurrency.png';
import { useGetCryptosQuery } from '../services/cryptoApi';
import LoaderE from "./LoaderE";
import "./table.css"
import datar from "./mock-data.json"
import Axios from 'axios';
 
const companyCommonStyles = "min-h-[70px] sm:px-0 px-2 sm:min-w-[120px] flex justify-center items-center border-[0.5px] border-gray-400 text-sm font-light text-white";
 
 
const Exchanges = ({ email }) => {
 
  //const [email, setEmail] = useState("");
  const [coin, setCoin] = useState("");
  const [amount, setAmount] = useState(0);
  const [prices, setPrices] = useState([]);
  var cost;
  var priceOfTransactions;

  const [transactionsList, setTransactionsList] = useState([]);
  const [fund, setFund] = useState([]);
  const [isShown, setIsShown] = useState(false);

  const handleClick = event => {
    setIsShown(current => !current);
    getBalance();
  };

  const setbuyingPrice = () => {
    fund.map((val, key) => { cost = parseFloat(val.funds) })
    console.log("CTN")
    console.log(cost)
    setPricevalues();
  }  

  const setPricevalues = () => {
    prices.map((val, key) => {
 
      console.log("hi_1")
      console.log((val.coin));
      console.log("hi_2")
      
 
      let flag = (val.coin).localeCompare(coin)
      console.log(flag);
 
      if (!flag)
      {
        priceOfTransactions = parseFloat(val.price) * amount;
        console.log("CTN2")
        console.log(priceOfTransactions)
      }
     })
     addIntoInput();
  }
 
  const addIntoInput = () => {
    if(amount < 0)
    {
      alert("Negative input not allowed!");
    }

    else if (priceOfTransactions > cost)
    {
      alert("You don't have Sufficient Funds!")
    }

    else
    {
    Axios.post("http://localhost:3001/create", {
      email: email,
      coin: coin,
      amount: amount,
      priceOfTransactions: priceOfTransactions,
    }).then(() => {
      console.log("success")
    });
    showInfo();
    alert("Transaction Successfull!");
  }
  };
 
  // this looks like an issue, fetching data and setting state in the render phase
  // leads to weird bugs, interesting that it's not causing an infinite loop since the state
  // is being set here, which would fire a re-render of the component

  const getBalance = () => {
    Axios.post("http://localhost:3001/funds", {email : email}).then((response) => {
      setFund(response.data);
      console.log("Successful Funds")
      console.log(fund)
    })
    getPrices();
  }

  const getBalancetoo = () => {
    Axios.post("http://localhost:3001/funds", {email : email}).then((response) => {
      setFund(response.data);
      console.log("Successful Funds")
      console.log(fund)
    })
  }

  const getPrices = () => {
    Axios.get("http://localhost:3001/prices").then((response) => {
      setPrices(response.data)
      console.log("Successful Prices")
      console.log(prices)
    })
  }
 
  const showInfo = () => {
  Axios.post("http://localhost:3001/transactions", {email : email}).then((response) => {
    console.log(response);
    setTransactionsList(response.data);
  });
  getBalancetoo();
  };

  const NotEnoughFunds = () => {
    
    console.log(email + coin + amount);
  };

  /*const showInfo = () => {
    Axios.get ('http://localhost:3001/transactions', {
     email: email,
    }).then((response) => {
        if(response.data.message)
        {
            alert(response.data.message);
        }
        else
        {  
            console.log(response);
            setTransactionsList(response.data);
        }
    });
 }*/
  
  
  const displayInfo = () => {
    alert("Message");
    console.log(email + coin + amount);
  };
 
  const handleSubmit = () => {
    
  }
 
 
  const { data } = useGetCryptosQuery(100);
 
  return (
    <div className="flex w-full justify-center items-center">
      <div className="flex mf:flex-row flex-col items-start justify-between md:p-20 py-12 px-4">
        <div className="flex flex-1 justify-start items-start flex-col mf:mr-10">
          <h1 className="text-3xl sm:text-5xl text-white text-gradient py-1">
            Send Crypto <br /> across the world
          </h1>
          <p className="text-left mt-5 text-black font-light md:w-9/12 w-11/12 text-base">
            Explore the crypto world. Buy and sell cryptocurrencies easily on Krypto.
          </p>
          
 
          <div className="grid sm:grid-cols-3 grid-cols-2 w-full mt-10">
            <div className={`rounded-tl-2xl boxBG ${companyCommonStyles}`}>
              Reliability
            </div>
            <div className={`boxBG ${companyCommonStyles}`}>Security</div>
            <div className={`sm:rounded-tr-2xl boxBG ${companyCommonStyles}`}>
              Krypto
            </div>
            <div className={`sm:rounded-bl-2xl boxBG ${companyCommonStyles}`}>
              Web 3.0
            </div>
            <div className={`boxBG ${companyCommonStyles}`}>Low Fees</div>
            <div className={`rounded-br-2xl boxBG ${companyCommonStyles}`}>
              Blockchain
            </div>
          </div>
        </div>
 
        <div className="flex flex-col flex-1 items-center justify-start w-full mf:mt-0 mt-10">
          <div className="p-3 flex justify-end items-start flex-col rounded-xl h-40 sm:w-72 w-full my-5 eth-card .white-glassmorphism ">
            <div className="flex justify-between flex-col w-full h-full">
              <div className="flex justify-between items-start">
                <div className="w-10 h-10 rounded-full border-2 border-white flex justify-center items-center">
                    <Avatar src={icon} size="large" />
                </div>  
                <BsInfoCircle fontSize={17} color="#fff" />
              </div>
              <div>
                <p className="text-white font-light text-sm">
                  Address
                </p>
                <p className="text-white font-semibold text-lg mt-1">
                  Krypto
                </p>
              </div>
            </div>
          </div>
 
          
          
          <div>
            <button onClick={handleClick}  
            className="hulu-btn text-black w-full mt-2 border-[1px] p-4 border-[#3d4f7c] hover:bg-[#3d4f7c] rounded-full cursor-pointer">
              
                Start Transactions
              
            </button>
 
            
 
            {isShown && (
              <div>
                <h1 className="text-3xl sm:text-5xl text-white text-gradient py-1">
                   {fund.map((val, key) => {
                    return <div className='hoise'> 
                      <h1 className="text-3xl sm:text-5xl text-white text-gradient py-1">
                      $ {val.funds} </h1>
                      </div>
                      
                  })}
                </h1>
              </div>
                )}
 
            {/* 👇️ show elements on click */}
            {isShown && (
              <div className="p-5 sm:w-96 w-full flex flex-col justify-start items-center blue-glassmorphism">
              
                  <select className="my-2 w-full rounded-sm p-2 outline-none bg-transparent text-black border-none text-sm white-glassmorphism" 
                          onChange={(event) => {setCoin(event.target.value); }} name="coins" id="coins" placeholder="Select a Crypto"
                          optionFilterProp="children"
                          filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                    >
                    {data?.data?.coins?.map((currency) => <option value={currency.name}>{currency.name}</option>)}
                  </select>
    
              
              <input className="my-2 w-full rounded-sm p-2 outline-none bg-transparent text-white border-none text-sm white-glassmorphism" 
                     placeholder="Amount" name="amount" type="number" step="0.0001"
                     onChange={(event) => {setAmount(event.target.value)}}
                     />
    
              <div className="h-[3px] w-full bg-blue-400 my-2" /> 
    
    
                    <button
                      type="button"
                      onClick={setbuyingPrice}
                      className="text-white w-full mt-2 border-[1px] p-2 border-[#3d4f7c] hover:bg-[#3d4f7c] rounded-full cursor-pointer"
                    >
                      Buy
                    </button>
    
              </div>
 
              
            )}
 
            {isShown && (
                    <div className="app-container sm:rounded-tr-2xl" >
                    <table>
                      <thead>
                        <tr>
                          <th>CryptoCurrency</th>
                          <th>Amount</th>
                        </tr>
                      </thead>
        
                      <tbody>
                        {transactionsList.map((val, key) => {
                          return (
                          <tr>
                            <td>{val.T_coin}</td>
                            <td>{val.T_amount}</td>
                          </tr>
                        )})}
                      </tbody>
                    </table>
                  </div>
            )}    
          </div>
   
 
        </div>
      </div>
    </div>
  );
};
 
export default Exchanges;