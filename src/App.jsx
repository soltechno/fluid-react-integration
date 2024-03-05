import './App.css'
import FluidWrapper from './FluidWidget.jsx';
import { useState } from 'react';
import bonuses from './bonuses.js';

function App() {
	const [open, setOpen] = useState(false);
	const [transaction, setTransaction] = useState('deposit');
	const [numberOfBonuses, setNumberOfBonuses] = useState(bonuses.length);

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

		if (event.detail === 'close') {
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

	return (
		<>
			<h1>
				<img src="/logo-mark-light.png" alt="Fluid" width={48} style={{ marginRight: '1rem' }} />
				Fluid
			</h1>

			<div style={{ marginBottom: '1rem' }}>
				<button onClick={ deposit }>Deposit
				</button>
			</div>
			<div style={{ marginBottom: '1rem' }}>
				<button onClick={ withdraw }>
					Withdrawal
				</button>
			</div>
			<div style={{ marginBottom: '1rem' }}>
				<button onClick={ quickDeposit }>
					Quick Deposit
				</button>
			</div>

			<div style={{ marginBottom: '1rem' }}>
				<button onClick={ changeNumberOfBonuses }>
					Change bonuses
				</button>
			</div>

			<FluidWrapper
				open={open}
				transaction={transaction}
				bonuses={bonuses.slice(0, numberOfBonuses)}
				onInfo={ onInfo }
				onCommand={ onCommand }
				onError={ onError }
			/>
		</>
	)
}

export default App
