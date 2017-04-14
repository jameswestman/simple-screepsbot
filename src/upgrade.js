/**
 * In Upgrade state, creeps take the energy they have gained from Harvest State
 * and they use it to upgrade the controller.
 */

module.exports = function(creep) {
    if(creep.carry.energy === 0) {
        creep.memory.state = "harvest"
        creep.say(creep.memory.state)
        delete creep.memory.target
        return
    }

    var controller = creep.room.controller
    if(creep.pos.inRangeTo(controller, 3)) creep.upgradeController(controller)
    else creep.moveTo(controller)
}
