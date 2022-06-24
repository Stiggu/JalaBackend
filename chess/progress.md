- ✅ Onion Architecture
- ✅ Board with pieces
- ✅ Pieces have information
- ✅ A Player plays a single piece on their turn
- ✅ White plays first
- ✅ Game status text
- ✅ Neither player can expose their king to a check-mate
- ✅ Piece Logic
- ✅ Be able to capture pieces
- ✅ Two pieces can't occupy the same spot
- ✅ Checkmate
- ❌ REFACTOR OH GOD
- ❌ Use a database (Inversion is done and entities were being done)

__________________
- Board refactor needs to be done, instead of using pieces|null, to have a board that only contains pieces and calculate everything from there, would make looping faster and less casting to piece
- File/Rank mapping needs to also be changed (Even though this is not necessary if board structure changes)
