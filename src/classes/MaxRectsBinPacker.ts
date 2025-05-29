// import type { Panel, PlacedPanel, WasteZone } from "src/types/types";

 
// export class MaxRectsBinPacker {
//   binWidth: number;
//   binHeight: number;
//   usedRectangles: PlacedPanel[] = [];
//   freeRectangles: { x: number; y: number; width: number; height: number }[] =
//     [];

//   constructor(width: number, height: number) {
//     this.binWidth = width;
//     this.binHeight = height;
//     this.freeRectangles = [{ x: 0, y: 0, width, height }];
//   }

//   insert(
//     width: number,
//     height: number,
//     method: string,
//     panel: Panel,
//     allowRotation: boolean = true
//   ): PlacedPanel | null {
//     let newNode: any = null;

//     switch (method) {
//       case "BestShortSideFit":
//         newNode = this.findPositionForNewNodeBestShortSideFit(
//           width,
//           height,
//           allowRotation
//         );
//         break;
//       case "BestLongSideFit":
//         newNode = this.findPositionForNewNodeBestLongSideFit(
//           width,
//           height,
//           allowRotation
//         );
//         break;
//       case "BestAreaFit":
//         newNode = this.findPositionForNewNodeBestAreaFit(
//           width,
//           height,
//           allowRotation
//         );
//         break;
//       case "BottomLeftRule":
//         newNode = this.findPositionForNewNodeBottomLeft(
//           width,
//           height,
//           allowRotation
//         );
//         break;
//       case "ContactPointRule":
//         newNode = this.findPositionForNewNodeContactPoint(
//           width,
//           height,
//           allowRotation
//         );
//         break;
//       default:
//         newNode = this.findPositionForNewNodeBestShortSideFit(
//           width,
//           height,
//           allowRotation
//         );
//     }

//     if (newNode.height === 0) return null;

//     const placedPanel: PlacedPanel = {
//       id: `${panel.id}-${Date.now()}-${Math.random()}`,
//       x: newNode.x,
//       y: newNode.y,
//       width: newNode.width,
//       height: newNode.height,
//       rotated: newNode.rotated || false,
//       originalPanel: panel,
//     };

//     this.placeRectangle(newNode);
//     return placedPanel;
//   }

//   findPositionForNewNodeBestShortSideFit(
//     width: number,
//     height: number,
//     allowRotation: boolean
//   ) {
//     let bestNode = { x: 0, y: 0, width: 0, height: 0, rotated: false };
//     let bestShortSide = Number.MAX_VALUE;
//     let bestLongSide = Number.MAX_VALUE;

//     for (const rect of this.freeRectangles) {
//       if (rect.width >= width && rect.height >= height) {
//         const leftoverHoriz = rect.width - width;
//         const leftoverVert = rect.height - height;
//         const shortSide = Math.min(leftoverHoriz, leftoverVert);
//         const longSide = Math.max(leftoverHoriz, leftoverVert);

//         if (
//           shortSide < bestShortSide ||
//           (shortSide === bestShortSide && longSide < bestLongSide)
//         ) {
//           bestNode = { x: rect.x, y: rect.y, width, height, rotated: false };
//           bestShortSide = shortSide;
//           bestLongSide = longSide;
//         }
//       }

//       if (allowRotation && rect.width >= height && rect.height >= width) {
//         const leftoverHoriz = rect.width - height;
//         const leftoverVert = rect.height - width;
//         const shortSide = Math.min(leftoverHoriz, leftoverVert);
//         const longSide = Math.max(leftoverHoriz, leftoverVert);

//         if (
//           shortSide < bestShortSide ||
//           (shortSide === bestShortSide && longSide < bestLongSide)
//         ) {
//           bestNode = {
//             x: rect.x,
//             y: rect.y,
//             width: height,
//             height: width,
//             rotated: true,
//           };
//           bestShortSide = shortSide;
//           bestLongSide = longSide;
//         }
//       }
//     }

//     return bestNode;
//   }

//   findPositionForNewNodeBestLongSideFit(
//     width: number,
//     height: number,
//     allowRotation: boolean
//   ) {
//     let bestNode = { x: 0, y: 0, width: 0, height: 0, rotated: false };
//     let bestShortSide = Number.MAX_VALUE;
//     let bestLongSide = Number.MAX_VALUE;

//     for (const rect of this.freeRectangles) {
//       if (rect.width >= width && rect.height >= height) {
//         const leftoverHoriz = rect.width - width;
//         const leftoverVert = rect.height - height;
//         const shortSide = Math.min(leftoverHoriz, leftoverVert);
//         const longSide = Math.max(leftoverHoriz, leftoverVert);

//         if (
//           longSide < bestLongSide ||
//           (longSide === bestLongSide && shortSide < bestShortSide)
//         ) {
//           bestNode = { x: rect.x, y: rect.y, width, height, rotated: false };
//           bestShortSide = shortSide;
//           bestLongSide = longSide;
//         }
//       }

//       if (allowRotation && rect.width >= height && rect.height >= width) {
//         const leftoverHoriz = rect.width - height;
//         const leftoverVert = rect.height - width;
//         const shortSide = Math.min(leftoverHoriz, leftoverVert);
//         const longSide = Math.max(leftoverHoriz, leftoverVert);

//         if (
//           longSide < bestLongSide ||
//           (longSide === bestLongSide && shortSide < bestShortSide)
//         ) {
//           bestNode = {
//             x: rect.x,
//             y: rect.y,
//             width: height,
//             height: width,
//             rotated: true,
//           };
//           bestShortSide = shortSide;
//           bestLongSide = longSide;
//         }
//       }
//     }

//     return bestNode;
//   }

//   findPositionForNewNodeBestAreaFit(
//     width: number,
//     height: number,
//     allowRotation: boolean
//   ) {
//     let bestNode = { x: 0, y: 0, width: 0, height: 0, rotated: false };
//     let bestAreaFit = Number.MAX_VALUE;
//     let bestShortSideFit = Number.MAX_VALUE;

//     for (const rect of this.freeRectangles) {
//       const areaFit = rect.width * rect.height - width * height;

//       if (rect.width >= width && rect.height >= height) {
//         const leftoverHoriz = rect.width - width;
//         const leftoverVert = rect.height - height;
//         const shortSideFit = Math.min(leftoverHoriz, leftoverVert);

//         if (
//           areaFit < bestAreaFit ||
//           (areaFit === bestAreaFit && shortSideFit < bestShortSideFit)
//         ) {
//           bestNode = { x: rect.x, y: rect.y, width, height, rotated: false };
//           bestAreaFit = areaFit;
//           bestShortSideFit = shortSideFit;
//         }
//       }

//       if (allowRotation && rect.width >= height && rect.height >= width) {
//         const leftoverHoriz = rect.width - height;
//         const leftoverVert = rect.height - width;
//         const shortSideFit = Math.min(leftoverHoriz, leftoverVert);

//         if (
//           areaFit < bestAreaFit ||
//           (areaFit === bestAreaFit && shortSideFit < bestShortSideFit)
//         ) {
//           bestNode = {
//             x: rect.x,
//             y: rect.y,
//             width: height,
//             height: width,
//             rotated: true,
//           };
//           bestAreaFit = areaFit;
//           bestShortSideFit = shortSideFit;
//         }
//       }
//     }

//     return bestNode;
//   }

//   findPositionForNewNodeBottomLeft(
//     width: number,
//     height: number,
//     allowRotation: boolean
//   ) {
//     let bestNode = { x: 0, y: 0, width: 0, height: 0, rotated: false };
//     let bestY = Number.MAX_VALUE;
//     let bestX = Number.MAX_VALUE;

//     for (const rect of this.freeRectangles) {
//       if (rect.width >= width && rect.height >= height) {
//         if (rect.y < bestY || (rect.y === bestY && rect.x < bestX)) {
//           bestNode = { x: rect.x, y: rect.y, width, height, rotated: false };
//           bestY = rect.y;
//           bestX = rect.x;
//         }
//       }

//       if (allowRotation && rect.width >= height && rect.height >= width) {
//         if (rect.y < bestY || (rect.y === bestY && rect.x < bestX)) {
//           bestNode = {
//             x: rect.x,
//             y: rect.y,
//             width: height,
//             height: width,
//             rotated: true,
//           };
//           bestY = rect.y;
//           bestX = rect.x;
//         }
//       }
//     }

//     return bestNode;
//   }

//   findPositionForNewNodeContactPoint(
//     width: number,
//     height: number,
//     allowRotation: boolean
//   ) {
//     let bestNode = { x: 0, y: 0, width: 0, height: 0, rotated: false };
//     let bestContactRating = 0;

//     for (const rect of this.freeRectangles) {
//       if (rect.width >= width && rect.height >= height) {
//         const contactRating = this.contactPointRateOnRect(
//           rect.x,
//           rect.y,
//           width,
//           height
//         );
//         if (contactRating > bestContactRating) {
//           bestNode = { x: rect.x, y: rect.y, width, height, rotated: false };
//           bestContactRating = contactRating;
//         }
//       }

//       if (allowRotation && rect.width >= height && rect.height >= width) {
//         const contactRating = this.contactPointRateOnRect(
//           rect.x,
//           rect.y,
//           height,
//           width
//         );
//         if (contactRating > bestContactRating) {
//           bestNode = {
//             x: rect.x,
//             y: rect.y,
//             width: height,
//             height: width,
//             rotated: true,
//           };
//           bestContactRating = contactRating;
//         }
//       }
//     }

//     return bestNode;
//   }

//   contactPointRateOnRect(
//     x: number,
//     y: number,
//     width: number,
//     height: number
//   ): number {
//     let rating = 0;

//     if (x === 0 || x + width === this.binWidth) rating += height;
//     if (y === 0 || y + height === this.binHeight) rating += width;

//     for (const usedRect of this.usedRectangles) {
//       if (usedRect.x === x + width || usedRect.x + usedRect.width === x) {
//         rating += this.commonIntervalLength(
//           usedRect.y,
//           usedRect.y + usedRect.height,
//           y,
//           y + height
//         );
//       }
//       if (usedRect.y === y + height || usedRect.y + usedRect.height === y) {
//         rating += this.commonIntervalLength(
//           usedRect.x,
//           usedRect.x + usedRect.width,
//           x,
//           x + width
//         );
//       }
//     }

//     return rating;
//   }

//   commonIntervalLength(
//     i1start: number,
//     i1end: number,
//     i2start: number,
//     i2end: number
//   ): number {
//     if (i1end < i2start || i2end < i1start) return 0;
//     return Math.min(i1end, i2end) - Math.max(i1start, i2start);
//   }

//   placeRectangle(node: any) {
//     let numRectanglesToProcess = this.freeRectangles.length;
//     for (let i = 0; i < numRectanglesToProcess; ++i) {
//       if (this.splitFreeNode(this.freeRectangles[i], node)) {
//         this.freeRectangles.splice(i, 1);
//         --i;
//         --numRectanglesToProcess;
//       }
//     }

//     this.pruneFreeList();
//     this.usedRectangles.push(node);
//   }

//   splitFreeNode(freeNode: any, usedNode: any): boolean {
//     if (
//       usedNode.x >= freeNode.x + freeNode.width ||
//       usedNode.x + usedNode.width <= freeNode.x ||
//       usedNode.y >= freeNode.y + freeNode.height ||
//       usedNode.y + usedNode.height <= freeNode.y
//     ) {
//       return false;
//     }

//     if (
//       usedNode.x < freeNode.x + freeNode.width &&
//       usedNode.x + usedNode.width > freeNode.x
//     ) {
//       if (
//         usedNode.y > freeNode.y &&
//         usedNode.y < freeNode.y + freeNode.height
//       ) {
//         const newNode = { ...freeNode };
//         newNode.height = usedNode.y - newNode.y;
//         this.freeRectangles.push(newNode);
//       }

//       if (usedNode.y + usedNode.height < freeNode.y + freeNode.height) {
//         const newNode = { ...freeNode };
//         newNode.y = usedNode.y + usedNode.height;
//         newNode.height =
//           freeNode.y + freeNode.height - (usedNode.y + usedNode.height);
//         this.freeRectangles.push(newNode);
//       }
//     }

//     if (
//       usedNode.y < freeNode.y + freeNode.height &&
//       usedNode.y + usedNode.height > freeNode.y
//     ) {
//       if (usedNode.x > freeNode.x && usedNode.x < freeNode.x + freeNode.width) {
//         const newNode = { ...freeNode };
//         newNode.width = usedNode.x - newNode.x;
//         this.freeRectangles.push(newNode);
//       }

//       if (usedNode.x + usedNode.width < freeNode.x + freeNode.width) {
//         const newNode = { ...freeNode };
//         newNode.x = usedNode.x + usedNode.width;
//         newNode.width =
//           freeNode.x + freeNode.width - (usedNode.x + usedNode.width);
//         this.freeRectangles.push(newNode);
//       }
//     }

//     return true;
//   }

//   pruneFreeList() {
//     for (let i = 0; i < this.freeRectangles.length; ++i) {
//       for (let j = i + 1; j < this.freeRectangles.length; ++j) {
//         if (
//           this.isContainedIn(this.freeRectangles[i], this.freeRectangles[j])
//         ) {
//           this.freeRectangles.splice(i, 1);
//           --i;
//           break;
//         }
//         if (
//           this.isContainedIn(this.freeRectangles[j], this.freeRectangles[i])
//         ) {
//           this.freeRectangles.splice(j, 1);
//           --j;
//         }
//       }
//     }
//   }

//   isContainedIn(a: any, b: any): boolean {
//     return (
//       a.x >= b.x &&
//       a.y >= b.y &&
//       a.x + a.width <= b.x + b.width &&
//       a.y + a.height <= b.y + b.height
//     );
//   }

//   findWasteZones(): WasteZone[] {
//     return this.freeRectangles
//       .map((rect) => ({
//         x: rect.x,
//         y: rect.y,
//         width: rect.width,
//         height: rect.height,
//         area: rect.width * rect.height,
//       }))
//       .filter((zone) => zone.area > 0);
//   }
// }















// Function-based version of MaxRectsBinPacker
import type { Panel, PlacedPanel, WasteZone } from "/types/types";

export const createMaxRectsBinPacker = (binWidth: number, binHeight: number) => {
  let usedRectangles: PlacedPanel[] = [];
  let freeRectangles: { x: number; y: number; width: number; height: number }[] = [
    { x: 0, y: 0, width: binWidth, height: binHeight }
  ];

  const insert = (
    width: number,
    height: number,
    method: string,
    panel: Panel,
    allowRotation: boolean = true
  ): PlacedPanel | null => {
    let newNode: any = null;

    switch (method) {
      case "BestShortSideFit":
        newNode = findPositionForNewNodeBestShortSideFit(width, height, allowRotation);
        break;
      case "BestLongSideFit":
        newNode = findPositionForNewNodeBestLongSideFit(width, height, allowRotation);
        break;
      case "BestAreaFit":
        newNode = findPositionForNewNodeBestAreaFit(width, height, allowRotation);
        break;
      case "BottomLeftRule":
        newNode = findPositionForNewNodeBottomLeft(width, height, allowRotation);
        break;
      case "ContactPointRule":
        newNode = findPositionForNewNodeContactPoint(width, height, allowRotation);
        break;
      default:
        newNode = findPositionForNewNodeBestShortSideFit(width, height, allowRotation);
    }

    if (newNode.height === 0) return null;

    const placedPanel: PlacedPanel = {
      id: `${panel.id}-${Date.now()}-${Math.random()}`,
      x: newNode.x,
      y: newNode.y,
      width: newNode.width,
      height: newNode.height,
      rotated: newNode.rotated || false,
      originalPanel: panel,
    };

    placeRectangle(newNode);
    return placedPanel;
  };

  const findPositionForNewNodeBestShortSideFit = (width: number, height: number, allowRotation: boolean) => {
    return findBestFit(width, height, allowRotation, (leftoverHoriz, leftoverVert) => [Math.min(leftoverHoriz, leftoverVert), Math.max(leftoverHoriz, leftoverVert)]);
  };

  const findPositionForNewNodeBestLongSideFit = (width: number, height: number, allowRotation: boolean) => {
    return findBestFit(width, height, allowRotation, (leftoverHoriz, leftoverVert) => [Math.max(leftoverHoriz, leftoverVert), Math.min(leftoverHoriz, leftoverVert)]);
  };

  const findPositionForNewNodeBestAreaFit = (width: number, height: number, allowRotation: boolean) => {
    let bestNode = { x: 0, y: 0, width: 0, height: 0, rotated: false };
    let bestAreaFit = Number.MAX_VALUE;
    let bestShortSideFit = Number.MAX_VALUE;

    for (const rect of freeRectangles) {
      const tryFit = (w: number, h: number, rotated: boolean) => {
        if (rect.width >= w && rect.height >= h) {
          const areaFit = rect.width * rect.height - w * h;
          const leftoverHoriz = rect.width - w;
          const leftoverVert = rect.height - h;
          const shortSideFit = Math.min(leftoverHoriz, leftoverVert);

          if (
            areaFit < bestAreaFit ||
            (areaFit === bestAreaFit && shortSideFit < bestShortSideFit)
          ) {
            bestNode = { x: rect.x, y: rect.y, width: w, height: h, rotated };
            bestAreaFit = areaFit;
            bestShortSideFit = shortSideFit;
          }
        }
      };
      tryFit(width, height, false);
      if (allowRotation) tryFit(height, width, true);
    }
    return bestNode;
  };

  const findBestFit = (width: number, height: number, allowRotation: boolean, compareFn: Function) => {
    let bestNode = { x: 0, y: 0, width: 0, height: 0, rotated: false };
    let bestFirst = Number.MAX_VALUE;
    let bestSecond = Number.MAX_VALUE;

    for (const rect of freeRectangles) {
      const tryFit = (w: number, h: number, rotated: boolean) => {
        if (rect.width >= w && rect.height >= h) {
          const leftoverHoriz = rect.width - w;
          const leftoverVert = rect.height - h;
          const [first, second] = compareFn(leftoverHoriz, leftoverVert);

          if (first < bestFirst || (first === bestFirst && second < bestSecond)) {
            bestNode = { x: rect.x, y: rect.y, width: w, height: h, rotated };
            bestFirst = first;
            bestSecond = second;
          }
        }
      };
      tryFit(width, height, false);
      if (allowRotation) tryFit(height, width, true);
    }
    return bestNode;
  };

  const findPositionForNewNodeBottomLeft = (width: number, height: number, allowRotation: boolean) => {
    let bestNode = { x: 0, y: 0, width: 0, height: 0, rotated: false };
    let bestY = Number.MAX_VALUE;
    let bestX = Number.MAX_VALUE;

    for (const rect of freeRectangles) {
      const tryFit = (w: number, h: number, rotated: boolean) => {
        if (rect.width >= w && rect.height >= h) {
          if (rect.y < bestY || (rect.y === bestY && rect.x < bestX)) {
            bestNode = { x: rect.x, y: rect.y, width: w, height: h, rotated };
            bestY = rect.y;
            bestX = rect.x;
          }
        }
      };
      tryFit(width, height, false);
      if (allowRotation) tryFit(height, width, true);
    }
    return bestNode;
  };

  const findPositionForNewNodeContactPoint = (width: number, height: number, allowRotation: boolean) => {
    let bestNode = { x: 0, y: 0, width: 0, height: 0, rotated: false };
    let bestContactRating = 0;

    for (const rect of freeRectangles) {
      const tryFit = (w: number, h: number, rotated: boolean) => {
        if (rect.width >= w && rect.height >= h) {
          const contactRating = contactPointRateOnRect(rect.x, rect.y, w, h);
          if (contactRating > bestContactRating) {
            bestNode = { x: rect.x, y: rect.y, width: w, height: h, rotated };
            bestContactRating = contactRating;
          }
        }
      };
      tryFit(width, height, false);
      if (allowRotation) tryFit(height, width, true);
    }
    return bestNode;
  };

  const contactPointRateOnRect = (x: number, y: number, width: number, height: number): number => {
    let rating = 0;
    if (x === 0 || x + width === binWidth) rating += height;
    if (y === 0 || y + height === binHeight) rating += width;

    for (const usedRect of usedRectangles) {
      if (usedRect.x === x + width || usedRect.x + usedRect.width === x) {
        rating += commonIntervalLength(usedRect.y, usedRect.y + usedRect.height, y, y + height);
      }
      if (usedRect.y === y + height || usedRect.y + usedRect.height === y) {
        rating += commonIntervalLength(usedRect.x, usedRect.x + usedRect.width, x, x + width);
      }
    }
    return rating;
  };

  const commonIntervalLength = (i1start: number, i1end: number, i2start: number, i2end: number): number => {
    if (i1end < i2start || i2end < i1start) return 0;
    return Math.min(i1end, i2end) - Math.max(i1start, i2start);
  };

  const placeRectangle = (node: any) => {
    let i = 0;
    while (i < freeRectangles.length) {
      if (splitFreeNode(freeRectangles[i], node)) {
        freeRectangles.splice(i, 1);
      } else {
        ++i;
      }
    }
    pruneFreeList();
    usedRectangles.push(node);
  };

  const splitFreeNode = (freeNode: any, usedNode: any): boolean => {
    if (
      usedNode.x >= freeNode.x + freeNode.width ||
      usedNode.x + usedNode.width <= freeNode.x ||
      usedNode.y >= freeNode.y + freeNode.height ||
      usedNode.y + usedNode.height <= freeNode.y
    ) return false;

    if (usedNode.x < freeNode.x + freeNode.width && usedNode.x + usedNode.width > freeNode.x) {
      if (usedNode.y > freeNode.y && usedNode.y < freeNode.y + freeNode.height) {
        freeRectangles.push({ ...freeNode, height: usedNode.y - freeNode.y });
      }
      if (usedNode.y + usedNode.height < freeNode.y + freeNode.height) {
        freeRectangles.push({
          ...freeNode,
          y: usedNode.y + usedNode.height,
          height: freeNode.y + freeNode.height - (usedNode.y + usedNode.height),
        });
      }
    }

    if (usedNode.y < freeNode.y + freeNode.height && usedNode.y + usedNode.height > freeNode.y) {
      if (usedNode.x > freeNode.x && usedNode.x < freeNode.x + freeNode.width) {
        freeRectangles.push({ ...freeNode, width: usedNode.x - freeNode.x });
      }
      if (usedNode.x + usedNode.width < freeNode.x + freeNode.width) {
        freeRectangles.push({
          ...freeNode,
          x: usedNode.x + usedNode.width,
          width: freeNode.x + freeNode.width - (usedNode.x + usedNode.width),
        });
      }
    }
    return true;
  };

  const pruneFreeList = () => {
    for (let i = 0; i < freeRectangles.length; ++i) {
      for (let j = i + 1; j < freeRectangles.length; ++j) {
        if (isContainedIn(freeRectangles[i], freeRectangles[j])) {
          freeRectangles.splice(i, 1);
          --i;
          break;
        }
        if (isContainedIn(freeRectangles[j], freeRectangles[i])) {
          freeRectangles.splice(j, 1);
          --j;
        }
      }
    }
  };

  const isContainedIn = (a: any, b: any): boolean =>
    a.x >= b.x && a.y >= b.y && a.x + a.width <= b.x + b.width && a.y + a.height <= b.y + b.height;

  const findWasteZones = (): WasteZone[] =>
    freeRectangles
      .map(rect => ({
        x: rect.x,
        y: rect.y,
        width: rect.width,
        height: rect.height,
        area: rect.width * rect.height,
      }))
      .filter(zone => zone.area > 0);

  return {
    insert,
    findWasteZones,
    usedRectangles,
    freeRectangles
  };
};
