import { useEffect } from 'react';
import config from '../config.js';

let scriptLoadingFinished = false;

function FluidScript() {
	let script;

	useEffect(() => {
		if (window && document && !scriptLoadingFinished) {
			script = document.createElement('script');
			script.src = config.widgetUrl;
			script.async = true;
			script.type = 'module';
			script.onload = () => {
				console.log('Fluid script loaded');
			};
			document.body.appendChild(script);

			scriptLoadingFinished = true;
		}

		return () => {
			if (script) {
				console.log('Fluid script removed');
				script.remove();
			}
		};
	}, []);
}

export default FluidScript;
