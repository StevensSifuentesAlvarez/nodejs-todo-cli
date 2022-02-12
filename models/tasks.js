const Task = require('./task');

class Tasks{
    _list = {} // Lista de objetos de tipo tarea

    constructor(){
        this._list = {}
    }

    get arrayTasks() {
        return Object.values(this._list)
    }

    createTask = (desc='') => {
        const newTask = new Task(desc);
        this._list[newTask.id] = newTask
        console.log('\n¡Tarea creada con éxito!'.cyan)
    }

    showTasks = () => {
        console.log()
        this.arrayTasks.forEach(({desc, completedIn}, i) => {
            let id = `${i+1}.`.green
            let state = completedIn ? 'Completado'.green : 'Pendiente'.red
            console.log(`${id} ${desc} :: ${state}`)
        })
        // Object.values(this._list).forEach(t => console.log(t))
        // console.log(Object.values(this._list))
        // console.log(this._list)
    }

    // Cargamos la lista con la data traida de nuestra bd local
    loadTaskFromArray = (data=[]) => {
        data.forEach(t => {
            this._list[t.id] = t
        })
    } 

    listPendingOrCompletedTasks = (completed=true) => {
        let id = 0 
        console.log()
        this.arrayTasks.forEach(({desc, completedIn}) => {
            let state = completedIn ? `${completedIn}`.green : 'Pendiente'.red
            if (!!completedIn===completed) {
                console.log(`${((++id)+'.').green} ${desc} :: ${state}`)
            }
        })
    }

    toogleCompeted = (ids=[]) => {
        ids.forEach(id => {
            if (!this._list[id].completedIn) {
                this._list[id].completedIn = new Date().toISOString()
            }
        })
        this.arrayTasks.forEach(({id}) => {
            if (!ids.includes(id)) {
                this._list[id].completedIn = null
            }
        })
    }

    deleteTask = (id, confirmacion=true) => {
        if (confirmacion) {
            delete this._list[id]
            console.log('\nTarea eliminada con éxito.')
        }
    }
}

module.exports = Tasks