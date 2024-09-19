const genders: any = [
    {
        "goats": ['buck', "doe"],
        "sheep": ['ram', "ewe"],
        "cattle": ['bull', "cow"],

    }
]

export const returnGender = (type = 'goats', gender : string | number) => {
    if (gender == 'male'){
        gender = 0
    }
    else (
        gender = 1
    )
    return genders?.[0]?.[type]?.[gender]
}