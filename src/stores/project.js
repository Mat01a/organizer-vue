import { defineStore } from 'pinia'
import instance from '../axios'

export const useProjectStore = defineStore('project', {
    state: () => {
        return {
            projects: {
                current: [],
                completed: []
            }
        }
    },
    actions: {
        async getProjects() {
            await instance.get('/sanctum/csrf-cookie')
            let data = await instance.get('/api/projects')
            
            data.data.forEach(element => {
                if(element.status == 0)
                    this.projects.current.push(element)
                else
                    this.projects.completed.push(element)    
            });
            
                        
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