class Surface {
  constructor(surface_box, surface_2D, surface_2D_row, makingArrayCount) {
    this.surface_box = surface_box;
    this.surface_2D = surface_2D;
    this.surface_2D_row = surface_2D_row;
    this.makingArrayCount = makingArrayCount;
  }

  setSurface() {
    // making array of the snake box element
    for (let i = 0; i < 20; i++) {
      for (let j = 0; j < 20; j++) {
        this.surface_2D_row.push(this.surface_box[this.makingArrayCount++]);
      }
      this.surface_2D.push(this.surface_2D_row);
      this.surface_2D_row = [];
    }
  }

  printSurface() {
    // Printing color in the box
    for (let i = 0; i < 20; i++) {
      for (let j = 0; j < 20; j++) {
        if (i % 2 == 0 && j % 2 == 0) {
          this.surface_2D[i][j].style = "background-color: rgb(127 201 151)";
          this.surface_2D[i][j].setAttribute("color", "rgb(127 201 151)");
        } else if (i % 2 != 0 && j % 2 == 0) {
          this.surface_2D[i][j].style = "background-color: #4da669";
          this.surface_2D[i][j].setAttribute("color", "#4da669");
        } else if (i % 2 != 0 && j % 2 != 0) {
          this.surface_2D[i][j].style = "background-color: rgb(127 201 151)";
          this.surface_2D[i][j].setAttribute("color", "rgb(127 201 151)");
        } else {
          this.surface_2D[i][j].style = "background-color: #4da669";
          this.surface_2D[i][j].setAttribute("color", "#4da669");
        }
      }
    }
  }
}
class Frog {
  constructor() {
    this.deadFrog;
    this.frogPosition;
  }
}

class Snake extends Frog {
  constructor(snakeCurrentPosition, surfaceObj) {
    super();
    this.lengthOfSnake = 3;
    this.snakeCurrentPosition = snakeCurrentPosition;
    this.Head0Index = 10;
    this.Head1Index = 6;
    this.surfaceObj = surfaceObj;
    this.eatFrogScore = 0;
    this.isIncludePositionValue = 0;
  }
  displaySnake() {
    for (let i = 0; i < this.lengthOfSnake; i++) {
      if (i === this.lengthOfSnake - 1) {
        this.surfaceObj.surface_2D[this.snakeCurrentPosition[i][0]][
          this.snakeCurrentPosition[i][1]
        ].style =
          "background-color: rgb(215 221 216); border: 4px solid rgb(103 62 62); box-sizing: border-box;";
      } else {
        this.surfaceObj.surface_2D[this.snakeCurrentPosition[i][0]][
          this.snakeCurrentPosition[i][1]
        ].style =
          "background-color: rgb(41 76 38); border: 5px solid rgb(170 208 156); box-sizing: border-box;";
      }
    }
  }
  updateSnakeHead(right, left, up, down) {
    this.updateRow = up + down;
    this.updateColumn = right + left;
  }
  isIncludePosition() {
    this.snakeCurrentPosition.map((element) => {
      if (element[0] === this.Head0Index && element[1] === this.Head1Index) {
        this.isIncludePositionValue = 1;
      }
    });
  }
  displayRandomFrog() {
    this.getRandomNumberForRow = Math.floor(Math.random() * 20);
    this.getRandomNumberForColumn = Math.floor(Math.random() * 20);
    this.surfaceObj.surface_2D[this.getRandomNumberForRow][
      this.getRandomNumberForColumn
    ].style.backgroundColor === "red";
    this.surfaceObj.surface_2D[this.getRandomNumberForRow][
      this.getRandomNumberForColumn
    ].innerHTML = `
        <div style="width:100%;height:100%; background-color: #7e4cc0;border-radius:20px;">
        <img style="width:100%;height:100%" src="CSS/Img/Frog.png" />
        </div>
        `;
  }
  eatFrog() {
    if (
      this.getRandomNumberForRow === this.Head0Index &&
      this.getRandomNumberForColumn === this.Head1Index
    ) {
      this.surfaceObj.surface_2D[this.getRandomNumberForRow][
        this.getRandomNumberForColumn
      ].innerHTML = ``;
      this.eatFrogScore++;
      this.displayRandomFrog();
      return 1;
    }
    return 0;
  }
  displayScore() {
    document.getElementById("frog_score_number").innerText = this.eatFrogScore;
  }

  moveSnake() {
    setInterval(() => {
      this.Head0Index = this.Head0Index + this.updateRow;
      this.Head1Index = this.Head1Index + this.updateColumn;
      // checking if the snake chrash in it's own body
      this.isIncludePosition();
      if (
        // this is implement if the snake goes out of the boundry
        this.Head0Index < 0 ||
        this.Head0Index > 19 ||
        this.Head1Index < 0 ||
        this.Head1Index > 19
      ) {
        location.reload();
      } else if (this.isIncludePositionValue) {
        // this will implement if the snake chrash in it's own body
        location.reload();
        console.log("include");
      } else {
        if (this.eatFrog()) {
          this.snakeCurrentPosition.push([this.Head0Index, this.Head1Index]);
          // to put the previous color while moving
          this.surfaceObj.surface_2D[this.snakeCurrentPosition[0][0]][
            this.snakeCurrentPosition[0][1]
          ].style = `background-color:${this.surfaceObj.surface_2D[
            this.snakeCurrentPosition[0][0]
          ][this.snakeCurrentPosition[0][1]].getAttribute(
            "color"
          )}; transition-duration:150ms ;`;

          this.lengthOfSnake++;
          this.displaySnake();
          this.eatFrog();
          this.displayScore();
        } else {
          this.snakeCurrentPosition.push([this.Head0Index, this.Head1Index]);
          this.surfaceObj.surface_2D[this.snakeCurrentPosition[0][0]][
            this.snakeCurrentPosition[0][1]
          ].style = `background-color:${this.surfaceObj.surface_2D[
            this.snakeCurrentPosition[0][0]
          ][this.snakeCurrentPosition[0][1]].getAttribute(
            "color"
          )}; transition-duration:130ms ;`;
          // to remove the body content of the snake while moving
          this.snakeCurrentPosition.shift();
          this.displaySnake();
          this.eatFrog();
          this.displayScore();
        }
      }
    }, 130);
  }
}

surfaceObj = new Surface(
  document.getElementsByClassName("snake_box"),
  [],
  [],
  0
);
surfaceObj.setSurface();
surfaceObj.printSurface();

snakeObj = new Snake(
  [
    [10, 4],
    [10, 5],
    [10, 6],
  ],
  surfaceObj
);

let moveSnakeOneTime = 1;
document.addEventListener("keydown", (e) => {
  if (moveSnakeOneTime) {
    if (e.keyCode == "38") {
      // up arrow
      snakeObj.updateSnakeHead(0, 0, -1, 0);
      snakeObj.moveSnake();
    } else if (e.keyCode == "40") {
      // down arrow
      snakeObj.updateSnakeHead(0, 0, 0, 1);
      snakeObj.moveSnake();
    } else if (e.keyCode == "37") {
      // left arrow
      snakeObj.updateSnakeHead(-1, 0, 0, 0);
      snakeObj.moveSnake();
    } else if (e.keyCode == "39") {
      // right arrow
      snakeObj.updateSnakeHead(0, 1, 0, 0);
      snakeObj.moveSnake();
    }
    moveSnakeOneTime = 0;
  } else {
    if (e.keyCode == "38") {
      // up arrow
      snakeObj.updateSnakeHead(0, 0, -1, 0, e.keyCode);
    } else if (e.keyCode == "40") {
      // down arrow
      snakeObj.updateSnakeHead(0, 0, 0, 1, e.keyCode);
    } else if (e.keyCode == "37") {
      // left arrow
      snakeObj.updateSnakeHead(-1, 0, 0, 0, e.keyCode);
    } else if (e.keyCode == "39") {
      // right arrow
      snakeObj.updateSnakeHead(0, 1, 0, 0, e.keyCode);
    }
  }
});
snakeObj.displaySnake();
snakeObj.displayRandomFrog();

let arr = [
  [1, 2],
  [3, 4],
];
// arr.map((arrelement) => {
//   if (arrelement[0] == 1 && arrelement[1] == 2) {
//     console.log(true);
//   }
// });

// Previously done code =======================================================================

// // placing the initial snake at random position
// let totalRow = 20;
// let totalColumn = 20;
// let getRandomNumberForRow = Math.floor(Math.random() * totalRow);
// let getRandomNumberForColumn = Math.floor(Math.random() * totalColumn);
// // snake_box_Array[getRandomNumberForRow][getRandomNumberForColumn].style ="background-color:red";

// // Moving snake

// const moveSnake = (i, j) => {};
// let updatingRow = getRandomNumberForRow;
// let updatingColumn = getRandomNumberForColumn;
// let movingRow = 0;
// let movingColumn = 0;

// const movingRight = (currentRow, currentColumn) => {
//   movingColumn = 0;
//   movingRow = 0;
//   setInterval(() => {
//     if (updatingColumn < 19) {
//       updatingRow = currentRow + movingRow;
//       updatingColumn = currentColumn + movingColumn;
//       snake_box_Array[updatingRow][updatingColumn].style =
//         "background-color:red";
//       //updating previous color
//       if (updatingColumn >= 0) {
//         snake_box_Array[updatingRow][updatingColumn - 1].style =
//           snake_box_Array[updatingRow][updatingColumn - 1].getAttribute(
//             "color"
//           );
//       }
//       movingColumn++;
//     }
//   }, 100);
// };
// const movingLeft = (currentRow, currentColumn) => {
//   movingColumn = 0;
//   movingRow = 0;
//   setInterval(() => {
//     updatingRow = currentRow + movingRow;
//     updatingColumn = currentColumn - movingColumn;
//     if (updatingColumn >= 0) {
//       snake_box_Array[updatingRow][updatingColumn].style =
//         "background-color:red";
//       //updating previous color
//       if (updatingColumn < 19) {
//         snake_box_Array[updatingRow][updatingColumn + 1].style =
//           snake_box_Array[updatingRow][updatingColumn + 1].getAttribute(
//             "color"
//           );
//       }
//       movingColumn++;
//     }
//   }, 100);
// };
// const movingUp = (currentRow, currentColumn) => {
//   movingRow = 0;
//   movingColumn = 0;
//   setInterval(() => {
//     updatingRow = currentRow - movingRow;
//     updatingColumn = currentColumn + movingColumn;
//     if (updatingRow >= 0) {
//       snake_box_Array[updatingRow][updatingColumn].style =
//         "background-color:red";
//       //updating previous color
//       if (updatingRow < 19) {
//         snake_box_Array[updatingRow + 1][updatingColumn].style =
//           snake_box_Array[updatingRow + 1][updatingColumn].getAttribute(
//             "color"
//           );
//       }
//       movingRow++;
//     }
//   }, 100);
// };
// const movingDown = (currentRow, currentColumn) => {
//   movingRow = 0;
//   movingColumn = 0;
//   setInterval(() => {
//     if (updatingRow < 19) {
//       updatingRow = currentRow + movingRow;
//       updatingColumn = currentColumn + movingColumn;
//       snake_box_Array[updatingRow][updatingColumn].style =
//         "background-color:red";
//       //updating previous color
//       if (updatingRow >= 0) {
//         snake_box_Array[updatingRow - 1][updatingColumn].style =
//           snake_box_Array[updatingRow - 1][updatingColumn].getAttribute(
//             "color"
//           );
//       }
//       movingRow++;
//     }
//   }, 100);
// };

// const MoveThroughKey = (e) => {
//   if (e.keyCode == "38") {
//     // up arrow
//     movingUp(updatingRow, updatingColumn);
//   } else if (e.keyCode == "40") {
//     // down arrow
//     movingDown(updatingRow, updatingColumn);
//   } else if (e.keyCode == "37") {
//     // left arrow
//     movingLeft(updatingRow, updatingColumn);
//   } else if (e.keyCode == "39") {
//     // right arrow
//     movingRight(updatingRow, updatingColumn);
//   }
//   console.log(e.keyCode);
// };

// document.addEventListener("keydown", MoveThroughKey);

// // if (Math.floor(Math.random() * 2)) {
// // here 'if' work for to move one side
// //=================================================================
// // let playFirstTime = 1;
// // setInterval(() => {
// // if (getRandomNumberForRow < 10 && getRandomNumberForColumn < 10) {
// //   // selecting left top of the block
// //   if (updatingColumn < totalColumn - 1) {
// //     document.addEventListener("keydown", MoveThroughKey);
// //     updatingRow = getRandomNumberForRow + movingRow;
// //     updatingColumn = getRandomNumberForColumn + movingColumn;
// //     snake_box_Array[updatingRow][updatingColumn].style = "background-color:red";
// //     //updating previous color
// //     if (updatingColumn >= 0) {
// //       snake_box_Array[updatingRow][updatingColumn - 1].style =
// //         snake_box_Array[updatingRow][updatingColumn - 1].getAttribute("color");
// //     }
// //     movingColumn++;
// //   }
// //   // console.log("left top");
// // } else if (getRandomNumberForRow < 10 && 10 >= getRandomNumberForColumn < 20) {
// //   document.addEventListener("keydown", MoveThroughKey);
// //   // selecting rignt top of the block
// //   updatingRow = getRandomNumberForRow + movingRow;
// //   updatingColumn = getRandomNumberForColumn - movingColumn;
// //   if (updatingColumn >= 0) {
// //     snake_box_Array[updatingRow][updatingColumn].style = "background-color:red";
// //     //updating previous color
// //     if (updatingColumn < 19) {
// //       snake_box_Array[updatingRow][updatingColumn + 1].style =
// //         snake_box_Array[updatingRow][updatingColumn + 1].getAttribute("color");
// //     }

// //     movingColumn++;
// //   }
// //   // console.log("right top");
// // } else if (10 >= getRandomNumberForRow < 20 && getRandomNumberForColumn < 10) {
// //   document.addEventListener("keydown", MoveThroughKey);
// //   // selecting left bottom of the block
// //   if (updatingColumn < totalColumn - 1) {
// //     updatingRow = getRandomNumberForRow + movingRow;
// //     updatingColumn = getRandomNumberForColumn + movingColumn;
// //     snake_box_Array[updatingRow][updatingColumn].style = "background-color:red";
// //     //updating previous color
// //     if (updatingColumn >= 0) {
// //       snake_box_Array[updatingRow][updatingColumn - 1].style =
// //         snake_box_Array[updatingRow][updatingColumn - 1].getAttribute("color");
// //     }

// //     movingColumn++;
// //   }

// //   // console.log("left bottom");
// // } else if (10 >= getRandomNumberForRow < 20 && getRandomNumberForColumn < 20) {
// //   document.addEventListener("keydown", MoveThroughKey);
// //   // selecting right bottom of the block
// //   updatingRow = getRandomNumberForRow + movingRow;
// //   updatingColumn = getRandomNumberForColumn - movingColumn;
// //   if (updatingColumn >= 0) {
// //     snake_box_Array[updatingRow][updatingColumn].style = "background-color:red";
// //     //updating previous color
// //     if (updatingColumn < 19) {
// //       snake_box_Array[updatingRow][updatingColumn + 1].style =
// //         snake_box_Array[updatingRow][updatingColumn + 1].getAttribute("color");
// //     }
// //     movingColumn++;
// //   }
// //   // console.log("right bottom");
// // }
// // }, 100);

// //==================================================================
// // } else {
// //   // here 'else' work for to move other side
// //   setInterval(() => {
// //     if (getRandomNumberForRow < 10 && getRandomNumberForColumn < 10) {
// //       // selecting left top of the block
// //       if (updatingRow < totalRow - 1) {
// //         updatingRow = getRandomNumberForRow + movingRow;
// //         updatingColumn = getRandomNumberForColumn + movingColumn;
// //         snake_box_Array[updatingRow][updatingColumn].style =
// //           "background-color:red";
// //         movingRow++;
// //       }
// //     } else if (
// //       getRandomNumberForRow < 10 &&
// //       10 >= getRandomNumberForColumn < 20
// //     ) {
// //       // selecting rignt top of the block
// //       updatingRow = getRandomNumberForRow - movingRow;
// //       updatingColumn = getRandomNumberForColumn + movingColumn;
// //       if (updatingRow >= 0) {
// //         snake_box_Array[updatingRow][updatingColumn].style =
// //           "background-color:red";
// //         movingRow++;
// //       }
// //     } else if (
// //       10 >= getRandomNumberForRow < 20 &&
// //       getRandomNumberForColumn < 10
// //     ) {
// //       // selecting left bottom of the block
// //       if (updatingRow < totalRow - 1) {
// //         updatingRow = getRandomNumberForRow + movingRow;
// //         updatingColumn = getRandomNumberForColumn + movingColumn;
// //         snake_box_Array[updatingRow][updatingColumn].style =
// //           "background-color:red";
// //         movingRow++;
// //       }
// //     } else {
// //       // selecting right bottom of the block
// //       updatingRow = getRandomNumberForRow - movingRow;
// //       updatingColumn = getRandomNumberForColumn + movingColumn;
// //       if (updatingRow >= 0) {
// //         snake_box_Array[updatingRow][updatingColumn].style =
// //           "background-color:red";
// //         movingRow++;
// //       }
// //     }
// //   }, 100);
// // }
