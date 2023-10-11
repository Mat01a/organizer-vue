import { defineStore } from 'pinia'
import instance from '../axios'

export const useProjectStore = defineStore('project', {
    state: () => {
        return {
            projects: {},
            projectsPages: {},
            proposedUsers: [],
            currentProjectUsers: [],
            currentProjectPermissions: [],
            pagesOfUsers: [],
            messageErrors: [],
            leaveErrors: null,
            addUserError: null,
            loading: false,
            error: false,
            errorMessage: null,
            errorCooldown: null,
            showPermissions: false,
            editPermissions: false,
        }
    },
    actions: {
        async getProjects() {
            this.loading = true
            await instance.get('/sanctum/csrf-cookie')
            let request = await instance.get('/api/projects')
            this.projects = {}
            
            if(request.data.data)
            {
                request.data.data.forEach(element => {
                    var current_id = element.id
                    this.projects[current_id] = element
                })
                this.projectsPages = request.data.data
                this.loading = false
                return true
            }
            this.loading = false
            
        },
        async createProject(form) {
            await instance.post('/api/projects', {
                'name': form.value.name
            }).then(() => {
                this.messageErrors = []
                this.getProjects()
            })
            .catch(error => {
                this.messageErrors = error.response.data.errors.name
                this.error = true
                this.errorMessage = error.response.data
                setTimeout(this.hideError, 2000)
            })
        },
        async changeName(id, name)
        {
            this.loading = true
            await instance.patch('/api/projects', {
                'id': id,
                'name': name
            }).then((response) => {
                // Update list
                this.projects[id].name = name
                this.loading = false
                return true
            })
            .catch((error) => {
                this.loading = false
                this.error = true
                this.errorMessage = error.response.data
                setTimeout(this.hideError, 2000)
                return false
            })
        },
        async searchUser(id, name)
        {
            this.loading = true
            await instance.get('api/projects/' + id + '/users/' + name)
            .then((response) => {
                this.proposedUsers = response.data
                this.loading = false
                return true
            })
            .catch((error) => {
                this.loading = false
                this.error = true
                this.errorMessage = error.response.data
                setTimeout(this.hideError, 2000)
            })
        },
        async addUser(id, username)
        {
            await instance.post('api/projects/add-user', {
                'project_id': id,
                'username': username
            })
            .then((response) => {
                return true
            })
            .catch((error) => {
                this.error = true
                this.errorMessage = error.response.data
                setTimeout(this.hideError, 2000)
                this.addUserError = error.response.data
            })
        },
        async getCurrentProjectUsers(id)
        {
            this.loading = true
            await instance.get('api/projects/' + id + '/users')
            .then((response) => {
                this.currentProjectUsers = response.data.data
                this.pagesOfUsers = {
                    current_page: response.data.current_page,
                    last_page: response.data.last_page
                }
                this.loading = false
            })
            .catch((error) => {
                this.error = true
                this.errorMessage = error.response.data
                setTimeout(this.hideError, 2000)
                this.loading = false
            })
        },
        async nextUsersPage(id)
        {
            this.loading = true
            await instance.get('api/projects/' + id + '/users?page=' + (this.pagesOfUsers.current_page + 1))
            .then((response) => {
                this.currentProjectUsers = response.data.data
                this.pagesOfUsers = response.data
                this.loading = false
            })
            .catch((error) => {
                this.error = true
                this.errorMessage = error.response.data
                setTimeout(this.hideError, 2000)
                this.loading = false
            })
        },
        async previousUsersPage(id)
        {
            this.loading = true
            await instance.get('api/projects/' + id + '/users?page=' + (this.pagesOfUsers.current_page - 1))
            .then((response) => {
                this.currentProjectUsers = response.data.data
                this.pagesOfUsers = response.data
                this.loading = false
            })
            .catch((error) => {
                this.loading = false
                this.error = true
                this.errorMessage = error.response.data
                setTimeout(this.hideError, 2000)
            })
        },
        async changeProjectStatus(id, status)
        {
            this.loading = true
            let new_status = status == 0 ? 1 : 0
            await instance.post('/api/projects/change-status', {
                project_id: id,
                status: new_status
            })
            .then((response) => {
                if(response.status == 200)
                {
                    this.projects[id].status = new_status
                    this.loading = false
                }
            })
            .catch((error) => {
                this.error = true
                this.errorMessage = error.response.data
                setTimeout(this.hideError, 2000)
                this.loading = false
            })
        },
        async leaveProject(id)
        {
            this.loading = true
            await instance.post('/api/projects/leave', {
                id: id
            })
            .then((response) => {
                delete this.projects[id]
                this.loading = false
                return true
            })
            .catch((error) => {
                this.leaveErrors = error.response.data
                this.error = true
                this.errorMessage = error.response.data
                setTimeout(this.hideError, 2000)
                this.loading = false
            })
        },
        async getCurrentProjectPermissions(id)
        {
            this.loading = true
            await instance.get('/api/projects/' + id + '/permissions')
            .then((response) => {
                this.currentProjectPermissions = response.data
                this.loading = false
            })
            .catch((error) => {
                this.error = true
                this.errorMessage = error.response.data
                setTimeout(this.hideError, 2000)
                this.loading = false
            })
        },
        async addNewPermissin(id, name)
        {
            this.loading = true
            await instance.post('/api/projects/add-permission', {
                project_id: id,
                name: name
            })
            .then((response) => {
                this.loading = false
                this.getCurrentProjectPermissions(id)
                return true
            })
            .catch((error) => {
                this.error = true
                this.errorMessage = error.response.data
                setTimeout(this.hideError, 2000)
                this.loading = false
            })
        },
        async nextPermissionsPage(id)
        {
            this.loading = true
            await instance.get('api/projects/'+ id +'/permissions?page=' + (this.currentProjectPermissions.current_page + 1))
            .then((response) => {
                this.currentProjectPermissions = response.data
                this.loading = false
            })
            .catch((error) => {
                this.error = true
                this.errorMessage = error.response.data
                setTimeout(this.hideError, 2000)
                this.loading = false
            })
        },
        async previousPermissionsPage(id)
        {
            this.loading = true
            await instance.get('api/projects/'+ id +'/permissions?page=' + (this.currentProjectPermissions.current_page - 1))
            .then((response) => {
                this.currentProjectPermissions = response.data
                this.loading = false
            })
            .catch((error) => {
                this.error = true
                this.errorMessage = error.response.data
                setTimeout(this.hideError, 2000)
                this.loading = false
            })
        },
        async changeUserPermission(project_id, user, permission_id)
        {
            this.hideError()
            this.loading = true
            await instance.patch('/api/projects/update-user-permission', {
                project_id: project_id,
                user: user,
                permission_id: permission_id
            })
            .then(() => {
                this.loading = false
                return true
            })
            .catch((error) => {
                this.loading = false
                this.error = true
                this.errorMessage = error.response.data
                setTimeout(this.hideError, 2000)
                return false
            })
        },
        async changePermission(permission_id, form, project_id)
        {
            this.loading = true
            this.hideError()
            await instance.patch('api/projects/update-permission-settings', {
                project_id: project_id,
                permission_id: permission_id,
                name: form.value.name,
                read: form.value.read,
                write: form.value.write,
                update_name: form.value.updateName,
                add_users: form.value.addUsers,
                remove_users: form.value.removeUsers,
                update_status: form.value.updateStatus,
                update_permission: form.value.updatePermissions,
            })
            .then(() => {
                this.loading = false
            })
            .catch((error) => {
                this.loading = false
                this.error = true
                console.log(error);
                this.errorMessage = error.response.data
                setTimeout(this.hideError, 2000)
            })
        },
        async removePermission(project_id, permission_id)
        {
            this.loading = true
            await instance.patch('api/projects/remove-permission',{
                project_id: project_id,
                permission_id: permission_id
            })
            .then((response) => {
                this.getCurrentProjectPermissions(project_id)
                this.loading = false
            })
            .catch((error) => {
                this.error = true
                this.errorMessage = error.response.data
                setTimeout(this.hideError, 2000)
                this.loading = false
            })
        },
        async removeUserFromProject(project_id, username)
        {
            this.loading = true
            await instance.post('api/projects/delete-user', {
                project_id: project_id,
                username: username
            })
            .then(() => {
                this.loading = false
                return true
            })
            .catch((error) => {
                this.loading = false
                this.error = true
                this.errorMessage = error.response.data
                setTimeout(this.hideError, 2000)
                return false
            })
        },

        deleteAddUserError()
        {
            this.addUserError = null
        },
        deleteLeaveErrors()
        {
            this.leaveErrors = null
        },
        hideError()
        {
            this.errorCooldown = Date.now()
            const nextError = 500;
            if(this.errorCooldown - nextError <= (Date.now()))
            {
                this.error = false
                this.errorMessage = null
            }
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