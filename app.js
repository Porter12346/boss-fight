let bossesDefeated = 0
let currentGold = 0

const heroes = [
    {
        name: 'Porter',
        type: 'giant',
        damage: 5,
        health: 100
    },
    {
        name: 'Seth',
        type: 'giant',
        damage: 10,
        health: 50
    }
]

const boss = {
    health: 100,
    maxHealth: 100,
    damage: 5,
    level: 1
}

function hitBoss() {
    let damage = 0
    heroes.forEach((hero) => {
        if (hero.health > 0) {
            damage += hero.damage
        }



    });
    console.log(damage)
    boss.health -= damage
    if (boss.health <= 0) {
        boss.health = 0
        killBoss()
    }
    console.log(boss.health)

}

function bossAttack() {
    heroes.forEach((hero) => {
        hero.health -= boss.damage
        if (hero.health < 0) {
            hero.health = 0
        }
        console.log(`${hero.name} health: `, hero.health)
    });

}

function killBoss() {

    currentGold += (boss.level * 10)

    heroes.forEach((hero) => {
        levelUp(hero)
    });

    boss.level++
    boss.maxHealth *= boss.level
    boss.health = boss.maxHealth
    boss.damage *= boss.level
    bossesDefeated++
}

function levelUp(hero) {

}

setInterval(bossAttack, 5000)
