import React, { useCallback, useEffect, useRef, useState } from 'react';
import Web3 from 'web3';
import w3utils from 'web3-utils'
import { networks, abi } from "./contracts/Certification.json";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Nav, Container, Form, Button, FloatingLabel, Spinner } from 'react-bootstrap';

import './App.css';


// TODO if network or accaunt changed cantract should update but nothing happend
export default function App() {
  const name = useRef<string>('')
  const image = useRef<string>('')
  const useCase = useRef<string>('')
  const initialize = useRef<boolean>(false)
  const [account, setAccount] = useState<string>('')
  const [myContract, setMyContract] = useState<any>()
  const [isNeedSchool, setIsNeedSchool] = useState<boolean>(false)
  const [validated, setValidated] = useState(false);
  const [isSent, setIsSent] = useState<boolean>(false)
  const firstRender = useRef(false);

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
        setIsSent(true)
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
        setIsSent(false)
      } catch (err) {
        console.error(err);
        setIsSent(false)
      }
    }
    if (validated) {
      fetchToWeb3().catch(error => console.error(error))
      setValidated(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [validated])

  useEffect(() => {
    if (!initialize.current) { init() }
    if (firstRender) {
      fetchData()
    }
  })

  function handleSubmit(event: any) {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {

      event.stopPropagation();
    }

    setValidated(true);
    useCase.current = event.target.useCase.value
    name.current = event.target.name.value
    image.current = event.target.image.value
  }


  return (
    <div className="App">
      <Container fluid="md">
        <Nav className="justify-content-start" activeKey="/home">
          <Nav.Item>
            <Nav.Link eventKey="disabled" disabled>
              your address is : {account}
            </Nav.Link>
          </Nav.Item>
        </Nav>
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <FloatingLabel label="what do you wana create?">
            <Form.Select
              aria-label="Floating label select example"
              required
              id="useCase"
              onChange={(e) => {
                console.log(e.target.value)
                e.target.value === "course" || e.target.value === "certificate" ? setIsNeedSchool(true) : setIsNeedSchool(false)
              }}
            >
              <option >Open menu</option>
              <option value="student">student</option>
              <option value="school">school</option>
              <option value="course">course</option>
              <option value="certificate">certificate</option>
            </Form.Select>
          </FloatingLabel>
          <br />

          <Form.Group className="mb-3" controlId="name">
            <Form.Label>name</Form.Label>
            <Form.Control type="name" placeholder="Enter name" />
            {isNeedSchool ? <Form.Text style={{ color: "red" }}>note that you need to be a school to create a course or certificate</Form.Text> : null}
          </Form.Group>
          <Form.Group className="mb-3" controlId="image">
            <Form.Label>image</Form.Label>
            <Form.Control type="name" placeholder="Enter image" />
          </Form.Group>
          {!isSent ?
            <Button variant="primary" type="submit">
              Submit
            </Button> :
            <Button variant="primary" disabled>
              <Spinner
                as="span"
                animation="grow"
                size="sm"
                role="status"
                aria-hidden="true"
              />
              Loading...
            </Button>
          }
        </Form>
      </Container>
    </div>
  );
}
