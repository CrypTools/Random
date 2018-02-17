/********************************

 Use:
    let seed = seed(31775567, 5651, 5623)  // last 2 values are optional
    var blum = BlumGen(31775567, 5651, 5623) // last 2 values are optional

    print(blum.rand())

 *******************************/


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

func gcd(_ x: Int, _ y: Int) -> Int {
    var a = x
    var b = y
    while a != b {
        if  a > b {
            a = a - b
        } else {
            b = b - a
        }
    }
    return a
}

func seed(_ s: Int, _ p: Int = 5651, _ q: Int = 5623) -> Int {
    let M = p * q
    if s == 0 {
        print("The seed x[0] cannot be 0")
        return -1
    } else if s == 1 {
        print("The seed x[0] cannot be 1")
        return -1
    } else if gcd(s, M) != 1 {
        print("The seed x[0] must be co-prime to \(M)")
        return -1
    } else {
        return s
    }
}
class BlumGen {
    let s: Int;
    var p: Int
    var q: Int
    var M: Int
    var x: Int
    init(_ s: Int, _ p: Int = 5651, _ q: Int = 5623) {
        self.s = s
        self.p = p;
        self.q = q;
        self.M = p * q;
        self.x = s;
    }
    func rand() -> Int {
        var cachedx = x;
        cachedx = cachedx * x;
        cachedx = cachedx % M;
        x = cachedx;
        return x
    }
}
