// Paquete de node para guardar archivos
const fs = require('fs');

const filename = './db/file-tasks.json'

const saveTasks = (data=[]) => {
    fs.writeFileSync(filename, JSON.stringify(data))
}

const readTasks = () => {
    if (!fs.existsSync(filename)) {
        return null
    }
    const data = fs.readFileSync(filename, {encoding: 'utf-8'})
    return JSON.parse(data)
}

module.exports = {
    saveTasks,
    readTasks
}

