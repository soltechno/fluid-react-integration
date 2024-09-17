export function listenForFluidEvents(ref, onCommand, onInfo, onError) {
	return () => {
		const fluid = ref.current;

		fluid.addEventListener('fluid-command', onCommand);
		fluid.addEventListener('fluid-info', onInfo);
		fluid.addEventListener('fluid-error', onError);

		return () => {
			fluid.removeEventListener('fluid-command', onCommand);
			fluid.removeEventListener('fluid-info', onInfo);
			fluid.removeEventListener('fluid-error', onError);
		}
	}
}
