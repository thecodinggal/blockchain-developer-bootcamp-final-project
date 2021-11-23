# blockchain-developer-bootcamp-final-project
Consensys Blockchain Developer Bootcamp - Final project

Real Estate Property Sales and Transfer Project
1. Users would be able to see the different types of real estate properties for sale with information about the property.
2. If a user is interested in purchasing the property, they can submit a bid for the property (check to make sure the user can afford it + gas fees).
3. The seller can approve or deny the transaction
4. Buyer will see the response of the seller. If the transaction goes through, the money is sent into a "temporary hold" (like an escrow) until the buyer signs a deed. Question: What would count as the "Digitial signature"? Their private key?
5. The money is sent to the seller as soon as the deed is sent back. Proof of sales and proof of ownership will be accessible on the blockchain.

--
Notes for project (notes for myself):
-Can use ERC721 (a NFT standard which should be suitable) to properly represent real estate on the chain
