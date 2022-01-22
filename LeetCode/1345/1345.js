// Given an array of integers arr, you are initially positioned
// at the first index of the array.

// In one step you can jump from index i to index:
// i + 1 where: i + 1 < arr.length.
// i - 1 where: i - 1 >= 0.
// j where: arr[i] == arr[j] and i != j.

// Return the minimum number of steps to reach the last index of the array.

class VertexInfo {
  constructor(position, iteration) {
    this.position = position;
    this.depth = iteration;
  }
}

function findAvailableVertices(searchArr, active) {
  let verticesAvailableFromThis = [];
  
  // since returning to the first vertex
  // or to the vertex from which we came is stupid
  // we dont have to check whether theyre available
  for (let j = searchArr.length - 1; j > 0; j--) {
    if (
      searchArr[j] === searchArr[active]
      && j !== active && j !== active-1 && j !== active+1
    ) verticesAvailableFromThis.push(j);
  }

  active !== searchArr.length - 1 ? verticesAvailableFromThis.push(active+1) : null;
  active !== 0 ? verticesAvailableFromThis.push(active-1) : null;

  return verticesAvailableFromThis;
}

/**
 * Main function
 * @param {number[]} arr
 * @return {number}
 */
function minJumps(arr) {
  if (arr.length == 1) return 0;

  const lastIndex = arr.length - 1;

  const QUEUE = Array.of(arr.length);
  QUEUE[0] = new VertexInfo(0, 0);
  
  const checked = Array();

  function alreadyInQueue(targetValue) {
    for (const v of QUEUE) if (v.position === targetValue) return true;
    return false;
  }

  while (QUEUE) {
    const curr = QUEUE.shift();
    checked.push(curr.position);

    for (
      const availableVertex
      of findAvailableVertices(arr, curr.position)
    ) {
      if (
        !alreadyInQueue(availableVertex)
        && !checked.includes(availableVertex)
      ) {
        if (availableVertex === lastIndex) return curr.depth + 1;
        QUEUE.push(new VertexInfo(availableVertex, curr.depth+1));
      }
    }
  }
}