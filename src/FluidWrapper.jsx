import { useEffect, useLayoutEffect, useRef } from 'react';
import config from './config';
import widget from './widget.js';

let scriptLoadingFinished = false;

function FluidWrapper({ open, transaction, bonuses,  onInfo, onCommand, onError, loggedIn, scriptLoaded }) {
	const ref = useRef(null);
	let script;

	useEffect(() => {
		if (scriptLoadingFinished || !scriptLoaded) {
			return;
		}

		if (window && document && !scriptLoadingFinished) {
			script = document.createElement('script');
			script.src = config.widgetUrl;
			script.async = true;
			script.type = 'module';
			script.onload = () => {
				console.log('Fluid script loaded');
			};
			document.head.appendChild(script);

			scriptLoadingFinished = true;
		}

		return () => {
			if (script) {
				script.remove();
			}
		};
	}, [scriptLoadingFinished, scriptLoaded]);

	useLayoutEffect(() => {
		if (!loggedIn) {
			return;
		}

		const fluid = ref.current;

		fluid.addEventListener('fluid-command', onCommand);
		fluid.addEventListener('fluid-info', onInfo);
		fluid.addEventListener('fluid-error', onError);

		return () => {
			fluid.removeEventListener('fluid-command', onCommand);
			fluid.removeEventListener('fluid-info', onInfo);
			fluid.removeEventListener('fluid-error', onError);
		}
	}, [onCommand, onError, onInfo, ref, loggedIn]);

	return loggedIn && (
		<fluid-widget
			ref={ref}
			id="fluid-widget"
			operator-id={config.operatorId.toString()}
			user-id={widget.userId}
			session-id={widget.sessionId}
			locale={widget.locale}
			country={widget.countryCode}
			currency={widget.currencyCode}
			transaction={transaction}
			open={open}
			balance="1000"
			withdrawable-balance="900"
			mode="wave"
			selected-bonus=""
			bonuses={JSON.stringify(bonuses || [])}
			user-data={JSON.stringify(widget.userData)}
			deposit-limit=""
			success-cta-link="">
		</fluid-widget>
	);
}

export default FluidWrapper;
