/**
 * This module is for tower code.
 */

module.exports = function(room) {
    var hostiles = room.find(FIND_HOSTILE_CREEPS)
    if(hostiles.length) {
        // this tower code causes each tower to target a random creep. while
        // probably not the best tower code, it introduces randomness which
        // makes the code harder to exploit
        var towers = room.find(FIND_STRUCTURES, {
            filter: { structureType: STRUCTURE_TOWER }
        })

        for(let tower of towers) {
            tower.attack(hostiles[Math.floor(Math.random() * hostiles.length)])
        }
    }
}
