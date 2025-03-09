
export const roleStatic = {
    admin: 'admin',
    booking: 'booking',
    accounting: 'accounting'
}


export const role = (e: string) => {
    switch (e) {
        case "admin":
            return roleStatic.admin
        case "transformer_employee":
            return roleStatic.booking
        default:
            return roleStatic.accounting
    }
}