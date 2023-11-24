export default function sliceAddress(address: string) {
	return address.slice(0, 6) + "..." + address.slice(-4);
}