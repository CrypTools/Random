// Test made using EyeJS - https://eye.js.org

const path = require('path').normalize(__testDir + "/../")

let random = require(path + "random.js")

function hasDuplicates(array) {
    return (new Set(array)).size !== array.length;
}

eye.test("Basic test", "node",
	$ => $(random.next().value).Equal(-1496938456653911600),
	$ => $(random.next().value).Equal(27221946975667260)
)
let results = [-1496938456653911600, 27221946975667260]
eye.test("True random test", "node",
	$ => $(() => {
		for (var i = 0; i < 10000000; i++) { // 10 millions iterations
			results.push(random.next().value)
		}
	}).toRun(),
	$ => $(hasDuplicates(results)).Equal(false)
)
