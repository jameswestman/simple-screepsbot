/**
 * In Harvest state, creeps mine energy from sources. When they are full, they
 * decide what to do with that energy.
 */

module.exports = function(creep) {
    if(creep.carry.energy === creep.carryCapacity) {
        creep.memory.state = "none"
    }

    if(creep.memory.target && Game.getObjectById(creep.memory.target)) {
        var source = Game.getObjectById(creep.memory.target)

        if(creep.pos.isNearTo(source)) creep.harvest(source)
        else creep.moveTo(source)
    } else {
        var source = creep.pos.findClosestByPath(FIND_SOURCES_ACTIVE)
        // make sure to store the id and not the source object itself
        if(source) creep.memory.target = source.id
    }
}
