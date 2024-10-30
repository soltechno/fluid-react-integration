import { useLayoutEffect, useRef } from 'react';
import { listenForFluidEvents } from './fluidScripts.js';

function FluidInitialised({ onInfo, onCommand, onError, open, transaction }) {
	const ref = useRef(null);

	useLayoutEffect(listenForFluidEvents(ref, onCommand, onInfo, onError), [onCommand, onInfo, onError, ref]);

	return (
		<fluid-widget
			ref={ref}
			id="fluid-widget"
			transaction={transaction}
			open={open}
			balance="1000"
			withdrawable-balance="900"
			selected-bonus=""
			deposit-limit=""
			success-cta-link=""
		/>
	)
}

export default FluidInitialised;
