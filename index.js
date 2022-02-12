require('colors'); // Para darle color y estilo a la consola node.js
const { menu, pause, readInput, checkListTask, confirm, deleteTask } = require('./helpers/inquirer');
const { saveTasks, readTasks } = require('./helpers/saveFile');
const Tasks = require('./models/tasks');

const main = async () => {

    let op = ''
    const tasks = new Tasks();
    const data = readTasks();
    data ? tasks.loadTaskFromArray(data) : console.log('DB no existe')

    do {
        op = await menu()
        switch (op) {
            case '1':
                const desc = await readInput('Descripción:')
                tasks.createTask(desc)
            break;
            case '2':
                tasks.showTasks();
            break;
            case '3':
                tasks.listPendingOrCompletedTasks()
            break;
            case '4':
                tasks.listPendingOrCompletedTasks(false)
            break;
            case '5':
                const ids = await checkListTask(tasks.arrayTasks)
                tasks.toogleCompeted(ids)
            break;
            case '6':
                const id = await deleteTask(tasks.arrayTasks)
                if (id!=='0') {
                    const confirmacion = await confirm('¿Estás seguro que deseas eliminarlo?'.red)
                    tasks.deleteTask(id, confirmacion)
                }
            break;
        }
        
        saveTasks(tasks.arrayTasks) // Mantenemos actualizada la bd en cada acción
        await pause()
    } while (op!=='0');

    console.log('\nPrograma Finalizado...'.yellow.bold)
    
}

main()