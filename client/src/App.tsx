import React, { useCallback, useEffect, useRef, useState } from 'react';
import Web3 from 'web3';
import w3utils from 'web3-utils'
import { networks, abi } from "./contracts/Certification.json";

import './App.css';

function App() {
  const name = useRef<string>('')
  const image = useRef<string>('')
  const useCase = useRef<string>('')
  const initialize = useRef<boolean>(false)
  const [account, setAccount] = useState<string>('')
  const [myContract, setMyContract] = useState<any>()
  const [submited, setSubmited] = useState<boolean>(false)
  const [isNeedSchool, setIsNeedSchool] = useState<boolean>(false)

  const firstRender = useRef(false);
  useEffect(() => {
    async function init() {
      let provider = window.ethereum
      if (provider) {
        window.web3 = new Web3(provider);
        await provider.request({ method: 'eth_requestAccounts' })
        console.log('new provider');
      } else if (window.web3) {
        window.web3 = new Web3(window.web3.currentProvider)
        console.log('currentProvider');
      }
      else {
        window.alert('non ethereum browser detected. You should consider to trying metamask')
      }

      const web3 = new Web3(provider)
      let accounts = await web3.eth.getAccounts()
      setAccount(accounts[0])
      window.ethereum.on("accountsChanged", async function () {
        // Time to reload your interface with accounts[0]!
        accounts = await web3.eth.getAccounts();
        // accounts = await web3.eth.getAccounts();
        setAccount(accounts[0])
        console.log(accounts);
      });
      console.log(account);
      let networkId = Object.keys(networks)[0] as keyof typeof networks;
      const networkData = networks[networkId]
      if (networkData) {
        setMyContract(new web3.eth.Contract(abi as w3utils.AbiItem[], networks[networkId].address))
        console.log('contract created');
      } else {
        window.alert('certification dapp not deployed in this network')
      }
      window.ethereum.on('chainChanged', function (_chainId: any) {
        networkData === _chainId ? window.location.reload()
          : window.alert('certification dapp not deployed in this network')
      });
      initialize.current = true
    }
    if (!initialize.current) { init() }
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
    async function createCourse(name: string, IPFShash: string) {
      return myContract.methods.fetchCourse(account).call({ from: account })
    }
    async function createCertificate(name: string, IPFShash: string) {
      return myContract.methods.fetchCertificate(account).call({ from: account })
    }
    async function fetchStudent() {
      console.log('adress account', account);
      return myContract.methods.fetchStudent(account).call({ from: account })
    }
    async function fetchSchool() {
      console.log('adress account', account);
      return myContract.methods.fetchSchool(account).call({ from: account })
    }
    async function fetchCourse() {
      console.log('adress account', account);
      return myContract.methods.fetchCourse(account).call({ from: account })
    }
    async function fetchCertificate() {
      console.log('adress account', account);
      return myContract.methods.fetchCertificate(account).call({ from: account })
    }
    async function fetchToWeb3() {
      try {
        if (useCase.current === "student") {
          await createStudent(name.current, image.current)
          const result = await fetchStudent()
          console.log('fetchStudent', result);
        }
        if (useCase.current === "school") {
          await createSchool(name.current, image.current)
          const result = await fetchSchool()
          console.log('fetchStudent', result);
        }
        if (useCase.current === "course") {
          await createCourse(name.current, image.current)
          const result = await fetchCourse()
          console.log('fetchCourse', result);
        }
        if (useCase.current === "certificate") {
          await createCertificate(name.current, image.current)
          const result = await fetchCertificate()
          console.log('fetchCertificate', result);
        }
      } catch (err) {
        console.error(err);
      }
    }
    if (submited) {
      fetchToWeb3().catch(error => console.error(error))
      setSubmited(false)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [submited])

  function handleSubmit(e: any) {
    e.preventDefault()
    setSubmited(true)
    useCase.current = e.target.useCase.value
    name.current = e.target.name.value
    image.current = e.target.image.value
  }


  return (
    <div className="App">
      <nav>
        <h1>{account}</h1>
        {isNeedSchool ? <h2>you need to be a school to create course or certificate</h2> : null}
      </nav>
      <form onSubmit={handleSubmit}>
        <select
          required id="useCase"
          onChange={(e) => {
            e.target.value === "course" || e.target.value === "certificate" ? setIsNeedSchool(true) : setIsNeedSchool(false)
          }}
        >
          <option value="chose">chose</option>
          <option value="student">student</option>
          <option value="school">school</option>
          <option value="course">course</option>
          <option value="certificate">certificate</option>
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
