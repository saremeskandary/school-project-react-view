import React, { useCallback, useEffect, useRef, useState } from 'react';
import Web3 from 'web3';
import w3utils from 'web3-utils'
import { networks, abi } from "./contracts/Certification.json";

import './App.css';

function App() {
  const [name, setName] = useState<string>('')
  const [image, setImage] = useState<string>('')
  const [useCase, setUseCase] = useState<string>()
  const [account, setAccount] = useState<string>('')
  const [initialize, setInitialize] = useState<boolean>(false)
  const [myContract, setMyContract] = useState<any>()
  const [submited, setSubmited] = useState<boolean>(false)

  const firstRender = useRef(false);
  useEffect(() => {
    async function init() {
      let provider = window.ethereum
      if (provider) {
        window.web3 = new Web3(provider)
        await provider.enable()
        console.log('new provider');
      } else if (window.web3) {
        window.web3 = new Web3(window.web3.currentProvider)
        console.log('currentProvider');
      }
      else {
        window.alert('non ethereum browser detected. You should consider to trying metamask')
      }

      const web3 = new Web3(provider)
      const accounts = await web3.eth.getAccounts()
      setAccount(accounts[0])
      console.log(account);
      let networkId = Object.keys(networks)[0] as keyof typeof networks;
      const networkData = networks[networkId]
      if (networkData) {
        setMyContract(new web3.eth.Contract(abi as w3utils.AbiItem[], networks[networkId].address))
        console.log('contract created');
      } else {
        window.alert('certification dapp not deployed in this network')
      }
      setInitialize(true)
    }
    if (!initialize) { init() }     
    if (firstRender) {
      fetchData()
    }    
  })


  const fetchData = useCallback(() => {
    async function createStudent(name: string, IPFShash: string) {
      return myContract.methods.createStudent(name, IPFShash).send({ from: account })
    }
    async function createSchool(name: string, IPFShash: string) {
      return myContract.methods.createSchool(name, IPFShash).send({ from: account })
    }
    // async function createCourse(name: string, IPFShash: string) {
    //   return myContract.methods.fetchCourse(account).call({ from: account })
    // }
    async function fetchStudent() {
      console.log('adress account', account);
      return myContract.methods.fetchStudent(account).call({ from: account })
    }
    async function fetchSchool() {
      console.log('adress account', account);
      return myContract.methods.fetchSchool(account).call({ from: account })
    }
    async function fetchToWeb3() {
      
      try {
        if (useCase === "student") {
          await createStudent(name, image)
          const result = await fetchStudent()
          console.log('fetchStudent', result);
        }
        if (useCase === "school") {
          await createSchool(name, image)
          const result = await fetchSchool()
          console.log('fetchStudent', result);
        }
      } catch (err) {
        console.error(err);
      }
    }
    if (submited) {
      fetchToWeb3().catch(error => console.error(error))
      setSubmited(false)
    }
  }, [submited])

  async function handleSubmit(e: any) {
    e.preventDefault()
    console.log(e.target.useCase.value);
    setSubmited(true)
    setUseCase(e.target.useCase.value)
    setName(e.target.name.value)
    setImage(e.target.image.value)
  }
  return (
    <div className="App">
      <nav><h1>{account}</h1></nav>
      <form onSubmit={handleSubmit}>
        <select
          required id="useCase"
        >
          <option value="chose">chose</option>
          <option value="student">student</option>
          <option value="school">school</option>
        </select>
        <label>
          Name:
          <input
            type="text"
            required id="name"
          />
        </label>
        <label>
          additional info like image IPFS:
          <input
            type="text"
            required id="image"
          />
        </label>
        <input type="submit" value="Submit" onSubmit={() => {
          console.log('afds');
        }} />
      </form>
    </div>
  );
}

export default App;
