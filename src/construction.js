/**
 * Functions for placing construction sites
 */

function placeExtension(spawn) {
    var location = spawn.pos.findBuildingSpot(5)
    location.createConstructionSite(STRUCTURE_EXTENSION)
}
function placeTower(spawn) {
    var location = spawn.pos.findBuildingSpot(3)
    location.createConstructionSite(STRUCTURE_TOWER)
}

function availableBuildings(room, type) {
    var max = CONTROLLER_STRUCTURES[type][room.controller.level]
    var built = room.find(FIND_STRUCTURES, {
        filter: { structureType: type, my: true }
    }).length

    return max - built
}

module.exports = function(spawn) {
    var room = spawn.room

    for(let i = 0, n = availableBuildings(room, STRUCTURE_EXTENSION); i < n; i ++) {
        placeExtension(spawn)
    }
    for(let i = 0, n = availableBuildings(room, STRUCTURE_TOWER); i < n; i ++) {
        placeTower(spawn)
    }
}
