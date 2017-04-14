/**
 * In Build state, creeps take the energy they have gained from Harvest State
 * and they use it to build something.
 */

module.exports = function(creep) {
    if(creep.carry.energy === 0) {
        creep.memory.state = "none"
        return
    }

    if(creep.memory.target && Game.getObjectById(creep.memory.target)) {
        var site = Game.getObjectById(creep.memory.target)

        if(creep.pos.inRangeTo(site, 3)) creep.build(site)
        else creep.moveTo(site)
    } else {
        var site = creep.pos.findClosestByPath(FIND_MY_CONSTRUCTION_SITES)
        if(site) {
            creep.memory.target = site.id
        } else {
            // if there are no construction sites, go to a different mode
            creep.memory.state = "harvest"
            delete creep.memory.target
        }
    }
}
