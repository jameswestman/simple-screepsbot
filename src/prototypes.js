/**
 * Prototype functions. These only need to be called once each main loop.
 */

/**
 * getBuildingSpot: Find an empty tile within radius tiles of this room position
 */
RoomPosition.prototype.findBuildingSpot = function(radius) {
    var x, y
    var diameter = (radius * 2) + 1
    var room = Game.rooms[this.roomName]
    do {
        x = Math.floor(Math.random() * diameter) - radius + this.x
        y = Math.floor(Math.random() * diameter) - radius + this.y
    } while( room.lookAt(x, y).length > 1 || Game.map.getTerrainAt(x, y, this.roomName) === "wall" )

    return new RoomPosition(x, y, this.roomName)
}
