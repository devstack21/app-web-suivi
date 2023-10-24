
export const transformUser = (user) => {
    return {
        pk: user.id,
        isR: user.isR,
    };
};

export const transformAnimals = (animal) => {
    return {
        pk: animal.id,
        max_animal: animal.qte
    };
};

