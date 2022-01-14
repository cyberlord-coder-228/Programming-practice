def maskify(string, unmasked_amount=4, mask="#"):
	return f"{mask*len(string[:-unmasked_amount])}{string[-unmasked_amount:]}"
