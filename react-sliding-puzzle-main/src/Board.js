// import React, { useState } from "react";
// import Tile from "./Tile";
// import { TILE_COUNT, GRID_SIZE, BOARD_SIZE } from "./constants"
// import { canSwap, shuffle, swap, isSolved } from "./helpers"
//
// function Board({ }) {
//   // 16개의 길이가 잇는 배열
//   const [tiles, setTiles] = useState([...Array(TILE_COUNT).keys()]);
//   const [isStarted, setIsStarted] = useState(false);
//   console.log('is started:', isStarted)
//
//
//   // 섞은 배열
//   const shuffleTiles = () => {
//     const shuffledTiles = shuffle(tiles)
//     setTiles(shuffledTiles);
//   }
//
//     //교환타일
//   const swapTiles = (tileIndex) => {
//     // 클릭한 타일의 인덱스
//
//     console.log(tileIndex,'tiles.indexOf(tiles.length - 1)tiles.indexOf(tiles.length - 1)tiles.indexOf(tiles.length - 1)')
//     console.log(tiles.indexOf(tiles.length - 1),'tiles.indexOf(tiles.length - 1)tiles.indexOf(tiles.length - 1)tiles.indexOf(tiles.length - 1)')
//     // 클릭하는 타일인텍스, 클릭하는 순간의 빈곳의 인텍스
//     // 움직일수 잇는지 없는지 파악
//     if (canSwap(tileIndex, tiles.indexOf(tiles.length - 1))) {
//       const swappedTiles = swap(tiles, tileIndex, tiles.indexOf(tiles.length - 1))
//       setTiles(swappedTiles)
//     }
//   }
//
//
//   //타일 클릭 시
//   const handleTileClick = (index) => {
//     swapTiles(index)
//   }
//
//   const handleShuffleClick = () => {
//     shuffleTiles()
//   }
//
//   const handleStartClick = () => {
//     shuffleTiles()
//     setIsStarted(true)
//   }
//
//   const pieceWidth = Math.round(BOARD_SIZE / GRID_SIZE);
//   const pieceHeight = Math.round(BOARD_SIZE / GRID_SIZE);
//   const style = {
//     width: BOARD_SIZE,
//     height: BOARD_SIZE,
//   };
//   const hasWon = isSolved(tiles)
//
//   return (
//     <>
//       <ul style={style} className="board">
//         {tiles.map((tile, index) => (
//           <Tile
//             key={tile}
//             index={index}
//             tile={tile}
//             width={pieceWidth}
//             height={pieceHeight}
//             handleTileClick={handleTileClick}
//           />
//         ))}
//       </ul>
//       {hasWon && isStarted && <div>Puzzle solved 🧠 🎉</div>}
//       {!isStarted ?
//         (<button onClick={() => handleStartClick()}>Start game</button>) :
//         (<button onClick={() => handleShuffleClick()}>Restart game</button>)}
//     </>
//   );
// }
//
// export default Board;


import React, {useState} from 'react';


// the exported component can be either a function or a class


 function Board({ initialConfiguration, onSolveCallback }) {
    const [tiles, setTiles] = useState([...Array(16).keys()]);
    console.log(tiles,'tiles')

    // const onSolved = (tileArray) => {
    //     let isSolve = false
    //     for (let i = 0, l = tiles.length; i < l; i++) {
    //         isSolve = tileArray[i] === i;
    //     }
    //     isSolve && onSolveCallback();
    // }

    const findPosition = (index) => {
        return {
            row:  Math.floor(index / 4),
            col: index % 4,
        }
    };

    const canSwap = (srcIndex, destIndex) => {
        const { row: srcRow, col: srcCol } = findPosition(srcIndex);
        const { row: destRow, col: destCol } = findPosition(destIndex);

        return Math.abs(srcRow - destRow) + Math.abs(srcCol - destCol) === 1;
    }

    const swap = (src, dest) => {
        const tilesResult = [...tiles];
        [tilesResult[src], tilesResult[dest]] = [tilesResult[dest], tilesResult[src]];
        return tilesResult;
    }

    const handleTileClick = (tileIndex)=>{
        if (canSwap(tileIndex, tiles.indexOf(tiles.length - 1))) {
            const swappedTiles = swap(tileIndex, tiles.indexOf(tiles.length - 1))
            setTiles(swappedTiles)
        }
    }


    return (<div className="board">
        { tiles.map((t, index) => {
            return ( t ?
                    <Tiles className="tile" key={t} index={index} tile={t}  handleTileClick={handleTileClick}/>
                    :
                    <Tiles className='tile empty' key={t} index={index} tile={t}  handleTileClick={handleTileClick}/>
            )
        })

        }

    </div>);
}

export const Tiles = ({ t, handleTileClick, index, className }) => {
    return(
        <div className={className} onClick={() => handleTileClick(index)}>{index}</div>
    )
}


export default Board;
