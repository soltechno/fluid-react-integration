import './App.css'
import FluidWrapper from './FluidWrapper.jsx';
import { useState } from 'react';
import bonuses from './bonuses.js';
import config from './config.js';
import widget from './widget.js';
import Callout from './components/Callout.jsx';

function App() {
	const [open, setOpen] = useState(false);
	const [transaction, setTransaction] = useState('deposit');
	const [numberOfBonuses, setNumberOfBonuses] = useState(bonuses.length);

	const [loggedIn, setLoggedIn] = useState(false);
	const [scriptLoaded, setScriptLoaded] = useState(false);

	function wallet() {
		setTransaction(undefined);
		setOpen(true);
	}

	function deposit() {
		setTransaction('deposit');
		setOpen(true);
	}

	function withdraw() {
		setTransaction('withdrawal');
		setOpen(true);
	}

	function quickDeposit() {
		setTransaction('quick-deposit');
		setOpen(true);
	}

	function close() {
		setOpen(false);
	}

	function onCommand(event) {
		console.info(`%cFluid COMMAND: ${event.detail}`, 'color: lightgreen', event);

		if (event.detail.message === 'close') {
			close();
		}
	}

	function onInfo(event) {
		console.info(`%cFluid INFO: ${event.detail}`, 'color: cornflowerblue', event);
	}

	function onError(event) {
		console.error(`Fluid ERROR: ${event.detail}`, event);
	}

	function changeNumberOfBonuses() {
		const newNumberOfBonuses = numberOfBonuses - 1 < 0 ? 3 : numberOfBonuses - 1;
		setNumberOfBonuses(newNumberOfBonuses);
		console.log('Number of bonuses set to', newNumberOfBonuses);
	}

	async function initializeFluid() {
		const parameters = {
			operatorId: config.operatorId,
			...widget
		};

		console.log('Initializing Fluid', parameters);

		await fluid.init(parameters);

		console.log('Fluid initialized');
	}

	function getCallout(loggedIn, scriptLoaded) {
		let content = '';

		if (!scriptLoaded) {
			content = '✋ You must load Fluid script first';
		} else if (!loggedIn) {
			content = '🔒 You must log in first to use the wallet';
		}

		if (content) {
			return <Callout>{content}</Callout>;
		} else {
			return null;
		}
	}

	return (
		<>
			<h1>
				<img src="/logo-mark-light.png" alt="Fluid" width={48} style={{ marginRight: '1rem' }}/>
				Fluid
			</h1>

			<div style={{ marginBottom: '1rem' }}>
				<FluidWrapper
					open={open}
					transaction={transaction}
					bonuses={bonuses.slice(0, numberOfBonuses)}
					onInfo={onInfo}
					onCommand={onCommand}
					onError={onError}
					loggedIn={loggedIn}
					scriptLoaded={scriptLoaded}
				/>

				{ getCallout(loggedIn, scriptLoaded) }
			</div>

			<div style={{ marginBottom: '1rem' }}>
				<button onClick={() => setScriptLoaded(!scriptLoaded)} disabled={loggedIn}>
					{ scriptLoaded ? 'Unload Fluid script' : 'Load Fluid script' }
				</button>
			</div>

			<div style={{ marginBottom: '1rem' }}>
				<button onClick={() => setLoggedIn(!loggedIn)}>
					{ loggedIn ? 'Log out' : 'Log in' }
				</button>
			</div>

			<div style={{ marginBottom: '1rem' }}>
				<button onClick={initializeFluid}>
					Initialize Fluid
				</button>
			</div>

			<div style={{ marginBottom: '1rem' }}>
				<button onClick={wallet}>
					Wallet
				</button>
			</div>
			<div style={{ marginBottom: '1rem' }}>
				<button onClick={deposit}>
					Deposit
				</button>
			</div>
			<div style={{ marginBottom: '1rem' }}>
				<button onClick={withdraw}>
					Withdrawal
				</button>
			</div>
			<div style={{ marginBottom: '1rem' }}>
				<button onClick={quickDeposit}>
					Quick Deposit
				</button>
			</div>

			<div style={{ marginBottom: '1rem' }}>
				<button onClick={changeNumberOfBonuses}>
					Change bonuses
				</button>
			</div>
		</>
	)
}

export default App
