const permissions = {
    1: "User",
    2:"Admin",
    3: "Superadmin"
}

export const getStatus = (level) => {
    if (level){
        return permissions[level]
    }
    else{
       return "User"
    }
}