import { useLayoutEffect, useRef } from 'react';
import { listenForFluidEvents } from './fluidScripts.js';

function FluidQuickDepositInitialised({ onInfo, onCommand, onError }) {
	const ref = useRef(null);

	useLayoutEffect(listenForFluidEvents(ref, onCommand, onInfo, onError), [onCommand, onInfo, onError, ref]);

	return (
		<fluid-quick-deposit
			ref={ref}
			id="fluid-quick-deposit"
		/>
	)
}

export default FluidQuickDepositInitialised;
