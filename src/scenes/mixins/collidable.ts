import Phaser from "phaser";

export default {
  addCollider(otherGameObject, callback): void {
    this.scene.physics.add.collider(
      this,
      otherGameObject,
      callback,
      null,
      this
    );
  },

  raycast(scene, body, layer, raylength = 30) {
    const { x, y, width, halfHeight } = body;
    const line = new Phaser.Geom.Line();
    let hasHit = false;

    if (!scene.changeLine) {
      line.x1 = x + width;
      line.y1 = y + halfHeight;
      line.x2 = line.x1 + raylength;
      line.y2 = line.y1 + raylength;
    } else if (scene.changeLine) {
      line.x1 = x;
      line.y1 = y + halfHeight;
      line.x2 = line.x1 - raylength;
      line.y2 = line.y1 + raylength;
    }

    const hits = layer.getTilesWithinShape(line);

    if (hits.length > 0) {
      hasHit = hits.some(hit => hit.index !== -1);
    }

    return { ray: line, hasHit };




  }

}
