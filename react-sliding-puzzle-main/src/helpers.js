import { TILE_COUNT, GRID_SIZE } from "./constants"

// Credits to https://codepen.io/unindented/pen/QNWdRQ
export function isSolvable(tiles) {
  let product = 1;
  for (let i = 1, l = TILE_COUNT - 1; i <= l; i++) {
    for (let j = i + 1, m = l + 1; j <= m; j++) {
      product *= (tiles[i - 1] - tiles[j - 1]) / (i - j);
    }
  }
  return Math.round(product) === 1;
}

export function isSolved(tiles) {
  for (let i = 0, l = tiles.length; i < l; i++) {
    let isSolve = tiles[i] !== i ? false : true;
    if (tiles[i] !== i) {
      return false;
    }
  }
  return true;
}




// Get the linear index from a row/col pair.
export function getIndex(row, col) {
  return parseInt(row, 10) * GRID_SIZE + parseInt(col, 10);
}

// Get the row/col pair from a linear index.
export function getMatrixPosition(index) {
  // 이차원 배열일경우 row와 cell 알아내기
  // 소수점 이하를 버림한다.
  return {
    row:  Math.floor(index / 4) ,//Math.floor(index / GRID_SIZE),
    col: index % GRID_SIZE,
  };
}

export function getVisualPosition(row, col, width, height) {
  return {
    x: col * width,
    y: row * height,
  };
}

export function shuffle(tiles) {
  const shuffledTiles = [
    ...tiles
        .filter((t) => t !== tiles.length - 1)
        .sort(() => Math.random() - 0.5),
    tiles.length - 1,
  ];
  return isSolvable(shuffledTiles) && !isSolved(shuffledTiles)
      ? shuffledTiles
      : shuffle(shuffledTiles);
}

export function canSwap(srcIndex, destIndex) {
  //   // 클릭하는 타일인텍스, 클릭하는 순간의 빈곳의 인텍스(도착지)
  const { row: srcRow, col: srcCol } = getMatrixPosition(srcIndex);
  const { row: destRow, col: destCol } = getMatrixPosition(destIndex);
  console.log( Math.abs(srcRow - destRow) + Math.abs(srcCol - destCol),'절댁밧 ')
  console.log( srcRow, destRow)
  console.log( srcCol, destCol)

  // 똑같은 row에 cell옆자리를 ㅇ클릭하거나, 똑같은 cell에 위아래 row인 걸 클릭하니깐 합이 1이 되야함
  return Math.abs(srcRow - destRow) + Math.abs(srcCol - destCol) === 1;
}

export function swap(tiles, src, dest) {
  const tilesResult = [...tiles];
  // 클릭한애랑 위치가 변경되야하니깐
  [tilesResult[src], tilesResult[dest]] = [tilesResult[dest], tilesResult[src]];
  return tilesResult;
}

export function updateURLParameter(url, param, paramVal) {
  var newAdditionalURL = "";
  var tempArray = url.split("?");
  var baseURL = tempArray[0];
  var additionalURL = tempArray[1];
  var temp = "";
  if (additionalURL) {
    tempArray = additionalURL.split("&");
    for (var i = 0; i < tempArray.length; i++) {
      if (tempArray[i].split("=")[0] !== param) {
        newAdditionalURL += temp + tempArray[i];
        temp = "&";
      }
    }
  }

  var rows_txt = temp + "" + param + "=" + paramVal;
  return baseURL + "?" + newAdditionalURL + rows_txt;
}