const checkUserWasFound = (user) => {
    if (!user) {
        return res.status(404).json({ message: 'El usuario no fue encontrado!' })
    }
}

module.exports = {
    checkUserWasFound
}