declare function createCanvas(width: number, height: number): void
declare function noStroke(): void
declare function delay(time: number)
declare function createVector(...args: any[]): any
declare function createGraphics(width: number, height: number): any
declare function createImage(width: number, height: number): PImage
declare function stroke(color: number | Color): void
declare function fill(color: number | Color): void
declare function background(color: number | Color): void
declare function tint(color: number | Color, color2: number | Color): void
declare function image(graphics: PImage, x: number, y: number)

declare function getGraphics(): PImage

declare function loadImage(path: string, format?: string, cb?: (img: any) => any): PImage
declare function loadImage(path: string, cb?: (img: any) => any): PImage

declare function translate(x: number, y: number): void
declare function rotate(angle: number): void
declare function scale(factor: number): void

declare const width: number
declare const height: number

declare class Vector {
  x: number
  y: number
  normalize(): Vector
  addEventListener(v: Vector)
}

declare function random(...args: any[]): number
declare function brightness(color: Color): number

declare class PImage {
  readonly width: number
  readonly height: number
  get(x: number, y: number): Color
  set(x: number, y: number, color: number | Color): void
  resize(width: number, height: number): void
  filter(a: any): void
  copy(image: PImage, sx: number, sy: number, sw: number, sh: number, dx: number, dy: number, dw: number, dh: number): PImage
  blend(
    image: PImage,
    x1: number, y1: number, width1: number, height1: number,
    x2: number, y2: number, width2: number, height2: number,
    mode: 'OVERLAY' | 'SUBTRACT'
  )
  ellipse(x: number, y: number, width: number, height: number): void
  rect(x: number, y: number, width: number, height: number): void
  line(x: number, y: number, x2: number, y2: number): void
}

declare class PGraphics extends PImage {
  
}

declare class Color {

}

declare class PText {
  getNumber(n: number, unit: 'Lines' | 'Duration' | 'Active'): number
  getText(n: number, a: string): string
  loadJSON(): void
}

declare function copy(image: PImage, sx: number, sy: number, sw: number, sh: number, dx: number, dy: number, dw: number, dh: number): PImage

declare function loadJSON<Result>(url: string, callback?: (result: Result) => void, errorCallback?: (error: any) => void): Result