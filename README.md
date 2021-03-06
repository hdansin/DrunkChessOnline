# Drunk Chess


Chess but the pieces are too drunk to remember what they are.


## About


Drunk chess is a project that I am making for fun. It plays like normal chess with all the same movement rules and win conditions, except two random pieces switch every time the player makes a move. The pieces that switch are the player's own color, and the king cannot be one of them. Hopefully it is a fun variant that is not quite as competitive and is safe to play a little inebriated without worrying about your rating :).

Try out the alpha version on [Heroku](https://drunk-chess.herokuapp.com)

## TODO

- [x] Prototype the core gameplay
- [x] Implement Socket.io
- [x] Add visual/audio cues that indicate opponent moves and switched pieces
- [x] Add game won or lost messages
- [x] Add rematch/new game button
- [x] Make it a little pretty
- [x] Deploy to Heroku
- [x] Refactor visual piece placement code (hopefully make it less buggy)
- [x] Add ability to move pieces by clicking (alternative to drag and drop)
- [ ] Make it mobile friendly
- [ ] Make it better looking on smaller screens
- [ ] Make the game creation and join experience more user friendly
  - [x] Add copy clipboard button for join code
  - [ ] Make ui snazzyish
- [ ] Add bells and whistles
  - [ ] Show material count
  - [ ] Record the game
  - [ ] Give more feedback about which pieces switched
  - [ ] Make the game over/check indicators fancier
- [ ] Add ability to play against computer
  - [ ] incorporate tiny chess ai so the moves aren't just random
- [ ] Test and test and test and test
