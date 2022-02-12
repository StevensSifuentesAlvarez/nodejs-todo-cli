const inquirer = require('inquirer');

const menu = async () => {
    const options = [{
        type: 'list',
        name: 'opciones',
        message: 'Seleccione una opción',
        choices: [
            {
                value: '1',
                name: `${'1.'.green} Crear tarea`
            },
            {
                value: '2',
                name: `${'2.'.green} Listar tareas`
            },
            {
                value: '3',
                name: `${'3.'.green} Listar tareas completadas`
            },
            {
                value: '4',
                name: `${'4.'.green} Listar tareas pendientes`
            },
            {
                value: '5',
                name: `${'5.'.green} Completar tarea(s)`
            },
            {
                value: '6',
                name: `${'6.'.green} Eliminar tarea`
            },
            {
                value: '0',
                name: `${'0.'.green} Salir`
            },
        ]
    }]

    console.clear()
    console.log('============================='.yellow)
    console.log('   Seleccione una opción'.yellow)
    console.log('============================='.yellow)   
    const {opciones} = await inquirer.prompt(options)
    return opciones
}

const pause = async () => {
    const questions = [{
        type: 'input',
        name: 'enter',
        message: `Presione ${'ENTER'.yellow} para continuar...`
    }]
    console.log()
    await inquirer.prompt(questions)
}

const readInput = async (message='') => {
    const questions = [{
        type: 'input',
        name: 'desc',
        message,
        validate(value){
            if (value.length===0) {
                return 'Ingrese la tarea, por favor'
            }
            return true
        }
    }]

    const {desc} = await inquirer.prompt(questions)
    return desc
}

const checkListTask = async (tasks=[]) => {
    const choices = tasks.map(({id, desc, completedIn}, i) => {
        return {
                value: id,
                name: `${(i+1+'.').green} ${desc}`,
                checked: completedIn ? true : false
            } 
    })

    const options = [{
        type: 'checkbox',
        name: 'completar',
        message: 'Completar tareas'.yellow,
        choices
    }] 
    const {completar} = await inquirer.prompt(options)
    return completar
}

const deleteTask = async (tasks=[]) => {
    const choices = tasks.map(({id, desc}, i) => {
        return {
            value: id,
            name: `${(i+1+'.').green} ${desc}`
        }
    })

    choices.unshift({
        value: '0',
        name: `${'0.'.green} Cancelar`
    })

    const options = [{
        type: 'list',
        name: 'del',
        message: 'Eliminar tarea',
        choices
    }]

    const {del} = await inquirer.prompt(options)
    return del
}

const confirm = async (message) => {
    const questions = [{
        type: 'confirm',
        name: 'confirmar',
        message
    }]

    const {confirmar} = await inquirer.prompt(questions)
    return confirmar
}

module.exports = {
    menu,
    pause,
    readInput,
    checkListTask,
    deleteTask,
    confirm
}
