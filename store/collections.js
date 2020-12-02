export const state = () => ({
  collections: []
})

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
  }
}

export const actions = {
  async createCollection({ commit }, { name }) {
    const newCollection = await this.$strapi.create('lists', {
      name
    })
    commit('addCollection', newCollection)
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
  async deleteCollection({ commit }, { collection }) {
    await this.$strapi.delete('lists', collection.id)
    commit('deleteCollection', collection)
    return collection
  },
  async createGroup({ commit }, { name, collection }) {
    const newGroup = await this.$strapi.$http.$post(
      `lists/${collection.id}/groups`,
      {
        name,
        list: collection.id
      }
    )
    // what is this? why newGroup.list
    newGroup.collection = collection.id
    commit('addGroup', { group: newGroup, collection })
    return newGroup
  },
  async updateGroup({ commit }, { name, group, collection }) {
    const updatedGroup = await this.$strapi.$http.$put(
      `lists/${collection.id}/groups/${group.id}`,
      {
        name
      }
    )
    // why updatedGroup.list?
    updatedGroup.collection = collection.id
    commit('updateGroup', {
      group: updatedGroup,
      collection
    })
    return updatedGroup
  },
  async deleteGroup({ commit }, { group, collection }) {
    await this.$strapi.$http.$delete(
      `lists/${collection.id}/groups/${group.id}`
    )
    commit('deleteGroup', {
      group,
      collection
    })
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
