def largest_prime_factor(number):
    remainder = number
    factor = 2

    while remainder != 1:
        if remainder % factor == 0:
            remainder /= factor
        else:
            factor += 1
    return factor

print largest_prime_factor(600851475143)
