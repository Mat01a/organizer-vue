import { defineStore } from 'pinia'
import instance from '../axios'

export const useTaskStore = defineStore('tasks', {
    state: () => {
        return {
            tasks: {
            },
            loading: false,
        }
    },
    actions: {
        async index()
        {
            this.loading = true
            await instance.get('api/tasks')
            .then((response) => {
                this.loading = false
                console.log(response)
            })
        },
        async create(project_id, name, description) {
            this.loading = true
            await new Promise(r => setTimeout(r, 500))
            .then(() => 
            {
                this.loading =  false
            })
        },
        async update(project_id, id, status)
        {
            let current_task = this.tasks[id]
            current_task.status = current_task.status ? 0 : 1
            this.loading = true
            await instance.post('api/tasks/update-status', {
                project_id: project_id,
                id: id,
                status: status
            })
            .catch(() => {
                this.loading = false
            })
            .then(() => 
            {
                this.loading =  false
            })
        }
    }
})