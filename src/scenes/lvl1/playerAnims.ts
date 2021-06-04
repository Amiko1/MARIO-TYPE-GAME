interface animeItem {
  name: string;
  start: number;
  end: number;
  frameRate: number;
  repeat: number;
}

const animsArray = [
  { name: 'idle', start: 0, end: 8, frameRate: 8, repeat: -1 },
  { name: 'run', start: 11, end: 16, frameRate: 8, repeat: -1 },
  { name: 'jump', start: 17, end: 23, frameRate: 8, repeat: 1 },
];

export default (anims) => {
  animsArray.map((animeItem: animeItem) => {
    anims.create({
      key: animeItem.name,
      frames: anims.generateFrameNumbers('player', {
        start: animeItem.start,
        end: animeItem.end,
      }),
      frameRate: animeItem.frameRate,
      repeat: animeItem.repeat,
    });
  });
};
