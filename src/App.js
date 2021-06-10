import { useContext } from 'react';
import {Web3Context, web3Context} from'web3-hooks'
function App() {
 const [web3State, login]=useContext(Web3Context)
 console.log(web3State)
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
    </>
  );
}

export default App;
