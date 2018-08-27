# [2,2,2,3,3,5,7] = 2520
# 1
# 2
# 3
# 4 = 2x2
# 5
# 6 = 2x3
# 7
# 8 = 2x2x2
# 9 = 3x3
# 10 = 2x5

def lcm(upto):
    all_factors = {}
    for number in xrange(2, upto + 1):
        factorize(number, all_factors)

    return multiply(all_factors)

def factorize(number, factors=None):
    if factors is None: factors = {}
    remainder = number
    factor = 2

    while remainder != 1:
        power = 0
        while remainder % factor == 0:
            power += 1
            remainder /= factor
        if power > 0:
            factors[factor] = max(factors.get(factor, 0), power)
        factor += 1

    return factors

def multiply(factors):
    number = 1
    for factor, power in factors.iteritems():
        number *= factor ** power
    return number

print lcm(10000)

# assert lcm(10) == 2520

# assert factorize(2) == {2:1}
# assert factorize(3) == {3:1}
# assert factorize(4) == {2:2}
# assert factorize(5) == {5:1}
# assert factorize(6) == {2:1,3:1}
# assert factorize(8) == {2:3}
# assert factorize(12) == {2:2,3:1}
# assert factorize(24) == {2:3,3:1}
# assert factorize(1000) == {2:3,5:3}