def lcm(upto):
    result = 1
    for num in xrange(2, (upto + 1)):
        if result % num != 0:
            factor = 1
            while num > factor:
                factor += 1
                while num % factor == 0:
                    num /= factor
            result *= factor
    return result

print lcm(10000)
