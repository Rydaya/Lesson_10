function choisePlayer(x, y) {
    let counter = 0;
    let t = 0;
    return function() {
        if (t < 3) {
            t++;
        } else {
            counter++;
            t = 1;
        }

        if(counter % 2 === 0) {
            return [x, y];
        } else{
            return [y, x];
        }
    }
}

class Robot {
    constructor(name, attack, hp) {
        this.name = name;
        this.attack = attack;
        this.hp = hp;
    }

    toString() {
        return `Player: ${this.name}, attack: ${this.attack}, hp:${this.hp}`;
    }
}

class Attack {
    fight(robot_1, robot_2) {
        robot_2.hp -= robot_1.attack;
    }

    toString() {
        return 'Attack';
    }
}

class TripleAttak {
    fight(robot_1, robot_2) {
        robot_2.hp -= (robot_1.attack * 3);
    }
    toString() {
        return 'TripleAttak';
    }
}

class UltraAttak {
    fight(robot_1, robot_2) {
        robot_2.hp -= Math.round(robot_2.hp/2);
        
    }
    toString() {
        return 'UltraAttak';
    }
}

class Recovery {
    fight(robot_1, robot_2) {
        robot_2.hp += Math.round(robot_2.hp/4);
    }
    toString() {
        return 'Recovery';
    }
}

class Fight {
    battle(robot_1, robot_2) {
        let attacks = [new Attack(), new TripleAttak(), new UltraAttak(), new Recovery()];
        let swap = choisePlayer(robot_1, robot_2);
        do {
            let index = Math.round(Math.random() * (attacks.length - 1));
            let currentAttack = attacks[index];
            currentAttack.fight(...swap());
            console.log(currentAttack.toString());
            robot_1.hp = (robot_1.hp < 0) ? 0 : robot_1.hp;
            robot_2.hp = (robot_2.hp < 0) ? 0 : robot_2.hp;
        } while(robot_1.hp > 0 && robot_2.hp > 0)

        if (robot_1.hp === 0) {
            console.log(secondRobot.toString() + ' winner!');
        } else {
            console.log(firstRobot.toString() + ' winner!');
        }
    }
}

let firstRobot = new Robot('robot_1', 20, 200);
let secondRobot = new Robot('robot_2', 20, 200);

let fight = new Fight;
fight.battle(firstRobot, secondRobot);