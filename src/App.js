import { useContext, useState } from "react";
import { Web3Context} from "web3-hooks";
import {ethers} from 'ethers'
function App() {
  const [web3State, login] = useContext(Web3Context);
  const [ethBalance, setEthBalance] = useState(0);
  const [address, setAddress] = useState(ethers.constants.AddressZero);
  const [eth2Send,setEth2Send] = useState(0)
  //console.log(web3State)
  const handleClickGetBalance = async () => {
    try {
      const balance = await web3State.provider.getBalance(address)
      console.log(balance)
      setEthBalance(balance);
    }catch(e){
      console.log(e)
    }
  }
  const handleClickSend = async () => {
    const weiAmount = ethBalance
     try {
       const tx =await web3State.signer.sendTransaction({
         to: address,
         value: weiAmount,
       })
       await tx.wait()
       console.log('TX MINED')
       console.log(tx);
     } catch (e) {
       console.log(e);
     }
  }
  return (
    <>
      <h1>Hello world</h1>
      <p>Metamask installed {web3State.isMetaMask ? "yes" : "no"}</p>
      <p>web3 injected {web3State.isWeb3 ? "yes" : "no"}</p>
      {!web3State.isLogged && (
        <>
          <button onClick={login}>login</button>
        </>
      )}
      <p>Network id: {web3State.chainId}</p>
      <p>Network name: {web3State.networkName}</p>
      <p>Account: {web3State.account}</p>
      <p>Balance: {web3State.balance}</p>
      <label htmlFor="balanceOf"></label>
      <input
        id="balenceOf"
        type="text"
        value={address}
        placeholder="ethereum address"
        onChange={(e) => {
          setAddress(e.target.value);
        }}
      />
      <button onClick={handleClickGetBalance}>get Balance</button>
      <p>
        Balance Of {address}: {ethers.utils.formatEther(ethBalance)} ETHER
      </p>
      <label htmlFor="eth2Send"></label>
      <input
        id="eth2Send"
        type="text"
        value={ethers.utils.formatEther(eth2Send)}
        placeholder="ethereum amount"
        onChange={(e) => setEth2Send(ethers.utils.parseEther(e.target.value))}
      />
      <button onClick={handleClickSend}>send</button>
    </>
  );
}

export default App;
