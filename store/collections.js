export const state = () => ({
  collections: [],
  selectedCollection: null,
  selectedGroup: null
})

export const getters = {
  sortedCollections(state) {
    const c = [...state.collections]
    return c.sort(function (a, b) {
      const keyA = new Date(a.created_at)
      const keyB = new Date(b.created_at)
      if (keyA > keyB) return -1
      if (keyA < keyB) return 1
      return 0
    })
  }
}

export const mutations = {
  setCollections(state, collections) {
    state.collections = collections
  },
  addCollection(state, collection) {
    state.collections.push(collection)
  },
  updateCollection(state, collection) {
    const index = state.collections.findIndex(
      (item) => item.id === collection.id
    )
    if (index >= 0) Object.assign(state.collections[index], collection)
    else state.collections.push(collection)
  },
  deleteCollection(state, collection) {
    const index = state.collections.findIndex(
      (item) => item.id === collection.id
    )
    if (index >= 0) state.collections.splice(index, 1)
  },
  addGroup(state, { group, collection }) {
    const collectionIndex = state.collections.findIndex(
      (item) => item.id === collection.id
    )
    if (collectionIndex >= 0)
      state.collections[collectionIndex].groups.push(group)
  },
  updateGroup(state, { group, collection }) {
    const collectionIndex = state.collections.findIndex(
      (item) => item.id === collection.id
    )
    if (collectionIndex >= 0) {
      const groupIndex = state.collections[collectionIndex].groups.findIndex(
        (item) => item.id === group.id
      )
      if (groupIndex >= 0) {
        Object.assign(
          state.collections[collectionIndex].groups[groupIndex],
          group
        )
      } else {
        state.collections[collectionIndex].groups.push(group)
      }
    }
  },
  deleteGroup(state, { group, collection }) {
    const collectionIndex = state.collections.findIndex(
      (item) => item.id === collection.id
    )
    if (collectionIndex >= 0) {
      const groupIndex = state.collections[collectionIndex].groups.findIndex(
        (item) => item.id === group.id
      )
      if (groupIndex >= 0)
        state.collections[collectionIndex].groups.splice(groupIndex, 1)
    }
  },
  setSelectedCollection(state, collection) {
    state.selectedCollection = collection
  },
  setSelectedGroup(state, group) {
    state.selectedGroup = group
  }
}

export const actions = {
  async createCollection({ commit }, { name }) {
    const newCollection = await this.$strapi.create('lists', {
      name
    })
    commit('addCollection', newCollection)
    commit('setSelectedCollection', newCollection)
    commit('setSelectedGroup', null)
    return newCollection
  },
  async updateCollection({ commit }, { name, collection }) {
    const updatedCollection = await this.$strapi.update(
      'lists',
      collection.id,
      {
        name
      }
    )
    updatedCollection.groups = collection.groups
    commit('updateCollection', updatedCollection)
    return updatedCollection
  },
  async deleteCollection({ commit, state, getters }, { collection }) {
    await this.$strapi.delete('lists', collection.id)
    commit('deleteCollection', collection)
    commit('setSelectedCollection', getters.sortedCollections[0])
    commit('setSelectedGroup', state.selectedCollection.groups[0])
    return collection
  },
  async createGroup({ commit }, { name, collection }) {
    try {
      const newGroup = await this.$strapi.$http.$post(
        `lists/${collection.id}/groups`,
        {
          name,
          list: collection.id
        }
      )
      // what is this? why newGroup.list
      newGroup.list = collection.id
      commit('addGroup', { group: newGroup, collection })
      commit('setSelectedGroup', newGroup)
      return newGroup
    } catch (err) {
      // console.log(err)
    }
  },
  async updateGroup({ commit }, { name, group, collection }) {
    try {
      const updatedGroup = await this.$strapi.$http.$put(
        `lists/${collection.id}/groups/${group.id}`,
        {
          name
        }
      )
      // why updatedGroup.list?
      updatedGroup.list = collection.id
      commit('updateGroup', {
        group: updatedGroup,
        collection
      })
      return updatedGroup
    } catch (err) {
      // console.log(err)
    }
  },
  async deleteGroup({ commit }, { group, collection }) {
    await this.$strapi.$http.$delete(
      `lists/${collection.id}/groups/${group.id}`
    )
    commit('deleteGroup', {
      group,
      collection
    })
    commit('setSelectedGroup', null)
    return group
  },
  async bookmarkShowcase({ commit }, { showcase, group, collection }) {
    await this.$strapi.$http.$post(
      `/lists/${collection.id}/groups/${group.id}/showcases`,
      {
        showcase
      }
    )
    const updatedGroup = {
      ...group,
      showcases: [showcase, ...group.showcases]
    }
    commit('updateGroup', {
      group: updatedGroup,
      collection
    })
    return updatedGroup
  },
  async unbookmarkShowcase({ commit }, { showcase, group, collection }) {
    await this.$strapi.$http.$delete(
      `/lists/${collection.id}/groups/${group.id}/showcases/${showcase.id}`
    )
    const updatedGroup = {
      ...group,
      showcases: group.showcases.filter((it) => it.id !== showcase.id)
    }
    commit('updateGroup', {
      group: updatedGroup,
      collection
    })
    return updatedGroup
  }
}
