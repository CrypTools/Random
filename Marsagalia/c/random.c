#include <stdio.h>

static unsigned long x = 123456789, y = 362436069, z = 521288629, w = 88675123, v = 886756453;
/* replace defaults with five random seed values in calling program */
unsigned long xorshift(void) {
	unsigned long t;
	t = (x ^ (x >> 7));
	x = y;
	y = z;
	z = w;
	w = v;
	v = (v ^ (v << 6)) ^ (t ^ (t << 13));
	return (y + y + 1) * v;
}

int main() {
	printf("Generating 5 random numbers from defaults\n");
	for (size_t i = 0; i < 5; i++) {
		printf("%lu\n", xorshift());
	}
}
