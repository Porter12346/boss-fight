let bossesDefeated = 0
let currentGold = 0
let healPots = 0
let heroes = [
    {
        name: 'Porter',
        type: 'giant',
        damage: 5,
        health: 100,
        maxHealth: 100,
        level: 1,
        image: "porter.png"
    },
    {
        name: 'Seth',
        type: 'giant',
        damage: 10,
        health: 100,
        maxHealth: 100,
        level: 1,
        image: "seth.png"

    }
]

const sam =
{
    name: 'Sam',
    type: 'giant',
    damage: 15,
    health: 100,
    maxHealth: 50,
    level: 1,
    image: "https://neweralive.na/storage/images/2023/may/lloyd-sikeba.jpg"
}

const jake =
{
    name: 'Jake',
    type: 'giant',
    damage: 0.5,
    health: 25,
    maxHealth: 50,
    level: 5,
    image: "https://media.licdn.com/dms/image/C4E03AQFBMVT5y1HeZg/profile-displayphoto-shrink_800_800/0/1516991365021?e=1723680000&v=beta&t=Xpjpy57htPBmNm6NZJw6H5QD25mlLe7ANOmjLU1ck-0"
}

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
    bossPercentage()

}

function bossAttack() {
    heroes.forEach((hero) => {
        hero.health -= boss.damage
        if (hero.health < 0) {
            hero.health = 0
        }
        console.log(`${hero.name} health: `, hero.health)
        drawHeros()

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
    hero.level++
    console.log(hero.maxHealth / 4)
    hero.maxHealth *= hero.level
    console.log(hero.maxHealth / 4)
    hero.health = hero.maxHealth
    hero.damage *= Math.ceil(hero.level / 4)
    drawHeros()
    drawGold()
}

function buyHealPot() {
    if (currentGold < 20) {
        alert('ur broke')
        return
    }
    healPots++
    currentGold -= 20
    drawGold()
}

function healPot(heroName) {
    let hero = heroes.find((hero) => hero.name == heroName)
    if (healPots == 0) {
        alert('you aint got no health potions bro')
        return
    }
    let healAmount = hero.maxHealth / 4
    hero.health += healAmount
    if (hero.health > hero.maxHealth) {
        hero.health = hero.maxHealth
    }
    healPots--
    drawHeros()
    drawGold()
}

function drawHeros() {
    heroes.forEach((hero) => {
        let heroElemenent = document.getElementById(hero.name)
        const heroHealth = heroElemenent.querySelector('.hp')
        const heroLevel = heroElemenent.querySelector('.lvl')
        const heroName = heroElemenent.querySelector('.name')
        const heroImage = heroElemenent.querySelector('.image')
        heroName.innerHTML = `Name: ${hero.name}`
        heroHealth.innerHTML = `HP: ${hero.health}`
        heroLevel.innerHTML = `LVL: ${hero.level}`
        let imageSource = `<img class="img-fluid image-sizing" src="${hero.image}" alt="a man">`
        heroImage.innerHTML = imageSource
        drawGold()
    });

}

function bossPercentage() {
    let bossHealth = (boss.health / boss.maxHealth) * 100
    console.log(bossHealth)
    document.getElementById("boss-health-bar").innerHTML = `<div class="progress-bar" id="boss-health-bar" style="width: ${bossHealth}%"></div>`
    return (bossHealth)

}

function buySam() {
    if (currentGold < 50) {
        alert('ur broke')
        return
    }
    heroes.push(sam)
    drawHeros()
    document.getElementById('samText').style.display = 'none'
    document.getElementById('samPrice').style.display = 'none'
    currentGold -= 50
    drawGold()
}


function buyJake() {
    if (currentGold < 1000) {
        alert('ur broke')
        return
    }
    heroes.push(jake)
    drawHeros()
    document.getElementById('jakeText').style.display = 'none'
    document.getElementById('jakePrice').style.display = 'none'
    currentGold -= 1000
    drawGold()
}

function drawGold() {
    document.getElementById('goldCount').innerText = `GOLD: ${currentGold}`
}


setInterval(bossAttack, 5000)
drawHeros()
bossPercentage()
