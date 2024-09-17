import { useLayoutEffect, useRef } from 'react';
import { listenForFluidEvents } from './fluidScripts.js';
import config from '../config.js';
import widget from '../widget.js';
import bonuses from '../bonuses.js';

function FluidInjected({ onInfo, onCommand, onError, open, transaction }) {
	const ref = useRef(null);

	useLayoutEffect(listenForFluidEvents(ref, onCommand, onInfo, onError), [ onCommand, onInfo, onError, ref ]);

	return <fluid-widget
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
}

export default FluidInjected;
