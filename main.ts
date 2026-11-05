enum ActionKind {
    Walking,
    Idle,
    Jumping
}
namespace SpriteKind {
    export const cover = SpriteKind.create()
    export const goomba = SpriteKind.create()
    export const loader = SpriteKind.create()
}
/**
 * change this from 50 to 15
 */
controller.up.onEvent(ControllerButtonEvent.Pressed, function () {
	
})
function start_level (num: number) {
	
}
function spawn_enemy () {
    if (immovable == 0) {
        list = tiles.getTilesByType(assets.tile`myTile76`)
        amount = list.length
        entity = []
        entityindex = []
        for (let index = 0; index < amount; index++) {
            entity.unshift(sprites.create(assets.image`myImage1`, SpriteKind.goomba))
            entityindex.push(0)
            tiles.placeOnTile(entity[0], tiles.getTileLocation(list[0].column, list[0].row + -2))
            list.shift()
        }
    }
}
scene.onOverlapTile(SpriteKind.Player, assets.tile`myTile`, function (sprite, location) {
    tiles.setTileAt(location, assets.tile`transparency8`)
    music.play(music.melodyPlayable(music.baDing), music.PlaybackMode.InBackground)
})
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    if (immovable == 0) {
        if (mySprite.isHittingTile(CollisionDirection.Bottom)) {
            music.play(music.createSoundEffect(
            WaveShape.Square,
            277,
            466,
            255,
            58,
            300,
            SoundExpressionEffect.None,
            InterpolationCurve.Linear
            ), music.PlaybackMode.InBackground)
            if (controller.B.isPressed()) {
                for (let index = 0; index < 50; index++) {
                    if (controller.A.isPressed()) {
                        mySprite.vy = -120
                        state = 1
                    }
                    pause(3)
                }
            } else {
                for (let index = 0; index < 30; index++) {
                    if (controller.A.isPressed()) {
                        mySprite.vy = -120
                        state = 1
                    }
                    pause(3)
                }
            }
        }
    }
})
sprites.onOverlap(SpriteKind.goomba, SpriteKind.loader, function (sprite, otherSprite) {
    sprite.vx = -30
})
sprites.onCreated(SpriteKind.goomba, function (sprite) {
    animation.runImageAnimation(
    sprite,
    assets.animation`myAnim7`,
    200,
    true
    )
    sprite.setFlag(SpriteFlag.BounceOnWall, true)
    sprite.ay = 360
})
function die () {
    immovable = 1
    animation.stopAnimation(animation.AnimationTypes.All, mySprite2)
    animation.runImageAnimation(
    mySprite2,
    [img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . 5 5 5 5 . . . . . . 
        . . . 3 . 5 5 5 5 5 5 . 3 . . . 
        . . 3 3 5 3 5 3 3 5 3 5 3 3 . . 
        . . 3 5 5 5 3 3 3 3 5 5 5 3 . . 
        . . . 5 5 3 5 5 5 5 3 5 5 . . . 
        . . . . 5 3 3 3 3 3 3 5 . . . . 
        . . . . 5 5 4 3 3 4 5 5 . . . . 
        . . 5 . 4 4 4 5 5 4 4 4 . 5 . . 
        . . 5 5 5 4 . 4 4 . 4 5 5 5 . . 
        . . 5 5 5 4 4 4 4 4 4 5 5 5 . . 
        . . . . . 4 4 4 4 4 4 . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `],
    1,
    true
    )
    mySprite2.ay = 360
    mySprite2.vy = -180
    mySprite2.setFlag(SpriteFlag.GhostThroughWalls, true)
    music.stopAllSounds()
    music.play(music.createSong(hex`0096000408020400001c00010a006400f4016400000400000000000000000000000000050000040c0010001200012418001a00012506001c00010a006400f4016400000400000000000000000000000000000000021e0000000200012c02000400012a04000600012906000800012708000a00012507001c00020a006400f4016400000400000000000000000000000000000000032a0000000200012c02000400012a04000600012906000800012708000a00012510001200012718001a00012909010e02026400000403780000040a000301000000640001c80000040100000000640001640000040100000000fa0004af00000401c80000040a00019600000414000501006400140005010000002c0104dc00000401fa0000040a0001c8000004140005d0076400140005d0070000c800029001f40105c201f4010a0005900114001400039001000005c201f4010500058403050032000584030000fa00049001000005c201f4010500058403c80032000584030500640005840300009001049001000005c201f4010500058403c80064000584030500c8000584030000f40105ac0d000404a00f00000a0004ac0d2003010004a00f0000280004ac0d9001010004a00f0000280002d00700040408070f0064000408070000c80003c800c8000e7d00c80019000e64000f0032000e78000000fa00032c01c8000ee100c80019000ec8000f0032000edc000000fa0003f401c8000ea901c80019000e90010f0032000ea4010000fa0001c8000004014b000000c800012c01000401c8000000c8000190010004012c010000c80002c800000404c8000f0064000496000000c80002c2010004045e010f006400042c010000640002c409000404c4096400960004f6090000f40102b80b000404b80b64002c0104f40b0000f401022003000004200300040a000420030000ea01029001000004900100040a000490010000900102d007000410d0076400960010d0070000c8002a00000001000105020003000105040005000105060007000105080009000105100011000105180019000105`), music.PlaybackMode.UntilDone)
    info.changeLifeBy(-1)
    tiles.placeOnRandomTile(mySprite, assets.tile`myTile77`)
    mySprite2.ay = 0
    immovable = 0
    mySprite2.vy = 0
    animation.runImageAnimation(
    mySprite2,
    assets.animation`myAnim6`,
    200,
    true
    )
    counter2 = 0
    for (let index = 0; index < entityindex.length; index++) {
        sprites.destroy(entity[counter2])
        counter2 += 1
    }
    counter2 = 0
    spawn_enemy()
}
controller.down.onEvent(ControllerButtonEvent.Pressed, function () {
    music.stopAllSounds()
})
sprites.onOverlap(SpriteKind.goomba, SpriteKind.Player, function (sprite, otherSprite) {
    if (immovable == 0) {
        if (sprite.image != assets.image`myImage2`) {
            if (0 <= otherSprite.vy && state == 1) {
                sprite.vx = 0
                if (controller.A.isPressed()) {
                    otherSprite.vy = -180
                } else {
                    otherSprite.vy = -90
                }
                animation.stopAnimation(animation.AnimationTypes.All, sprite)
                sprite.setImage(img`
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . 5 5 5 5 . . . . . . 
                    . . . . . 5 5 5 5 5 5 . . . . . 
                    . . . . 5 5 . 5 5 . 5 5 . . . . 
                    . . . . . . 3 3 3 3 . . . . . . 
                    . . . . 5 5 . . . . 5 5 . . . . 
                    `)
                music.play(music.createSoundEffect(WaveShape.Square, 496, 803, 255, 255, 100, SoundExpressionEffect.None, InterpolationCurve.Linear), music.PlaybackMode.UntilDone)
                music.play(music.createSoundEffect(WaveShape.Square, 496, 803, 255, 255, 100, SoundExpressionEffect.None, InterpolationCurve.Linear), music.PlaybackMode.UntilDone)
                pause(500)
                sprite.setImage(assets.image`myImage2`)
            } else {
                die()
            }
        }
    }
})
info.onLifeZero(function () {
    immovable = 1
    music.stopAllSounds()
    game.setGameOverPlayable(false, music.createSong(hex`0046000408020400001c00010a006400f4016400000400000000000000000000000000050000041e0000000c00012a0c00180001291800200001a120002400011e24003000011d01001c000f05001202c102c20100040500280000006400280003140006020004300000000400011604000800011908000c0001220c001400012014001800011d18002000011920002400011b24003000011903001c0001dc00690000045e0100040000000000000000000005640001040003540000000400011e04000800012508000c00012a0c001000012510001400012014001800012518001c00011e1c002000011d20002400019524002500011d25002600011e26002700011d27002800011b28003000011d07001c00020a006400f4016400000400000000000000000000000000000000031e0000000c00012a0c00180001291800200001a120002400011e24003000011d`), false)
    game.gameOver(false)
})
sprites.onCreated(SpriteKind.Player, function (sprite) {
    controller.moveSprite(sprite, 60, 0)
    sprite.ay = 400
    sprite.fy = 3
})
let counter = 0
let counter2 = 0
let entityindex: number[] = []
let entity: Sprite[] = []
let amount = 0
let list: tiles.Location[] = []
let immovable = 0
let state = 0
let mySprite2: Sprite = null
let mySprite: Sprite = null
tiles.setCurrentTilemap(tileUtil.createSmallMap(tilemap`level1`))
tiles.setTileAt(tiles.getTileLocation(0, 0), assets.tile`transparency16`)
scene.setBackgroundColor(1)
mySprite = sprites.create(img`
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . 1 . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . 1 . . . . . . . . . . . 
    `, SpriteKind.Player)
mySprite2 = sprites.create(img`
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . 5 5 5 . . . . . . . 
    . . . . . 5 5 5 5 5 5 5 . . . . 
    . . . . 5 5 5 3 3 5 3 . . . . . 
    . . . 5 5 3 5 5 3 3 3 3 . . . . 
    . . . 5 5 3 3 3 3 5 5 3 . . . . 
    . . . . . 3 3 3 3 3 3 . . . . . 
    . . . . 5 5 4 5 5 4 . . . . . . 
    . . . 5 5 5 4 5 5 4 5 5 . . . . 
    . . . 3 3 5 . 4 4 . 5 5 3 . . . 
    . . . 3 3 4 4 4 4 4 4 3 3 . . . 
    . . . . . 5 5 . . 5 5 . . . . . 
    . . . . 5 5 5 . . 5 5 5 . . . . 
    `, SpriteKind.cover)
state = 0
let direction = 1
characterAnimations.setController(mySprite2, true)
mySprite2.setFlag(SpriteFlag.Ghost, true)
scene.cameraFollowSprite(mySprite2)
let mySprite4 = sprites.create(assets.image`loader`, SpriteKind.loader)
mySprite4.setFlag(SpriteFlag.GhostThroughWalls, true)
mySprite4.setFlag(SpriteFlag.Invisible, true)
tiles.placeOnRandomTile(mySprite, assets.tile`myTile77`)
tiles.placeOnRandomTile(mySprite2, assets.tile`myTile77`)
mySprite2.y += -4
info.setLife(3)
start_level(1)
spawn_enemy()
game.onUpdate(function () {
	
})
forever(function () {
    music.setVolume(100)
    music.play(music.createSong(assets.song`mySong1`), music.PlaybackMode.UntilDone)
    for (let index = 0; index < 9999999999; index++) {
        if (info.life() == 0) {
            break;
        }
        if (immovable == 0 && info.life() != 0) {
            music.play(music.createSong(assets.song`mySong`), music.PlaybackMode.UntilDone)
        } else {
            pause(100)
        }
    }
})
forever(function () {
    if (immovable == 0) {
        if (controller.B.isPressed()) {
            controller.moveSprite(mySprite, 120, 0)
        } else {
            controller.moveSprite(mySprite, 60, 0)
        }
    } else {
        controller.moveSprite(mySprite, 0, 0)
    }
    if (characterAnimations.matchesRule(mySprite, Predicate.FacingLeft)) {
        direction = 0
    } else if (characterAnimations.matchesRule(mySprite, characterAnimations.rule(Predicate.FacingRight))) {
        direction = 1
    } else {
    	
    }
    if (mySprite.vy > 180) {
        mySprite.vy = 180
    }
})
forever(function () {
    if (immovable == 0) {
        if (state == 2) {
            if (direction == 0) {
                characterAnimations.loopFrames(
                mySprite2,
                assets.animation`myAnim`,
                120,
                characterAnimations.rule(Predicate.Moving)
                )
            } else {
                characterAnimations.loopFrames(
                mySprite2,
                assets.animation`myAnim3`,
                120,
                characterAnimations.rule(Predicate.Moving)
                )
            }
        } else if (state == 1) {
            animation.stopAnimation(animation.AnimationTypes.All, mySprite2)
            if (direction == 0) {
                characterAnimations.loopFrames(
                mySprite2,
                assets.animation`myAnim0`,
                1,
                characterAnimations.rule(Predicate.Moving)
                )
            } else {
                characterAnimations.loopFrames(
                mySprite2,
                assets.animation`myAnim2`,
                1,
                characterAnimations.rule(Predicate.Moving)
                )
            }
        } else if (state == 3) {
            if (direction == 0) {
                characterAnimations.loopFrames(
                mySprite2,
                assets.animation`myAnim`,
                999990,
                characterAnimations.rule(Predicate.Moving)
                )
            } else {
                characterAnimations.loopFrames(
                mySprite2,
                assets.animation`myAnim3`,
                999990,
                characterAnimations.rule(Predicate.Moving)
                )
            }
        } else {
            if (direction == 0) {
                characterAnimations.loopFrames(
                mySprite2,
                assets.animation`myAnim1`,
                200,
                characterAnimations.rule(Predicate.NotMoving)
                )
            } else {
                characterAnimations.loopFrames(
                mySprite2,
                assets.animation`myAnim6`,
                200,
                characterAnimations.rule(Predicate.NotMoving)
                )
            }
        }
    }
})
forever(function () {
    if (immovable == 0) {
        mySprite2.setPosition(mySprite.x, mySprite.y)
        mySprite4.setPosition(scene.cameraProperty(CameraProperty.X) + 80, 60)
        if (controller.dx() == 0 && mySprite.isHittingTile(CollisionDirection.Bottom)) {
            state = 0
        }
        if (controller.dx() != 0 && mySprite.isHittingTile(CollisionDirection.Bottom)) {
            state = 2
        }
        if (state == 2 && !(mySprite.isHittingTile(CollisionDirection.Bottom))) {
            state = 3
            mySprite.vy = 180
        }
    }
})
forever(function () {
    if (true) {
    	
    }
})
forever(function () {
    counter = 0
    for (let index = 0; index < entity.length; index++) {
        if (entity[counter].vy < 0) {
            entity[counter].vy = 0
        }
        counter += 1
    }
})
