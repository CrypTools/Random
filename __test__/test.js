// Test made using EyeJS - https://eye.js.org

const path = require('path').normalize(__testDir + "/../")

eye.describe("Marsagalia", () => {
    let marsagalia = require(path + "Marsagalia/js/random.js")
    function hasDuplicates(array) {
        return (new Set(array)).size !== array.length;
    }

    eye.test("Basic test", "node",
        $ => $(marsagalia.next().value).Equal(-1496938456653911600),
        $ => $(marsagalia.next().value).Equal(27221946975667260)
    )
    let results = [-1496938456653911600, 27221946975667260]
    eye.test("True random test", "node",
        $ => $(() => {
            for (var i = 0; i < 1000000; i++) { // 1 millions iterations
                results.push(marsagalia.next().value)
            }
        }).toRun(),
        $ => $(hasDuplicates(results)).Equal(false)
    )
})

eye.describe("ISAAC", () => {
    let isaac = require(path + "ISAAC/js/random.js")

    function hasDuplicates(array) {
        return (new Set(array)).size !== array.length;
    }
    isaac.seed(1)
    eye.test("Basic test", "node",
        $ => $(isaac.random()).isCloseTo(0.7955741931218654),
		$ => $(isaac.random()).isCloseTo(0.5542896427214146)
    )
})

eye.describe("Blum Blum Shub", () => {
    let blum = require(path + "Blum_Blum_Shub/js/random.js")
	const seed = blum.seed(31775567)
	let gen = blum.rand(seed)

    eye.test("Basic test", "node",
        $ => $(gen.next().value).Equal(36),
        $ => $(gen.next().value).Equal(1296)
    )
})

eye.describe("HashShift", () => {
	let HashShift = require(path + "HashShift/js/random.js")
	let gen = HashShift(12)
	eye.test("Basic Test", "node",
		$ => $(gen.next().value).Equal(5),
		$ => $(gen.next().value).Equal(30287),
		$ => $(gen.next().value).Equal(62)
	)
})
