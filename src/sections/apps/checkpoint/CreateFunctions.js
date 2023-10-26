
export const transformUser = (user) => {
    return {
        id_user: user.id ,
        isR: user.isR ? user.isR : user.responsable,
    };
};

export const transformUserEdit = (user) => {
    return {
        id_user: user.id ,
        isR: user.isR ? user.isR : user.responsable,
    };
};

export const transformAnimals = (animal) => {
    return {
        id_animal: animal.id,
        max_animal: animal.max_animal
    };
};

export const transformAnimalsEdit = (animal) => {
    return {
        id_animal: animal.id,
        max_animal: animal.max_animal
    };
};




