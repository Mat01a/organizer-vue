import { defineStore } from 'pinia'
import instance from '../axios'

export const useProjectStore = defineStore('project', {
    state: () => {
        return {
            projects: {},
            proposedUsers: [],
            currentProjectUsers: [],
            message_errors: []
        }
    },
    actions: {
        async getProjects() {
            await instance.get('/sanctum/csrf-cookie')
            let data = await instance.get('/api/projects')

            this.projects = {}

            data.data.forEach(element => {
                var current_id = element[0].id
                this.projects[current_id] = element[0]
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
                this.proposedUsers = response.data
            })
            .catch((error) => {
                console.log(error)
            })
        },
        async addUser(id, username)
        {
            await instance.post('api/projects/addUser', {
                'id': id,
                'username': username
            })
            .then((response) => {
                this.currentProjectUsers[0].push({'name': response.data.name, 'username': response.data.username})
            })
            .catch((error) => {
                this.projects.addUserError = error.response.data
            })
        },
        async getCurrentProjectUsers(id)
        {
            await instance.get('api/projects/' + id + '/users')
            .then((response) => {
                this.currentProjectUsers = response.data
            })
            .catch((error) => {
                console.log(error)
            })
        },
        async nextUsersPage(id)
        {
            await instance.get('api/projects/' + id + '/users?page=' + (this.currentProjectUsers[1].current_page + 1))
            .then((response) => {
                this.currentProjectUsers = response.data
            })
        },
        async previousUsersPage(id)
        {
            await instance.get('api/projects/' + id + '/users?page=' + (this.currentProjectUsers[1].current_page - 1))
            .then((response) => {
                this.currentProjectUsers = response.data
            })
        },
        async changeProjectStatus(id, status)
        {
            let new_status = status == 0 ? 1 : 0
            await instance.post('/api/projects/changeStatus', {
                project_id: id,
                status: new_status
            })
            .then((response) => {
                if(response.status == 200)
                {
                    console.log(id)
                    this.projects[id].status = new_status
                }
            })
        },
        deleteAddUserError()
        {
            delete this.projects.addUserError
        }
    },
    getters: {
        countCurrentProjects() {
            let currents = 0
            for(const [key, value] of Object.entries(this.projects))
            {
                if(value.status == 0)
                    currents++
            }

            return currents
        },
        countCompletedProjects() {
            let completed = 0
            for(const [key, value] of Object.entries(this.projects))
            {
                if(value.status == 1)
                    completed++
            }
            
            return completed
        }
    }
})