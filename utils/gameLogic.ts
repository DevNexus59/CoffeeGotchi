import type { AnimalState, Remedy } from "../src/types/game";

export function applyRemedy(
	currentState: AnimalState,
	remedy: Remedy,
): AnimalState {
	// 1. Si on donne un café à un animal normal, il devient hyperactif
	if (currentState === "normal" && remedy === "coffee") {
		return "coffee";
	}

	// 2. Si on donne encore un café à un animal déjà hyperactif, il meurt 💀
	if (currentState === "coffee" && remedy === "coffee") {
		return "dead";
	}

	// 3. Si on donne une tisane à un animal hyperactif, il se calme
	if (currentState === "coffee" && remedy === "herbaltea") {
		return "normal"
	}
    if (currentState === "stone" && remedy === "coffee") {
					return "normal";
				}

    if (currentState === "normal" &&	remedy === "herbaltea") 				{
					return "stone";
				}
	return currentState;
}