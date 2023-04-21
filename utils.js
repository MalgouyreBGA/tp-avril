function getHeader(style){
    let temp = ""
    if(style === 'users'){
        temp = '<div><a href="/">go Home</a></div>'
    } else if (style == 'home'){
        temp = '<div><a href="/users">go Users</a></div>'
    }
    return temp
}
form = '<form action="/users" method="POST">'
    +'<label>Name : <input class="form-control" name="name" type="text" /></label>'
    +'<label>Birth : <input class="form-control" name="birth" type="date" /></label>'
    +'<button type="submit" class="btn btn-primary">Ajouter</button>'
    +'</form>'

function lines(students){
    let htmlData = []
    students.forEach(student=>{
        htmlData.push(
            `<li>`+
            `<p>${student.name} ${student.birth}</p>`+
            button(students.indexOf(student)) +
            `</li>`
        )
    })
    htmlData = htmlData.join('')
    htmlData = '<ul>' + htmlData + '</ul>'
    return htmlData
}
function button(index){
    return '<button type="submit" action="/users/'+index+'" method="DELETE">X</button>'
}

module.exports = { lines, getHeader, form }