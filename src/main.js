/**
 * Screepsbot-sample-fsm: A very simple Screeps bot based on finite state
 * machines.
 */

// this only needs to be called once because it is setting global prototypes
require('prototypes');

// require some of our other modules
const build = require("build")
const harvest = require("harvest")
const upgrade = require("upgrade")
const fill = require("fill")
const spawn = require('spawn');

// export our main function, which will run every tick
module.exports.loop = function() {
    // loop through our creeps
    for(let name in Game.creeps) {
        var creep = Game.creeps[name]
        // decide what to do based on this creep's current state
        switch(creep.memory.state) {
            case "harvest":
                harvest(creep)
                break

            case "upgrade":
                upgrade(creep)
                break

            case "build":
                build(creep)
                break

            case "fill":
                fill(creep)
                break

            case "none":
            default:
                // choose new state
                if(creep.carry.energy === 0) {
                    // go harvest energy
                    creep.memory.state = "harvest"
                } else if(creep.room.controller.ticksToDowngrade < 2500) {
                    // make sure that the controller is upgraded periodically
                    creep.memory.state = "upgrade"
                } else if(creep.room.energyAvailable < creep.room.energyCapacityAvailable) {
                    // fill the spawn/extensions if they are not full
                    creep.memory.state = "fill"
                } else if(creep.room.find(FIND_MY_CONSTRUCTION_SITES).length) {
                    // build stuff
                    creep.memory.state = "build"
                } else {
                    // upgrade the controller when there's nothing else to do
                    creep.memory.state = "upgrade"
                }

                // clear the target in memory
                delete creep.memory.target
                creep.say(creep.memory.state)
        }
    }

    // run defense code
    require("defense")(Game.spawns.Spawn1.room)

    // if we don't have enough creeps, make more
    if(Object.keys(Game.creeps).length < 5) {
        spawn.spawnWorker(Game.spawns["Spawn1"])
    }

    // try to build new structures. don't do this every tick, as that is
    // unnecessary and will take more CPU
    if(Game.time % 20 === 10) {
        require("construction")(Game.spawns["Spawn1"])
    }

    // clean up creep memory every once in a while
    if(Game.time % 20 === 0) {
        for(let name in Memory.creeps) if(!Game.creeps[name]) delete Memory.creeps[name]
    }
}
