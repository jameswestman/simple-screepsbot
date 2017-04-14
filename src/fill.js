/**
 * In Fill state, creeps take the energy they have and fill spawns, extensions,
 * and towers with it
 */

 module.exports = function(creep) {
     if(creep.carry.energy === 0) {
         creep.memory.state = "none"
         return
     }

     if(creep.memory.target && Game.getObjectById(creep.memory.target)) {
         var dest = Game.getObjectById(creep.memory.target)

         if(creep.pos.isNearTo(dest)) {
             creep.transfer(dest, RESOURCE_ENERGY)
             if(dest.energy === dest.energyCapacity) {
                 creep.memory.state = "none"
             }
         }
         else creep.moveTo(dest)
     } else {
         var dest = creep.pos.findClosestByPath(FIND_STRUCTURES, {
             filter: structure => (structure.structureType === STRUCTURE_SPAWN ||
                structure.structureType === STRUCTURE_EXTENSION ||
                structure.structureType === STRUCTURE_TOWER) &&
                structure.energy < structure.energyCapacity
         })

         if(dest) {
             creep.memory.target = dest.id
         } else {
             // if there are no more structures to fill, go to a different state
             delete creep.memory.state
         }
     }
 }
