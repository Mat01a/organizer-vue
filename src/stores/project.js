import { defineStore } from 'pinia'
import instance from '../axios'

export const useProjectStore = defineStore('project', {
    state: () => {
        return {
            projects: {
                current: [],
                completed: [],
                currentProposed: [],
                currentProjectUsers: [],
            },
            message_errors: []
        }
    },
    actions: {
        async getProjects() {
            await instance.get('/sanctum/csrf-cookie')
            let data = await instance.get('/api/projects')

            this.projects.current = []
            this.projects.completed = []

            data.data.forEach(element => {
                console.log(data.data)
                if(element[0].status == 0)
                    this.projects.current.push(element[0])
                else
                    this.projects.completed.push(element[0])
            })
                        
        },
        async createProject(form) {
            await instance.post('/api/projects', {
                'name': form.value.name
            }).then(() => {
                this.message_errors = []
                this.getProjects()
            })
            .catch(error => {
                this.message_errors = error.response.data.errors.name
            })
        },
        async changeName(id, name)
        {
            await instance.patch('/api/projects', {
                'id': id,
                'name': name
            }).then((response) => {
                if (response.status == 200)
                {

                    // Update list
                    this.projects.current.forEach((element, index) => {
                        if(element.id === id)
                        {
                            this.projects.current[id - 1].name = name
                        }
                    })

                    return true
                }
            })
        },
        async searchUser(id, name)
        {
            await instance.get('api/projects/' + id + '/users/' + name)
            .then((response) => {
                this.projects.currentProposed = response.data
            })
            .catch((error) => {
                console.log(error)
            })
        },
        async addUser(id, username)
        {
            await instance.post('api/project/addUser', {
                'id': id,
                'username': username
            })
            .then((response) => {
                this.projects.currentProjectUsers[0].push({'name': response.data.name, 'username': response.data.username})
            })
            .catch((error) => {
                this.projects.addUserError = error.response.data
            })
        },
        async getCurrentProjectUsers(id)
        {
            await instance.get('api/project/' + id + '/users')
            .then((response) => {
                this.projects.currentProjectUsers = response.data
            })
            .catch((error) => {
                console.log(error)
            })
        },
        async nextUsersPage(id)
        {
            await instance.get('api/project/' + id + '/users?page=' + (this.projects.currentProjectUsers[1].current_page + 1))
            .then((response) => {
                this.projects.currentProjectUsers = response.data
            })
        },
        async previousUsersPage(id)
        {
            await instance.get('api/project/' + id + '/users?page=' + (this.projects.currentProjectUsers[1].current_page - 1))
            .then((response) => {
                this.projects.currentProjectUsers = response.data
            })
        },
        deleteAddUserError()
        {
            delete this.projects.addUserError
        }
    },
    getters: {
        countCurrentProjects() {
            let currentProjects = this.projects.current.length
            return currentProjects
        },
        countCompletedProjects() {
            let completedProjects = this.projects.completed.length
            return completedProjects
        }
    }
})