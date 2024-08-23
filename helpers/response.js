export const responseStandar = (status, data = [], errors = []) => {
    return {
        status,
        data,
        errors,
    }
}