const showButtons = (p, mx) => {

    const fixedPages = Array.from({ length: mx }, (_, i) => i + 1)

    let buttons = []

    const minValueIsClose = p === 1 || p - 1 === 1 || p - 2 === 1 || p - 3 === 1
    const maxValueIsClose = p === mx || p + 1 === mx || p + 2 === mx || p + 3 === mx

    if (mx <= 6) return fixedPages

    if (!minValueIsClose && !maxValueIsClose) {
        buttons = buttons.concat(1, '...', p - 2, p - 1, p, p + 1, p + 2, '...', mx)
    }

    else if (minValueIsClose) {
        buttons = buttons.concat(fixedPages.slice(0, 5), '...', mx)
    }

    else {
        buttons = buttons.concat(1, '...', fixedPages.slice(mx - 5, mx))
    }

    return buttons

}

export default showButtons;
