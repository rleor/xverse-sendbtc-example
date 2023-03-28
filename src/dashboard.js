import React from "react";
import { 
  getAddress, 
  signTransaction
} from 'sats-connect';
import { psbt } from "./psbt";

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      paymentAddress: "",
      paymentPublicKey: "",
      ordinalsAddress: "",
      ordinalsPublicKey: "",
    };
  }

  componentDidMount() {

  }
  onPSBTClick = async () => {
    console.log(psbt());
  };

  onConnectClick = async () => {

    const getAddressOptions = {
      payload: {
        purposes: ["payment", "ordinals"],
        message: 'Address for sats',
        network: {
          type:'Testnet'
        },
      },
      onFinish: (response) => {
        console.log(response)
        // alert(response.addresses[1].publicKey)
        this.setState({
        })
      },
      onCancel: () => alert('Request canceled'),
    }
    
    await getAddress(getAddressOptions);
  };

  onSignTransactionClick = async () => {
    let encoded = psbt();
    const signPsbtOptions = {
      payload: {
        network: {
            type:'Testnet'
        },
        message: 'Sign Transaction',
        psbtBase64: encoded,
        broadcast: true,
        inputsToSign: [{
            address: "2NEmyev3ZPi3JVtFRZGy6CyAa6jQ1bQbjKq",
            signingIndexes: [0],
        }],
      },
      onFinish: (response) => {
        console.log(response)
        alert(response.psbtBase64)
      },
      onCancel: () => alert('Canceled'),
    }
    await signTransaction(signPsbtOptions);
  }

  render() {
    return (
      <div style={{ padding: 30 }}>
        Sats Connect Test App
          <div>
            <br />
            {this.state.paymentAddress && <div>Payment Address: {this.state.paymentAddress}</div>}
            {this.state.ordinalsAddress && <div>Ordinals Address: {this.state.ordinalsAddress}</div>}

            <div style={{ background: "lightgray", padding: 30, margin: 10 }}>
              <button
                style={{ height: 30, width: 180 }}
                onClick={this.onPSBTClick}
              >
                Generate PSBT
              </button>
            </div>

            <div style={{ background: "lightgray", padding: 30, margin: 10 }}>
              <button
                style={{ height: 30, width: 180 }}
                onClick={this.onConnectClick}
              >
                Connect
              </button>
            </div>

            <div style={{ background: "lightgray", padding: 30, margin: 10 }}>
              <button
                style={{ height: 30, width: 180 }}
                onClick={this.onSignTransactionClick}
              >
                Sign Transaction
              </button>
            </div>
            <br />
          </div>

      </div>
    );
  }
}

export default Dashboard;
