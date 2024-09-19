const permissions : any = {
    1: "User",
    2:"Admin",
    3: "Superadmin"
}

export const getStatus = (level : string) => {
    if (level){
        return permissions[level]
    }
    else{
       return "User"
    }
}