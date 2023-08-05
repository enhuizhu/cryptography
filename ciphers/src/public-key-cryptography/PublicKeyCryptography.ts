/**
 * public key cryptography is a generic cryptographic schema
 * of the following form:
 * 1. let {Ee | e -> []} and { Dd | d -> []} from an encryption
 * schema
 * 2. consider the transformation pairs (Ee, Dd) where knowing Ee
 * it is infeasible. given {c -> []}, to find m -> [] such that
 * Ee(m) = c.
 * 3. this implies that it is infeasible to determine d from e
 * Hence Ee constitutes a trapdoor one-way function with trapdoor d.
 * 
 * Three applications of public key crypto systems.
 * 
 * 1. Encryption/description
 * The sender encrypt a message with the recipient's public key
 * 
 * 2. Key exchange.
 * Two sides cooperate to exchange a session key. Different approaches
 * are possible, involving the private key or keys of one or both parties.
 * 
 * 3. Digital signature.
 * The sender 'signs' a message with their private key
 * 
 * Signing is achieved by a cryptographic algorithm being applied to a message
 * or to a small block of data that is a function of the message.
 * 
 * 
 * Requirements for public key cryptography
 * 
 * 1. it must be computationally easy for any principal B to generate a pair
 * (public key PUb, private key PRb).
 * 
 * 2. it must be computationally easy for sender A, knowing PUb and M, To generate
 * C = E(PUb, M)
 * 
 * 3. It must be computationally easy for receiver B to decrypt C using PRb to recover M:
 * M = D(PRb, C) = D(PRb, E(PUb, M)).
 * 
 * 4. It must be computationally infeasible for an adversary knowing PUb to Determine PRb
 * or knowing PUb and C to recover M
 * 
 * 5. It's useful, but not always necessary, for the two keys applicable in either order:
 * M = D(PUb, E(PRb, M)) = D(PRb, E(PUb, M)).
 * 
 * 
 * 
 */