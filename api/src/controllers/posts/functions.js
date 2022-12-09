const checkPostWasFound = (post) => {
    if (!post) {
        return res.status(404).json({ message: 'El post no fue encontrado!' })
    }
}

module.exports = {
    checkPostWasFound
}