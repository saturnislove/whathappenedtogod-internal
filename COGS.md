# OVD landed COGS — source of truth

**These must be written to Shopify variant `inventoryItem.unitCost`, NOT just to
`product_stats.cost`.** `ovd-catalog-sync` runs every 20 minutes and overwrites
`product_stats.cost` from Shopify, so SQL-only updates are erased within the hour.
(`cost_pct` is safe — the sync doesn't touch that column.)

Method: landed cost = line-item unit price + a share of neck-tag print, fold/bag, screen
setup, colour changes, shipping and size upcharges. Client-provided **tees** add $3 for the
blank. Round UP to the next whole dollar.

| Product | Cost | Source |
|---|---|---|
| MYSTERY BOX | 50% of net sales (`cost_pct`) | tiers $55.55 / $111.11 / $166.66 / $222.22 — already in Shopify |
| DIVINE ALIGNMENT GREY FULL ZIP | $30.38 | Printavo #14439 |
| DIVINE ALIGNMENT BLACK FULL ZIP | $30.38 | #14439 |
| DIVINE ALIGNMENT BLACK SWEATPANTS | $23.75 | #14439 |
| DIVINE ALIGNMENT GREY SWEATPANTS | $23.75 | #14439 |
| 222 RHINESTONE ZIP UP | $25.73 | #14439 |
| 222 RHINESTONE BROWN ZIP UP | *uncosted* | client-provided garment, needs that invoice |
| LA 222 CACTUS BROWN TEE | $10 | Saturn |
| LA 222 BRED TEE | $10 | Saturn |
| LA 222 ANGEL WHITE TEE | $10 | Saturn |
| A LETTER 222 MY EX (black, white) | $10 | Saturn |
| LOV333 & L111GHT (brown, white, black) | $10 | Saturn |
| DIVINE FEMININE BLACK TEE / WHITE TEE | $10 | Saturn |
| NY 111 (BRED, CACTUS BROWN, ANGEL WHITE) | $10 | Saturn |
| STARGIRL (TIGER'S ROSE, RUBY ROSE, CYBERNEON) | $10 | Saturn |
| STARGIRL KNIT (black, beige) | $21 | Saturn |
| ANGEL HVY WGHT WASHED TEE | $21 | Xinhui 20230813 — $20.50 incl. air freight |
| DIVINE $8.88 TEE (black, white) | $7 | Printavo #26047 |
| DIVINE 888 HOODIE | $32 | #26047 |
| VITRUVIAN TEE | $28 | #26047 — $24 of it is DTG print |
| SP888DR TEE | $13 | #26047 |
| SP888DR L/S | $34 | #26047 — blank already inside the $27.34 |
| ILOVEUIHATEU TEE | $10 | Printavo #17303 — $919.46 / 100 |
| PUFFER BAG / VEST | $45 | Xinhui — $2,205 / 50 incl. DDP freight + straps |
| 777 ZIP UP (blue, red, green) | $40 | Saturn |
| 777 PUFF TEE (green, blue, red) | $13 | Printavo #15436 — 4-colour puff setup |
| 777 TRUCKER (red, green, blue) | $13 | #15436 + #15886 label removal/sew |
| $7.77 TEE (all colourways) | $8 | #15436 "law of attraction tee" |
| META ANGEL 777 (cyberred, cyberblue, cybergreen) | $10 | #15436 "777 angel tee" |
| All other OVD TRUCKERS (ANG333L, LA, 222, OVD, END OVERDOSE, LOV333, SUNLIGHT, SUNSET) | $12 | Saturn |
| NO FACE FULL ZIP / BLACK TEE / WHITE TEE | $50 | Saturn |

## Still uncosted

HVY MTL run (washed hoodie, washed sweatpants, stone wash cap, END OVERDOSE zip up, OVD
hoodie, OVD sweatpants, OVD black cap) · mesh L/S set (ENIGMA, DIVINE FEMININE, IF LOVE IS
REAL, HVY MTL black + white) · jewellery (S999TURN ear rings, S999TURN pearl necklace, ANGEL
NUMBER NECKLACES) · HEARTAGRAM CROCHET KNIT · YOU DON'T GET ME HIGH ANYMORE BLACK HOODIE ·
END OVERDOSE HVY MTL BLACK HOODIE · END OVERDOSE BLACK TEE · BABY VAMP TEE · OVERDOSE CHROME
LOGO TEE · FIND YOUR LIGHT TEE · DARK ANGEL HEAVYWEIGHT TEE · 222FACED WHITE TEE

## Note

The $7.77 tees sold BELOW cost — $8 landed against a $7.39–$7.59 average selling price,
1,011 units, roughly −$532 gross before fees or ad spend.
