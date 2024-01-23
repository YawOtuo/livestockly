const genders = [
    {
        "goats": ['buck', "doe"],
        "sheep": ['ram', "ewe"],
        "cattle": ['bull', "cow"],

    }
]

export const returnGender = (type = 'goats', gender) => {
    if (gender == 'male'){
        gender = 0
    }
    else (
        gender = 1
    )
    return genders?.[0]?.[type]?.[gender]
}