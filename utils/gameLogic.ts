import type { AnimalState,Remedy } from "../src/types/game";

export function applyRemedy(currentEnergy: number, remedy: Remedy): number {
	if (remedy === "coffee") {

		const randomBoost = Math.floor(Math.random() * 10) + 1;
		return currentEnergy + randomBoost;
	}

	if (remedy === "herbal-tea") {
		return currentEnergy - 3;
	}

	return currentEnergy;
}

export function getAnimalState(energy: number): AnimalState {
    
    // 1. Les cas extrêmes (Game Over)
    if (energy <= 0 || energy >= 100) {
        return "dead";
    }

    // 2. Zone de la tisane (trop relaxé)
    if (energy > 80) {
        return "stone";
    }

    // 3. Zone du café (trop excité)
    if (energy < 20) {
        return "coffee";
    }

    // 4. Le juste milieu
    return "normal";
}