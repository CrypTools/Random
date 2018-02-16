/*******************************

Use:
	let gen = xorshift()
	console.log(gen.next().value)

*******************************/

function* xorshift() {

	/* ⚠️ Change these values */
	let x = 123456789
	let y = 362436069
	let z = 521288629
	let w = 88675123
	let v = 886756453
	while(true) {
		let t = x ^ (x >> 7)
		x = y
		y = z
		z = w
		w = v
		v = (v ^ (v << 6)) ^ (t ^ (t << 13))
		yield (2 * y + 1) * v;
	}
}

module.exports = xorshift()
