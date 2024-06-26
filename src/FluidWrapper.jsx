import { useEffect, useLayoutEffect, useRef } from 'react';
import config from './config';

let scriptLoaded = false;

function FluidWrapper({ open, transaction, bonuses,  onInfo, onCommand, onError }) {
	const ref = useRef(null);
	let script;

	useEffect(() => {
		if (window && document && !scriptLoaded) {
			script = document.createElement('script');
			script.src = config.widgetUrl;
			script.async = true;
			script.onload = () => {
				console.log('Fluid script loaded');
			};
			document.head.appendChild(script);

			scriptLoaded = true;
		}

		return () => {
			if (script) {
				script.remove();
			}
		};
	}, []);

	useLayoutEffect(() => {
		const fluid = ref.current;

		fluid.addEventListener('fluid-command', onCommand);
		fluid.addEventListener('fluid-info', onInfo);
		fluid.addEventListener('fluid-error', onError);

		return () => {
			fluid.removeEventListener('fluid-command', onCommand);
			fluid.removeEventListener('fluid-info', onInfo);
			fluid.removeEventListener('fluid-error', onError);
		}
	}, [onCommand, onError, onInfo, ref]);

	return (
		<fluid-widget
			ref={ref}
			id="fluid-widget"
			operator-id={ config.operatorId }
			user-id="10001"
			session-id="10000"
			locale="en"
			country="IRL"
			currency="EUR"
			transaction={ transaction }
			open={ open }
			balance="1000"
			withdrawable-balance="900"
			mode="wave"
			selected-bonus=""
			bonuses={ JSON.stringify(bonuses || []) }
			user-data={ JSON.stringify({}) }
			deposit-limit=""
			success-cta-link="">
		</fluid-widget>
	);
}

export default FluidWrapper;
