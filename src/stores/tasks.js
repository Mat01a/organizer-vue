import { defineStore } from 'pinia'
import instance from '../axios'

export const useTaskStore = defineStore('tasks', {
    state: () => {
        return {
            tasks: [],
            error: false,
            errorMessage: null,
            loading: false,
        }
    },
    actions: {
        async index(project_id)
        {
            this.loading = true
            this.hideError()
            await instance.get('api/tasks/'+project_id)
            .then((response) => {
                this.tasks = {}
                this.loading = false
                this.tasks = response.data
            })
            .catch((error) => {
                this.loading = false
                this.error = true
                this.errorMessage = error.response.data
                setTimeout(this.hideError, 2000)
            })
        },
        async create(project_id, name, description) {
            this.hideError()
            this.loading = true
            await instance.post('api/tasks/create', {
                project_id: project_id,
                name: name,
                description: description
            })
            .then(() => 
            {
                this.loading =  false
            })
            .catch((error) => {
                this.loading = false
                this.error = true
                this.errorMessage = error.response.data
                setTimeout(this.hideError, 2000)
            })
        },
        async update(project_id, id, status)
        {
            this.hideError()
            this.loading = true
            await instance.patch('api/tasks/update', {
                project_id: project_id,
                id: id,
                status: status
            })
            .catch((error) => {
                this.loading = false
                this.error = true
                this.errorMessage = error.response.data
                setTimeout(this.hideError, 2000)
            })
            .then(() => 
            {
                this.loading =  false
                return true;
            })
        },
        async remove(id)
        {
            this.hideError()
            this.loading = true
            await instance.delete('api/tasks/' + id)
            .then(() => {
                this.loading = false
            })
            .catch((error) => {
                this.loading = false;
                this.error = true
                this.errorMessage = error.response.data
                setTimeout(this.hideError, 2000)
            })
        },
        hideError()
        {
            this.error = false
            this.errorMessage = null
        }
    },
    getters: {
        getCompleted() {
            return this.tasks.filter(x => x.status == 1).length
        },
        getNotCompleted()
        {
            return this.tasks.filter(x => x.status == 0).length
        }
    }
})