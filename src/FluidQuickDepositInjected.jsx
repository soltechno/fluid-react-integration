import { useLayoutEffect, useRef } from 'react';
import { listenForFluidEvents } from './fluid/fluidScripts.js';
import config from './config.js';
import widget from './widget.js';
import bonuses from './bonuses.js';

function FluidQuickDepositInjected({ onInfo, onCommand, onError }) {
	const ref = useRef(null);

	useLayoutEffect(listenForFluidEvents(ref, onCommand, onInfo, onError), [onCommand, onInfo, onError, ref]);

	return (
		<fluid-quick-deposit
			ref={ref}
			id="fluid-quick-deposit"
			operator-id={config.operatorId.toString()}
			user-id={widget.userId}
			session-id={widget.sessionId}
			locale={widget.locale}
			currency={widget.currencyCode}
			country={widget.countryCode}
			bonuses={JSON.stringify(bonuses || [])}
			user-data={JSON.stringify(widget.userData)}
		/>
	)
}

export default FluidQuickDepositInjected;
