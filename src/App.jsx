import { useEffect, useState } from "react";
import "./App.css";

export default function App() {
    const [scriptLoaded, setScriptLoaded] = useState(false);
	const [open, setOpen] = useState(false);
	const [transaction, setTransaction] = useState('deposit');
    const [loggedIn, setLoggedIn] = useState(false);
    const [bonuses, setBonuses] = useState([]);
    const [selectedBonus, setSelectedBonus] = useState('');

    const bonusesData = [
        {
            code: "DepositBonus",
            title: "Different Bonus (Reactive)",
            description: "100% up to 200€ + 10 Mega Spins",
            maxBonus: "200",
            maxBonusPercentage: "150",
            minDeposit: "10",
            termsAndConditions: "Welcome Offer Terms And Conditions 1...",
        },
    ];

    const init = async () => {
        window.fluid.init({
            operatorId: 10000001,
            userId: "user1",
            locale: "en",
            currencyCode: "EUR",
            countryCode: "IRL",
            sessionId: "-3nhr1rf7dhql9rqola9s9"
        });

    };

    useEffect(() => {

        console.log('useEffect');
        let script;

        if (window && document && !scriptLoaded) {
            script = document.createElement("script");
            script.src = "https://get.fluidpayments.io/index.js";
            script.id = "fluid-script";
            script.async = true;
            script.onload = () => {
                setScriptLoaded(true);
            };
            document.head.appendChild(script);
        }

        return () => {
            if (script) {
                script.remove();
            }
        };
    }, []);

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

    function addBonuses() {
        setBonuses(JSON.stringify(bonusesData));
    }

    function removeBonuses() {
        setBonuses(JSON.stringify([]));
    }

    function addSelectedBonus() {
        setSelectedBonus('DepositBonus');
    }

    function removeSelectedBonus() {
        setSelectedBonus('');
    }


    return (
        <div className="App">

        <h1>
            <img src="/logo-mark-light.png" alt="Fluid" width={48} style={{ marginRight: '1rem' }}/>
            Fluid React Integration
        </h1>

        <div style={{ marginBottom: '1rem' }}>
            <button onClick={init}>
                window.fluid.init(...
            </button>
        </div>

        <div style={{ marginBottom: '1rem' }}>
            <button onClick={() => setLoggedIn(!loggedIn)}>
                { loggedIn ? 'Log out' : 'Log in' }
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
            <button onClick={addBonuses}>
                Add bonuses
            </button>
            <button onClick={removeBonuses}>
                Remove bonuses
            </button>
        </div>

        <div style={{ marginBottom: '1rem' }}>
            <button onClick={addSelectedBonus}>
                Add selected bonus
            </button>
            <button onClick={removeSelectedBonus}>
                Remove selected bonus
            </button>
        </div>

        <div className="wrapper">
            wrapper
            {loggedIn && (
                <fluid-widget
                    id="fluid-widget"
                    transaction={transaction}
                    open={open}
                    balance="1000"
                    withdrawable-balance="900"
                    bonuses={bonuses}
                    selected-bonus={selectedBonus}
                ></fluid-widget>
            )}
            </div>
        </div>
    );
}