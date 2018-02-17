/*============================================

Use:
	const blum = require("./random.js")
	const seed = blum.seed(31775567)
	const gen = blum.rand()
	console.log(gen.next().value)

==============================================*/


/**
An implementation of the Blum Blum Shub pseudorandom number generator proposed
in 1986 by Lenore Blum, Manuel Blum and Michael Shub that is derived from
Michael O. Rabin's oblivious transfer mapping.
Blum Blum Shub takes the form
            2
	x    = x  mod M
	 n+1    n
where M = pq is the product of two large primes p and q. At each step of the
algorithm, some output is derived from x[n+1]; the output is commonly either
the bit parity of x[n+1] or one or more of the least significant bits of
x[n+1].
The seed x[0] should be an integer that is co-prime to M (i.e. p and q are not
factors of x[0]) and not 1 or 0.
The two primes, p and q, should both be congruent to 3 (mod 4) (this guarantees
that each quadratic residue has one square root which is also a quadratic
residue) and gcd(phi(p - 1), phi(q - 1)) should be small (this makes the cycle
length large).
In this implementation, p = 5651 and q = 5623.
*/

/** Get the gcd of two numbers, A and B. */
function gcd(a, b) {
    while (a != b) {
        if (a > b) {
            a = a - b;
        } else {
            b = b - a;
        }
    }
    return a;
}

/** Seed the random number generator. */
function seed(s) {
    var p = 5651;
    var q = 5623;
    var M = p * q;
    if (s == 0) {
        return "The seed x[0] cannot be 0";
    } else if (s == 1) {
        return "The seed x[0] cannot be 1";
    } else if (gcd(s, M) != 1) {
        return "The seed x[0] must be co-prime to " + M.toString();
    } else {
        return s;
    }
}

function* rand(s) {
    var p = 5651;
    var q = 5623;
    var M = p * q;
    var x = s;
    while (true) {
        var cachedx = x;
        cachedx = cachedx * x;
        cachedx = cachedx % M;
        x = cachedx;
        yield x;
    }
}

module.exports = {
    seed: seed,
    rand: rand
}
