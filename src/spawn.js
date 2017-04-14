/**
 * Spawning functionality
 */

// this function will not be exported because it is not in module.exports. it is
// only used within this module.
function cost(body) {
    // screeps uses lodash 3.10.1: https://lodash.com/docs/3.10.1
    return _.reduce(body, (sum, part) => sum + BODYPART_COST[part], 0)
}

/**
 * Spawns the largest possible creep from the given spawn
 */
module.exports.spawnWorker = function(spawn) {
    // don't bother spawning if the spawn is busy
    if(spawn.spawning) return

    var bodyModule = [ MOVE, CARRY, MOVE, WORK ]
    var unitCost = cost(bodyModule)

    var body = []
    // calculate maximum possible body size
    var bodySize = Math.min(Math.floor(spawn.room.energyAvailable / unitCost), Math.floor(MAX_CREEP_SIZE / bodyModule.length))
    for(let i = 0; i < bodySize; i ++) body = body.concat(bodyModule)

    spawn.createCreep(body, undefined, { state: "harvest" })
}
